'use strict';

/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default, console */

(function($) {

  // Init empty gallery array
  var container = [];

  // Loop over gallery items and push it to the array
  $('#gallery').find('figure').each(function() {
    var $link = $(this).find('a'),
      item = {
        src: $link.attr('href'),
        w: $link.data('width'),
        h: $link.data('height'),
        title: $link.data('caption')
      };
    container.push(item);
  });

  // Define click event on gallery item
  $('a').click(function(event) {

    // Prevent location change
    event.preventDefault();

    // Define object and gallery options
    var $pswp = $('.pswp')[0],
      options = {
        index: $(this).parent('figure').index(),
        bgOpacity: 0.85,
        showHideOpacity: true
      };

    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
  });

}(jQuery));

function listPictures() {
  var images = "../images/";
  var thumbnails = "../thumbnails/";

  $.ajax({
    url: thumbnails,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if (val.match(/\.(jpe?g|png|gif)$/)) {
          $("#gallery").append("<figure itemprop='associatedMedia' itemscope itemtype='https://schema.org/ImageObject'> <a href='" + images + val + "' data-width='1200' data-height='900' itemprop='contentUrl'> <img src='" + thumbnails + val + "' data-width='400' data-height='300' itemprop='thumbnail'> </figure>");
        }
      });
    }
  });
}
