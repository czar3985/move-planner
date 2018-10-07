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
             });

            $('#nytimes-header').text('New York Times Articles About ' + city);
            $("#nytimes-articles").append(items.join(""));
        }).error(function () {
            $('#nytimes-header').text('New York Times articles could not be loaded');
        });
    }).error(function () {
        $('#nytimes-header').text('New York Times articles could not be loaded');
    });
}

function loadWikipediaLinks(city) {
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + city,
        dataType: "jsonp",
        success: function (response) {
            var items = [];
            articles = response[1];
            $.each(articles, function (index, article) {
                items.push("<li>" +
                    "<a href='https://en.wikipedia.org/wiki/" + article + "'>" +
                    article + "</a>"+"</li>");
            });
            $('#wikipedia-header').text('Wikipedia Links About ' + city);
            $("#wikipedia-links").append(items.join(""));
        }
    });
}

function loadData() {

    var $wikiElem = $('#wikipedia-links');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var street = $('#street').val();
    var city = $('#city').val();

    $greeting.text('You plan to live at ' + street + ', ' + city + '.');

    loadStreetView(street + ', ' + city);

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // NY Times AJAX Request
    loadNytimesArticles(city);

    // Wikipedia AJAX Request
    loadWikipediaLinks(city);

    return false;
}

$('#form-container').submit(loadData);
