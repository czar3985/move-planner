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

function loadNytimesArticles(city) {
    $.get("keys.json", function (data) {
        var nyTimesApiKey = data['nytimes-api-key'];
        var nytimesApiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
            city + '&sort=newest&api-key=' + nyTimesApiKey;
        $.getJSON(nytimesApiUrl, function (data) {
            var items = [];
            $.each(data['response']['docs'], function (index, article) {
                items.push("<li class='article'>" +
                    "<a href='" + article['web_url'] + "'>" +
                    article['headline']['main'] +
                    "</a>" +
                    "<p>" +
                    article['snippet'] +
                    "</p>" +
                    "</li>");
                console.log("hi");
            });

            $('#nytimes-header').text('New York Times Articles About ' + city);
            $("#nytimes-articles").append(items.join(""));
        });
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

    // NY Times AJAX Request
    loadNytimesArticles($('#city').val());

    return false;
}

$('#form-container').submit(loadData);
