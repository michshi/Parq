$('document').ready(function() {
  console.log('JS is connected');

  // TODO: add click handler to search button

  $('#search-button').on('click', function() {
    $('#results').show();

    // TODO: write .getJSON request

    var query = $('#search-criteria').val();
    console.log('VALUE: ', query);
    if (query === '-') {
      alert('Please select a state');
    }

    var url = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=rxttxjVYI5gSXDiMoxo3eHnANZZ48dfVFbXY4V7s`;

    var $xhr = $.getJSON(url);
    $xhr.done(function(results) {

      if ($xhr.status !== 200) {
        return;
      }
      console.log('RESULTS: ', results.data);
      $xhr.fail(function(err) {
        console.log(err);
      });

      // TODO: display the results

      for (var i = 0; i < results.data.length; i++) {
        // if (query === '-') {
        //   alert('Please select a state');
        //   $('#results'.hide());
        //   break;}

        var name = results.data[i].fullName;

        var description = results.data[i].description;

        var weather = results.data[i].weatherInfo;

        // $('#results').append('<p>' + name + ': ' + '<br/>' + description + '</p>' + '<br/>');

        // $('#results').append('<p>' + name + ': ' + '<br/>' + description + '<div>' + weather + '<div>' + '</p>' + '<br/>');

        $('#results').append('<p>' + '<ul>' + name + ': ' + '<br/>' + '<li>' + description + '</li>' + '<br/>' + '<li>' + weather + '</li>' + '</ul>' + '</p>' + '<br/>');
      }

    });

  });

  // TODO: add clear button event listener

  $('#clear-button').on('click', function() {
    $('#results').empty();
    $('#results').hide(1000);
    $('select').prop('selectedIndex', 0);
  });

});
