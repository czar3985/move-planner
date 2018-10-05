function loadStreetView(address) {
    // get google map api key from json file and put background image
    $.get("keys.json", function (data) {
        var googleMapsApiKey = data['google-api-key'];
        var imageSource = 'https://maps.googleapis.com/maps/api/streetview?' +
            'size=600x400&location=' + address +
            '&key=' + googleMapsApiKey;

        $('.bgimg').attr('src', imageSource);
    });
}

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var address = $('#street').val() + ', ' + $('#city').val();

    $greeting.text('You plan to live at ' + address + '.');

    loadStreetView(address);

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    return false;
}

$('#form-container').submit(loadData);
