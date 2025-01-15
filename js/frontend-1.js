'use strict';

(function($) {
  var $storage = true;
  var added_ids = [];
  var key = Cookies.get('woosw_key');

  try {
    $storage = ('sessionStorage' in window && window.sessionStorage !== null);
    window.sessionStorage.setItem('woosw', 'test');
    window.sessionStorage.removeItem('woosw');
  } catch (err) {
    $storage = false;
  }

  $(function() {
    if (key === null || key === undefined || key === '') {
      key = woosw_get_key();
      Cookies.set('woosw_key', key, {expires: 7});
    }

    // Load data for the first time
    woosw_load_data();

    if ($('.woosw-custom-menu-item').length || woosw_vars.reload_count ===
        'yes') {
      // reload the count
      woosw_load_count();
    }

    if (woosw_vars.added_to_cart === 'yes' && woosw_vars.auto_remove ===
        'yes') {
      setTimeout(function() {
        woosw_load_count();
        woosw_get_data();
      }, 300);
    }

    if (woosw_vars.button_action === 'message') {
      $.notiny.addTheme('woosw', {
        notification_class: 'notiny-theme-woosw',
      });
    }
  });

  $(document).on('change', '.woosw-switcher-dropdown', function() {
    window.location = $(this).val();
  });

  $(document).on('woosw_refresh_data', function() {
    woosw_get_data();
  });

  $(document).on('woosw_refresh_count', function() {
    woosw_load_count();
  });

  // woovr
  $(document).on('woovr_selected', function(e, selected, variations) {
    var id = selected.attr('data-id');
    var pid = selected.attr('data-pid');

    if (id > 0) {
      $('.woosw-btn-' + pid).
          attr('data-id', id).
          removeClass('woosw-btn-added woosw-added');

      // refresh button
      woosw_refresh_button_id(id);
    } else {
      $('.woosw-btn-' + pid).
          attr('data-id', pid).
          removeClass('woosw-btn-added woosw-added');

      // refresh button
      woosw_refresh_button_id(pid);
    }
  });

  // found variation
  $(document).on('found_variation', function(e, t) {
    var product_id = $(e['target']).attr('data-product_id');

    // change id
    $('.woosw-btn-' + product_id).
        attr('data-id', t.variation_id).
        removeClass('woosw-btn-added woosw-added');

    // refresh button
    woosw_refresh_button_id(t.variation_id);
  });

  // reset data
  $(document).on('reset_data', function(e) {
    var product_id = $(e['target']).attr('data-product_id');

    // change id
    $('.woosw-btn-' + product_id).
        attr('data-id', product_id).
        removeClass('woosw-btn-added woosw-added');

    // refresh button
    woosw_refresh_button_id(product_id);
  });

  $(document.body).on('added_to_cart', function(e) {
    if (woosw_vars.auto_remove === 'yes') {
      woosw_load_count();
      woosw_get_data();
    }
  });

  // quick view
  $(document).
      on('click touch',
          '#woosw_wishlist .woosq-link, #woosw_wishlist .woosq-btn',
          function(e) {
            woosw_wishlist_hide();
            e.preventDefault();
          });

  // add to wishlist
  $(document).on('click touch', '.woosw-btn', function(e) {
    var $this = $(this);
    var id = $this.attr('data-id');
    var pid = $this.attr('data-pid');
    var product_id = $this.attr('data-product_id');
    var product_name = $this.attr('data-product_name');
    var product_image = $this.attr('data-product_image');

    if (typeof pid !== typeof undefined && pid !== false) {
      id = pid;
    }

    if (typeof product_id !== typeof undefined && product_id !== false) {
      id = product_id;
    }

    if ($this.hasClass('woosw-added')) {
      if (woosw_vars.button_action_added === 'remove') {
        // remove from  wishlist
        var data = {
          action: 'woosw_remove',
          product_id: id,
          key: key,
          nonce: woosw_vars.nonce,
        };

        $this.addClass('woosw-adding').
            find('.woosw-btn-icon').
            removeClass(woosw_vars.button_normal_icon + ' ' +
                woosw_vars.button_added_icon).
            addClass(woosw_vars.button_loading_icon);

        $.post(woosw_vars.wc_ajax_url.toString().
            replace('%%endpoint%%', 'woosw_remove'), data, function(response) {
          $this.removeClass('woosw-adding').
              find('.woosw-btn-icon').
              removeClass(woosw_vars.button_loading_icon);

          if (response.content != null) {
            $('#woosw_wishlist').
                html(response.content).
                addClass('woosw-loaded');
          }

          if (response.notice != null) {
            woosw_notice(response.notice);
          }

          if (response.count != null) {
            woosw_change_count(response.count);
          }

          if ($storage && response.data) {
            sessionStorage.setItem('woosw_data_' + response.data.key,
                JSON.stringify(response.data));
          }

          if (response.data.fragments) {
            woosw_refresh_fragments(response.data.fragments);
          }

          if (response.data.ids) {
            woosw_refresh_buttons(response.data.ids);
            woosw_refresh_ids(response.data.ids);
          }

          $(document.body).trigger('woosw_remove', [product_id]);
        });
      } else if (woosw_vars.button_action_added === 'page') {
        // open wishlist page
        window.location.href = woosw_vars.wishlist_url;
      } else {
        // open wishlist popup
        if ($('#woosw_wishlist').hasClass('woosw-loaded')) {
          woosw_wishlist_show();
        } else {
          woosw_wishlist_load();
        }
      }
    } else {
      // add product
      var data = {
        action: 'woosw_add', product_id: id, nonce: woosw_vars.nonce,
      };

      $this.addClass('woosw-adding').
          find('.woosw-btn-icon').
          removeClass(woosw_vars.button_normal_icon + ' ' +
              woosw_vars.button_added_icon).
          addClass(woosw_vars.button_loading_icon);

      $.post(woosw_vars.wc_ajax_url.toString().
          replace('%%endpoint%%', 'woosw_add'), data, function(response) {
        $this.removeClass('woosw-adding').
            find('.woosw-btn-icon').
            removeClass(woosw_vars.button_loading_icon);

        if (woosw_vars.button_action === 'list') {
          if (response.content != null) {
            $('#woosw_wishlist').
                html(response.content).
                addClass('woosw-loaded');
          }

          if (response.notice != null) {
            woosw_notice(response.notice.replace('{name}',
                '<strong>' + product_name + '</strong>'));
          }

          woosw_perfect_scrollbar();
          woosw_wishlist_show();
        }

        if (woosw_vars.button_action === 'message') {
          $('#woosw_wishlist').removeClass('woosw-loaded');

          $.notiny({
            theme: 'woosw',
            position: woosw_vars.message_position,
            image: product_image,
            text: response.notice.replace('{name}',
                '<strong>' + product_name + '</strong>'),
          });
        }

        if (woosw_vars.button_action === 'no') {
          // add to wishlist solely
          $('#woosw_wishlist').removeClass('woosw-loaded');
        }

        if (response.count != null) {
          woosw_change_count(response.count);
        }

        if (response.status === 1) {
          woosw_refresh_button_id(id);
        }

        if ($storage && response.data) {
          sessionStorage.setItem('woosw_data_' + response.data.key,
              JSON.stringify(response.data));
        }

        if (response.data.fragments) {
          woosw_refresh_fragments(response.data.fragments);
        }

        if (response.data.ids) {
          woosw_refresh_buttons(response.data.ids);
          woosw_refresh_ids(response.data.ids);
        }

        $(document.body).trigger('woosw_add', [id]);
      });
    }

    e.preventDefault();
  });

  // add product
  $(document).on('click touch', '.woosw-item--add span', function(e) {
    var $this = $(this);
    var key = $this.closest('.woosw-items').data('key');
    var $this_item = $this.closest('.woosw-item');
    var product_id = $this_item.attr('data-id');
    var product_name = $this_item.attr('data-product_name');
    var data = {
      action: 'woosw_add',
      product_id: product_id,
      key: key,
      nonce: woosw_vars.nonce,
    };

    $this.addClass('woosw-item--adding');

    $.post(
        woosw_vars.wc_ajax_url.toString().replace('%%endpoint%%', 'woosw_add'),
        data, function(response) {
          $this.addClass('woosw-item--adding');

          if (response.content != null) {
            $('#woosw_wishlist').
                html(response.content).
                addClass('woosw-loaded');
          }

          if (response.notice != null) {
            woosw_notice(response.notice.replace('{name}',
                '<strong>' + product_name + '</strong>'));
          }

          if (response.count != null) {
            woosw_change_count(response.count);
          }

          if ($storage && response.data) {
            sessionStorage.setItem('woosw_data_' + response.data.key,
                JSON.stringify(response.data));
          }

          if (response.data.fragments) {
            woosw_refresh_fragments(response.data.fragments);
          }

          if (response.data.ids) {
            woosw_refresh_buttons(response.data.ids);
            woosw_refresh_ids(response.data.ids);
          }

          $(document.body).trigger('woosw_add', [product_id]);

          // list shortcode
          if ($this.closest('.woosw-list').length) {
            location.reload();
          }
        });

    e.preventDefault();
  });

  // remove product
  $(document).on('click touch', '.woosw-item--remove span', function(e) {
    var $this = $(this);
    var key = $this.closest('.woosw-items').data('key');
    var $this_item = $this.closest('.woosw-item');
    var product_id = $this_item.attr('data-id');
    var data = {
      action: 'woosw_remove',
      product_id: product_id,
      key: key,
      nonce: woosw_vars.nonce,
    };

    $this.addClass('woosw-item--removing');

    $.post(woosw_vars.wc_ajax_url.toString().
        replace('%%endpoint%%', 'woosw_remove'), data, function(response) {
      $this.removeClass('woosw-item--removing');
      $this_item.remove();

      if (response.content != null) {
        $('#woosw_wishlist').html(response.content).addClass('woosw-loaded');
      }

      if (response.notice != null) {
        woosw_notice(response.notice);
      }

      if (response.count != null) {
        woosw_change_count(response.count);
      }

      if ($storage && response.data) {
        sessionStorage.setItem('woosw_data_' + response.data.key,
            JSON.stringify(response.data));
      }

      if (response.data.fragments) {
        woosw_refresh_fragments(response.data.fragments);
      }

      if (response.data.ids) {
        woosw_refresh_buttons(response.data.ids);
        woosw_refresh_ids(response.data.ids);
      }

      $(document.body).trigger('woosw_remove', [product_id]);
    });

    e.preventDefault();
  });

  // empty wishlist
  $(document).on('click touch', '.woosw-empty', function(e) {
    var $this = $(this);

    if (confirm(woosw_vars.empty_confirm)) {
      woosw_popup_loading();

      var key = $this.data('key');
      var data = {
        action: 'woosw_empty', key: key, nonce: woosw_vars.nonce,
      };

      $.post(woosw_vars.wc_ajax_url.toString().
          replace('%%endpoint%%', 'woosw_empty'), data, function(response) {
        if (response.content != null) {
          $('#woosw_wishlist').html(response.content).addClass('woosw-loaded');
        }

        if (response.notice != null) {
          woosw_notice(response.notice);
        }

        if (response.count != null) {
          woosw_change_count(response.count);
        }

        if ($storage && response.data) {
          sessionStorage.setItem('woosw_data_' + response.data.key,
              JSON.stringify(response.data));
        }

        if (response.data.fragments) {
          woosw_refresh_fragments(response.data.fragments);
        }

        if (response.data.ids) {
          woosw_refresh_buttons(response.data.ids);
          woosw_refresh_ids(response.data.ids);
        }

        woosw_popup_loaded();

        $(document.body).trigger('woosw_empty', [key]);
      });
    }

    e.preventDefault();
  });

  // click on area
  $(document).on('click touch', '.woosw-popup', function(e) {
    var woosw_content = $('.woosw-popup-content');

    if ($(e.target).closest(woosw_content).length == 0) {
      woosw_wishlist_hide();
      woosw_manage_hide();
    }
  });

  // continue
  $(document).on('click touch', '.woosw-continue', function(e) {
    var url = $(this).attr('data-url');
    woosw_wishlist_hide();

    if (url !== '') {
      window.location.href = url;
    }

    e.preventDefault();
  });

  // close
  $(document).
      on('click touch', '#woosw_wishlist .woosw-popup-close', function(e) {
        woosw_wishlist_hide();
        e.preventDefault();
      });

  // manage close
  $(document).
      on('click touch', '#woosw_manage .woosw-popup-close', function(e) {
        woosw_manage_hide();
        e.preventDefault();
      });

  // manage wishlists
  $(document).on('click touch', '.woosw-manage', function(e) {
    e.preventDefault();
    woosw_popup_loading();

    var data = {
      action: 'woosw_manage_wishlists', nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
            replace('%%endpoint%%', 'woosw_manage_wishlists'), data,
        function(response) {
          woosw_wishlist_hide();
          $('#woosw_manage').html(response);
          woosw_manage_show();
          woosw_popup_loaded();
        });
  });

  // add wishlist
  $(document).on('click touch', '#woosw_add_wishlist', function(e) {
    e.preventDefault();
    woosw_popup_loading();

    var name = $('#woosw_wishlist_name').val();
    var data = {
      action: 'woosw_add_wishlist', name: name, nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
            replace('%%endpoint%%', 'woosw_add_wishlist'), data,
        function(response) {
          $('#woosw_manage').html(response);
          $('#woosw_wishlist').removeClass('woosw-loaded');
          woosw_popup_loaded();
        });
  });

  // set default
  $(document).on('click touch', '.woosw-set-default', function(e) {
    e.preventDefault();
    woosw_popup_loading();

    var key = $(this).data('key');
    var data = {
      action: 'woosw_set_default', key: key, nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
        replace('%%endpoint%%', 'woosw_set_default'), data, function(response) {
      if (response.count != null) {
        woosw_change_count(response.count);
      }

      if ((response.products != null) && response.products.length) {
        response.products.forEach((product_id) => {
          woosw_refresh_button_id(product_id);
        });
      }

      $('#woosw_manage').html(response.content);

      if ($storage && response.data) {
        sessionStorage.setItem('woosw_data_' + response.data.key,
            JSON.stringify(response.data));
      }

      if (response.data.fragments) {
        woosw_refresh_fragments(response.data.fragments);
      }

      if (response.data.ids) {
        woosw_refresh_buttons(response.data.ids);
        woosw_refresh_ids(response.data.ids);
      }

      $('#woosw_wishlist').removeClass('woosw-loaded');
      woosw_popup_loaded();
    });
  });

  // delete wishlist
  $(document).on('click touch', '.woosw-delete-wishlist', function(e) {
    e.preventDefault();

    if (confirm(woosw_vars.delete_confirm)) {
      woosw_popup_loading();

      var key = $(this).data('key');
      var data = {
        action: 'woosw_delete_wishlist', key: key, nonce: woosw_vars.nonce,
      };

      $.post(woosw_vars.wc_ajax_url.toString().
              replace('%%endpoint%%', 'woosw_delete_wishlist'), data,
          function(response) {
            $('#woosw_manage').html(response);
            $('#woosw_wishlist').removeClass('woosw-loaded');
            woosw_popup_loaded();
          });
    }
  });

  // view wishlist
  $(document).on('click touch', '.woosw-view-wishlist', function(e) {
    e.preventDefault();
    woosw_popup_loading();

    var key = $(this).data('key');
    var data = {
      action: 'woosw_view_wishlist', key: key, nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
            replace('%%endpoint%%', 'woosw_view_wishlist'), data,
        function(response) {
          woosw_manage_hide();
          $('#woosw_wishlist').removeClass('woosw-loaded').html(response);
          woosw_wishlist_show();
          woosw_popup_loaded();
        });
  });

  // menu item
  $(document).
      on('click touch',
          '.woosw-menu-item a, .woosw-menu a, .woosw-link.woosw-link-auto a',
          function(e) {
            if (woosw_vars.menu_action === 'open_popup') {
              e.preventDefault();

              if ($('#woosw_wishlist').hasClass('woosw-loaded')) {
                woosw_wishlist_show();
              } else {
                woosw_wishlist_load();
              }
            }
          });

  // link popup
  $(document).on('click touch', '.woosw-link.woosw-link-popup a', function(e) {
    e.preventDefault();

    if ($('#woosw_wishlist').hasClass('woosw-loaded')) {
      woosw_wishlist_show();
    } else {
      woosw_wishlist_load();
    }
  });

  // account link
  $(document).
      on('click touch', '.woocommerce-MyAccount-navigation-link--wishlist a',
          function(e) {
            if (woosw_vars.page_myaccount === 'yes_popup') {
              e.preventDefault();

              if ($('#woosw_wishlist').hasClass('woosw-loaded')) {
                woosw_wishlist_show();
              } else {
                woosw_wishlist_load();
              }
            }
          });

  // copy link
  $(document).
      on('click touch', '#woosw_copy_url, #woosw_copy_btn', function(e) {
        e.preventDefault();
        let $link = $('#woosw_copy_url');
        let link = $link.val();

        navigator.clipboard.writeText(link).then(function() {
          alert(woosw_vars.copied_text + ' ' + link);
        }, function() {
          alert('Failure to copy!');
        });

        $link.select();
      });

  // add note
  $(document).on('click touch', '.woosw-item--note', function() {
    if ($(this).closest('.woosw-item').find('.woosw-item--note-add').length) {
      $(this).closest('.woosw-item').find('.woosw-item--note-add').show();
      $(this).hide();
    }
  });

  $(document).on('click touch', '.woosw_add_note', function(e) {
    e.preventDefault();
    woosw_popup_loading();

    var $this = $(this);
    var key = $this.closest('.woosw-items').data('key');
    var product_id = $this.closest('.woosw-item').attr('data-id');
    var note = $this.closest('.woosw-item').find('input[type="text"]').val();
    var data = {
      action: 'woosw_add_note',
      key: key,
      product_id: product_id,
      note: woosw_html_entities(note),
      nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
        replace('%%endpoint%%', 'woosw_add_note'), data, function(response) {
      $this.closest('.woosw-item').
          find('.woosw-item--note').
          html(response).
          show();
      $this.closest('.woosw-item').find('.woosw-item--note-add').hide();
      woosw_popup_loaded();
    });
  });

  // resize
  $(window).on('resize', function() {
    woosw_fix_height();
  });

  function woosw_wishlist_load() {
    var data = {
      action: 'woosw_load', nonce: woosw_vars.nonce,
    };

    $.post(
        woosw_vars.wc_ajax_url.toString().replace('%%endpoint%%', 'woosw_load'),
        data, function(response) {
          if (response.content != null) {
            $('#woosw_wishlist').html(response.content);
          }

          if (response.count != null) {
            if ($(
                    '#woosw_wishlist .woosw-items:not(.woosw-suggested-items) .woosw-item').length &&
                ($('#woosw_wishlist .woosw-items:not(.woosw-suggested-items) .woosw-item').length !=
                    response.count)) {
              woosw_change_count(
                  $('#woosw_wishlist .woosw-items:not(.woosw-suggested-items) .woosw-item').length);
            } else {
              woosw_change_count(response.count);
            }
          }

          if (response.notice != null) {
            woosw_notice(response.notice);
          }

          $('#woosw_wishlist').addClass('woosw-loaded');

          woosw_perfect_scrollbar();
          woosw_wishlist_show();
        });
  }

  function woosw_load_count() {
    var data = {
      action: 'woosw_load_count', nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
        replace('%%endpoint%%', 'woosw_load_count'), data, function(response) {
      if (response.count != null) {
        var count = response.count;

        woosw_change_count(count);
        $(document.body).trigger('woosw_load_count', [count]);
      }
    });
  }

  function woosw_wishlist_show() {
    $('#woosw_wishlist').addClass('woosw-show');
    woosw_fix_height();

    $(document.body).trigger('woosw_wishlist_show');
  }

  function woosw_wishlist_hide() {
    $('#woosw_wishlist').removeClass('woosw-show');
    $(document.body).trigger('woosw_wishlist_hide');
  }

  function woosw_manage_show() {
    $('#woosw_manage').addClass('woosw-show');
    $(document.body).trigger('woosw_manage_show');
  }

  function woosw_manage_hide() {
    $('#woosw_manage').removeClass('woosw-show');
    $(document.body).trigger('woosw_manage_hide');
  }

  function woosw_popup_loading() {
    $('.woosw-popup').addClass('woosw-loading');
  }

  function woosw_popup_loaded() {
    $('.woosw-popup').removeClass('woosw-loading');
  }

  function woosw_change_count(count) {
    $('#woosw_wishlist .woosw-count').html(count);
    $('.woosw-link .woosw-link-inner').attr('data-count', count);

    if (parseInt(count) > 0) {
      $('.woosw-empty').show();
    } else {
      $('.woosw-empty').hide();
    }

    if ($('.woosw-menu-item .woosw-menu-item-inner').length) {
      $('.woosw-menu-item .woosw-menu-item-inner').attr('data-count', count);
    } else {
      $('.woosw-menu-item a').
          html('<span class="woosw-menu-item-inner" data-count="' + count +
              '"><i class="woosw-icon"></i><span>' + woosw_vars.menu_text +
              '</span></span>');
    }

    $(document.body).trigger('woosw_change_count', [count]);
  }

  function woosw_notice(notice) {
    $('.woosw-notice').html(notice);
    woosw_notice_show();
    setTimeout(function() {
      woosw_notice_hide();
    }, 3000);
  }

  function woosw_notice_show() {
    $('#woosw_wishlist .woosw-notice').addClass('woosw-notice-show');
  }

  function woosw_notice_hide() {
    $('#woosw_wishlist .woosw-notice').removeClass('woosw-notice-show');
  }

  function woosw_perfect_scrollbar() {
    if (woosw_vars.perfect_scrollbar === 'yes') {
      jQuery('#woosw_wishlist .woosw-popup-content-mid').
          perfectScrollbar({theme: 'wpc'});
    }
  }

  function woosw_html_entities(str) {
    return String(str).
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;').
        replace(/"/g, '&quot;');
  }

  function woosw_get_key() {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 6; i++) {
      result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
  }

  function woosw_fix_height() {
    // fix for center only
    jQuery('.woosw-popup-center .woosw-popup-content').
        height(2 * Math.floor(
                jQuery('.woosw-popup-center .woosw-popup-content').height() / 2) +
            2);
  }

  function woosw_load_data() {
    if ($storage) {
      try {
        var data = JSON.parse(sessionStorage.getItem('woosw_data_' + key));

        if (data.fragments) {
          woosw_refresh_fragments(data.fragments);
        }

        if (data.ids) {
          woosw_refresh_buttons(data.ids);
          woosw_refresh_ids(data.ids);
        }

        if (data.key && (key === null || key === undefined || key === '')) {
          Cookies.set('woosw_key', data.key, {expires: 7});
        }
      } catch (err) {
        woosw_get_data();
      }
    } else {
      woosw_get_data();
    }
  }

  function woosw_get_data() {
    var data = {
      action: 'woosw_get_data', nonce: woosw_vars.nonce,
    };

    $.post(woosw_vars.wc_ajax_url.toString().
        replace('%%endpoint%%', 'woosw_get_data'), data, function(response) {
      if (response) {
        if ($storage) {
          sessionStorage.setItem('woosw_data_' + response.key,
              JSON.stringify(response));
        }

        if (response.fragments) {
          woosw_refresh_fragments(response.fragments);
        }

        if (response.ids) {
          woosw_refresh_buttons(response.ids);
          woosw_refresh_ids(response.ids);
        }

        if (response.key &&
            (key === null || key === undefined || key === '' || key !==
                response.key)) {
          Cookies.set('woosw_key', response.key, {expires: 7});
        }

        $(document.body).trigger('woosw_data_refreshed', [response]);
      }
    });
  }

  function woosw_refresh_fragments(fragments) {
    $.each(fragments, function(key, value) {
      $(key).replaceWith(value);
    });

    $(document.body).trigger('woosw_fragments_refreshed', [fragments]);
  }

  function woosw_refresh_ids(ids) {
    added_ids = ids;
  }

  function woosw_refresh_buttons(ids) {
    $('.woosw-btn').removeClass('woosw-btn-added woosw-added');
    $('.woosw-btn:not(.woosw-btn-has-icon)').html(woosw_vars.button_text);
    $('.woosw-btn.woosw-btn-has-icon').
        find('.woosw-btn-icon').
        removeClass(woosw_vars.button_added_icon).
        addClass(woosw_vars.button_normal_icon);
    $('.woosw-btn.woosw-btn-has-icon').
        find('.woosw-btn-text').
        html(woosw_vars.button_text);

    $.each(ids, function(key, value) {
      $('.woosw-btn-' + key).addClass('woosw-btn-added woosw-added');
      $('.woosw-btn-' + key + ':not(.woosw-btn-has-icon)').
          html(woosw_vars.button_text_added);
      $('.woosw-btn-has-icon.woosw-btn-' + key).
          find('.woosw-btn-icon').
          removeClass(woosw_vars.button_normal_icon).
          addClass(woosw_vars.button_added_icon);
      $('.woosw-btn-has-icon.woosw-btn-' + key).
          find('.woosw-btn-text').
          html(woosw_vars.button_text_added);

      if (value.parent !== undefined) {
        $('.woosw-btn-' + value.parent).addClass('woosw-btn-added woosw-added');
        $('.woosw-btn-' + value.parent + ':not(.woosw-btn-has-icon)').
            html(woosw_vars.button_text_added);
        $('.woosw-btn-has-icon.woosw-btn-' + value.parent).
            find('.woosw-btn-icon').
            removeClass(woosw_vars.button_normal_icon).
            addClass(woosw_vars.button_added_icon);
        $('.woosw-btn-has-icon.woosw-btn-' + value.parent).
            find('.woosw-btn-text').
            html(woosw_vars.button_text_added);
      }
    });

    $(document.body).trigger('woosw_buttons_refreshed', [ids]);
  }

  function woosw_refresh_button_id(id) {
    $('.woosw-btn[data-id="' + id + '"]').
        removeClass('woosw-btn-added woosw-added');
    $('.woosw-btn[data-id="' + id + '"]:not(.woosw-btn-has-icon)').
        html(woosw_vars.button_text);
    $('.woosw-btn-has-icon.woosw-btn[data-id="' + id + '"]').
        find('.woosw-btn-icon').
        removeClass(woosw_vars.button_added_icon).
        addClass(woosw_vars.button_normal_icon);
    $('.woosw-btn-has-icon.woosw-btn[data-id="' + id + '"]').
        find('.woosw-btn-text').
        html(woosw_vars.button_text);

    $.each(added_ids, function(key) {
      if (parseInt(key) === parseInt(id)) {
        $('.woosw-btn[data-id="' + id + '"]').
            addClass('woosw-btn-added woosw-added');
        $('.woosw-btn[data-id="' + id + '"]:not(.woosw-btn-has-icon)').
            html(woosw_vars.button_text_added);
        $('.woosw-btn-has-icon.woosw-btn[data-id="' + id + '"]').
            find('.woosw-btn-icon').
            removeClass(woosw_vars.button_normal_icon).
            addClass(woosw_vars.button_added_icon);
        $('.woosw-btn-has-icon.woosw-btn[data-id="' + id + '"]').
            find('.woosw-btn-text').
            html(woosw_vars.button_text_added);
      }
    });

    $(document.body).trigger('woosw_refresh_button_id', [id, added_ids]);
  }
})(jQuery);