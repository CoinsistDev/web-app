var loaderOn = () => {
    $('button').prop('disabled', true).blur();
    $('#consist-submit-loader').show();
  },
  loaderOff = () => {
    $('#consist-submit-loader').hide();
    $('button').prop('disabled', false).blur();
  },
  getImageSize = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

let loaderDOM = '',
  loaderDOMcss = {};

(($) => {
  $(document).ready(() => {
    console.log('DEBUG: Loader params', consist_loader);
    if (consist_loader.use_loader === 'yes') {
      $('body').append(
        '<div id="consist-submit-loader" style="display:none;"></div>'
      );
      $('#consist-submit-loader').css({
        background: consist_loader.loader_background_color,
      });

      switch (consist_loader.loader_type) {
        case 'shape':
          console.log(
            `DEBUG: Selected loader type is "shape > ${consist_loader.loader_type_shape_select}"`
          );
          switch (consist_loader.loader_type_shape_select) {
            case 'loading':
              loaderDOM = `<div id="loading" style="border:8px ${consist_loader.loader_type_shape_color}60 solid;border-top:8px ${consist_loader.loader_type_shape_color} solid;border-right:8px ${consist_loader.loader_type_shape_color} solid;border-bottom:8px ${consist_loader.loader_type_shape_color} solid"></div>`;
              // loaderDOMcss = {
              //   border: `8px ${consist_loader.loader_type_shape_color} solid`,
              //   'border-top': `8px ${consist_loader.loader_type_shape_color} solid`,
              //   'border-right': `8px ${consist_loader.loader_type_shape_color} solid`,
              //   'border-bottom': `8px ${consist_loader.loader_type_shape_color} solid`,
              // };
              break;
            case 'spinner':
              loaderDOM = '<div id="spin"></div>';
              break;
            case 'dots':
              loaderDOM =
                '<div id="dots"><span></span><span></span><span></span><span></span></div>';
              break;
            case 'countdown':
              loaderDOM = '<div id="countdown"></div>';
              break;
          }
          $('#consist-submit-loader').append(loaderDOM);
          // $('div#loading').css(loaderDOMcss);
          break;
        case 'upload':
          let imgTag = `<img src="${consist_loader.loader_type_upload.url}"`,
            imageStyle = '';
          getImageSize(consist_loader.loader_type_upload.url, (err, img) => {
            // Continue to build the img tag
            if (
              consist_loader.loader_upload_size.width ||
              consist_loader.loader_upload_size.height
            ) {
              var imageHeight = consist_loader.loader_upload_size.height
                  ? consist_loader.loader_upload_size.height
                  : (consist_loader.loader_upload_size.width /
                      img.naturalWidth) *
                    img.naturalHeight,
                imageWidth = consist_loader.loader_upload_size.width
                  ? consist_loader.loader_upload_size.width
                  : (consist_loader.loader_upload_size.height /
                      img.naturalHeight) *
                    img.naturalWidth;
              imageStyle = `height:${imageHeight}px;width:${imageWidth}px;margin:-${
                imageHeight / 2
              }px 0 0 -${
                imageWidth / 2
              }px;max-width:inherit;display:block;position:absolute;top:50%;left:50%;`;
            } else {
              imageStyle = `height:${img.naturalHeight}px;width:${
                img.naturalWidth
              }px;margin:-${img.naturalHeight / 2}px 0 0 -${
                img.naturalWidth / 2
              }px;max-width:inherit;display:block;position:absolute;top:50%;left:50%;`;
            }

            loaderDOM = `<div id="upload">${imgTag} style="${imageStyle}" /></div>`;
            $('#consist-submit-loader').append(loaderDOM);
          });
          break;
      }

      console.log(
        'DEBUG: Loader div attributes',
        $('#consist-submit-loader > div').attr('css')
      );
    }
  });
})(jQuery);
