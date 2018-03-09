$('document').ready(function() {
  console.log('JS is connected')

  // click handler for search button

  $('#search-button').on('click', function() {

    // .getJSON request

    const query = $('#search-criteria').val()
    console.log('VALUE: ', query)
    if (query === '-') {
      alert('Please select a state')
    }

    var url = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&fields=images&api_key=rxttxjVYI5gSXDiMoxo3eHnANZZ48dfVFbXY4V7s`

    var $xhr = $.getJSON(url)
    $xhr.done(function(results) {

      if ($xhr.status !== 200) {
        return
      }
      console.log('RESULTS: ', results.data)
      $xhr.fail(function(err) {
        console.log(err)
      })

      // display the results

      for (let i = 0; i < results.data.length; i++) {

        let name = results.data[i].fullName

        let description = results.data[i].description

        let parkURL = results.data[i].url

        let caption = results.data[i].images[0].caption

        let imgURL = results.data[i].images[0].url
        let imgAlt = results.data[i].images[0].altText
        let imgTitle = results.data[i].images[0].title

        $(`#results`).append(`<div class="container-fluid"> <div class="thumbnail"> <img src="${imgURL}" alt="${imgAlt}"> </div> <div class="caption"> ${imgTitle}: <br/> ${caption} </div> <br/> <h3> ${name} </h3> <p> ${description} </p> <div class="btn-group">
        <a href="${parkURL}" class="btn btn-default" role="button" target="_blank">Learn More!</a> <button type="button" class="btn btn-default favorite">Favorite</button> </div> </div>`)

      }

      // favorite button event handler + results.data to localStorage
      // TODO: when user clicks to unfavorite, remove results.data from localStorage

      $('.favorite').click(function() {
        // localStorage.setItem('favoriteParks', JSON.stringify(results.data.fullName))
        $(this).toggleClass('btn-default btn-danger')
      })

    })
    $('#results').show()
  })

  // clear button event listener

  $('#clear-button').on('click', function() {
    $('#results').empty();
    $('#results').hide(1000);
    $('select').prop('selectedIndex', 0);
  });

});
