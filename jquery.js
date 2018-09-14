// This is the script for the section: jQuery (10)
// Add Images and Captions using jQuery
// Use jQuery to hijack and capture the submit event.
// When the form is submitted:
//    a. prepend an image tag with caption (according to the form values) into the container area (OPTIONAL: add a time stamp as well)
//    b. add UX features: ie. clear both form fields and give the image url text field focus

$(function() {
    $('#image-url').focus();

    $('#image-submit').submit(function(event) {
        event.preventDefault();
        let imageUrl = $('#image-url').val();
        let imageTitle = $('#image-title').val();
        let imageCaption = $('#caption').val();

        let decorator = `<figure class="figure m-2">
                            <img src='${imageUrl}' class="figure-img img-fluid rounded img-thumbnail" alt=${imageTitle}>
                            <figcaption class="figure-caption text-center">&#10075;${imageCaption}&#10076;<br><em><small  class="text-uppercase">(${new Date().toUTCString()})</small></em></figcaption>
                        </figure>`;

        $('.gallery').prepend(decorator);
        $('#image-url').val('').focus();
        $('#image-title').val('');
        $('#caption').val('');
    });

});
