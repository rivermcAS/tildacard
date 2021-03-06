
function MobileDetect() {
    var width = $(window).width();
    if (width < 992) {
        return true;
    }
    else {
        return false;
    }
}

class PopupCard {

    constructor() {
        this.item = $('.popup-btn');
    }

    getPopup() {
        var self_this = this.item;
        self_this.magnificPopup({
            type: 'inline',
            preloader: false,

            callbacks:  {
                beforeOpen: function() {
                    var itemID = $(this.st.el).data('id');

                    $('.card_popup').load("/assets/template/php/getCard.php",
                        {
                            action: 'getCard',
                            snippet: 'msProducts',
                            parents: 1,
                            id: itemID,
                            tpl: 'Item',
                            tv: 'TechImage, Widget, Maps'
                        },
                        function(response) {
                            //console.log('getCard response: ' + response);
                        });

                },
                open: function() {
                    $('html, body').css({'overflow': 'hidden'});
                    setTimeout(function(){
                        $('.card_popup').css('opacity', 1);
                        miniShop2.Gallery.initialize();
                        /*
                        var isMobile = MobileDetect();
                        if (!isMobile) {
                            stickyInit();                            
                        }
                        */

                        $('input[name=phone]').usPhoneFormat({format: 'x-xxx-xxx-xxxx'});
                        ymaps.ready(cityGeocode($('#map').data('address')));
                    },1000);
                },
                close: function() {
                    $('.card_popup').css('opacity', 0).html('');
                    $('html, body').css({'overflow': 'auto'});
                }
            }
        });
    }
}