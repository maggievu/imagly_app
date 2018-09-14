// This is the script for the section: Setting Up Firebase (10)

var config = {
    apiKey: "AIzaSyASk03rmuDCB1ChdUzLnXTqxW71e5vVark",
    authDomain: "image-app-2511.firebaseapp.com",
    databaseURL: "https://image-app-2511.firebaseio.com",
    projectId: "image-app-2511",
    storageBucket: "",
    messagingSenderId: "145008290487"
};

firebase.initializeApp(config);




const imaglyRef = firebase.database().ref('/images');
const newsRef = firebase.database().ref('/news');

$(function() {
    $('#image-url').focus();

    $('#image-submit').submit(function(event) {
        event.preventDefault();
        let imageUrl = $('#image-url').val();
        let imageTitle = $('#image-title').val();
        let imageCaption = $('#caption').val();

        // This is the script for the section: Connecting to Firebase (10)
        imaglyRef.push({ url: imageUrl, title: imageTitle, caption: imageCaption });

        $('#image-url').val('').focus();
        $('#image-title').val('');
        $('#caption').val('');

        $('.figure-img').unbind().on('mousedown', function() {
            console.log('bleh');
        });
    }); // end of submit form =======================

    // This is the script for the section: Creating an Image Post to Firebase (15)
    imaglyRef.on('child_added', update);
    imaglyRef.on('child_changed', update);

    // Build a news section that fetches a list of news from Firebase (each news item has only a body) (5)
    newsRef.on('child_added', update_news);
    newsRef.on('child_changed', update_news);




}); // end of document-ready =======================

// FUNCTION HELPER

function update(snap) {
    const imageId = snap.key;
    const imageObj = snap.val();

    let imageUrl = imageObj.url;
    let imageTitle = imageObj.title;
    let imageCaption = imageObj.caption;

    let decorator = `<figure class="figure m-2" id=${imageId}>
                    <img src='${imageUrl}' class="figure-img img-fluid rounded img-thumbnail" alt=${imageTitle}>
                    <figcaption class="figure-caption text-center">&#10075;${imageCaption}&#10076;<br><em><small  class="text-uppercase">(${new Date().toUTCString()})</small></em></figcaption>
                    <button class="btn btn-outline-danger btn-xs button-delete">x</button>
                    </figure>`;
    $('.gallery').prepend(decorator);

    // BONUS Be able to delete an image post using Firebase (5)

    $('.button-delete').unbind().click(function() {
        if (confirm('Are you sure to delete this image?')) {
            $(this).parent().fadeOut(function() {
                let id = $(this).attr('id');
                firebase.database().ref(`images/${id}`).remove();
            });
        }
    });

} // end of main update function helper ==================


function update_news(snap) {
    const newId = snap.key;
    const newObj = snap.val();

    let newItem = newObj.new;

    let decorator = `<div class="card px-2 py-2 my-2">${newItem}</div>`;

    $('.news').prepend(decorator);


} // end of main update function helper ==================
