/*

[Main Script]

Project: Konta
Version: 1.0
Author : Themeholy

*/
;(function($){
    "use strict";

    jQuery(window).on( 'elementor/frontend/init', function() {
        // console.log( elementorFrontend);
        if( typeof elementor != "undefined" && typeof elementor.settings.page != "undefined" ) {

            elementor.settings.page.addChangeCallback( 'konta_header_style', function ( newValue ) {
                if( newValue == 'prebuilt'  ) {
                    elementor.saver.update({
                        onSuccess: function() {
                            elementor.reloadPreview();
                            elementor.once( 'preview:loaded', function() {
                                elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                            } );
                        }
                    });
                }
            } );
            

            elementor.settings.page.addChangeCallback( 'konta_header_builder_option', function ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            } );
            
            elementor.settings.page.addChangeCallback( 'konta_footer_style', kontaFooterStyle );
            function kontaFooterStyle ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            }
            elementor.settings.page.addChangeCallback( 'konta_footer_choice', kontaFooterChoice );
            function kontaFooterChoice ( newValue ) {
                elementor.saver.update({
                    onSuccess: function() {
                        elementor.reloadPreview();
                        elementor.once( 'preview:loaded', function() {
                            elementor.getPanelView().setPage( 'page_settings' ).activateTab('settings');
                        } );
                    }
                });
            }

        }
    });
    
})(jQuery);