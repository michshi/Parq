$('document').ready(function() {

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
      })

      // display the results

      for (let i = 0; i < results.data.length; i++) {

        let name = results.data[i].fullName

        let designation = results.data[i].designation

        let description = results.data[i].description

        let parkURL = results.data[i].url

        let caption = results.data[i].images[0].caption

        let imgURL = results.data[i].images[0].url

        let imgAlt = results.data[i].images[0].altText

        let imgTitle = results.data[i].images[0].title

        $(`#results`).append(`<div class="container-fluid"> <div class="thumbnail"> <img src="${imgURL}" alt="${imgAlt}"> </div> <div class="caption"> ${imgTitle}: <br/> ${caption} </div> <br/> <h3> ${name} </h3> <p> ${designation} </p> <p> ${description} </p> <div class="btn-group"> <a href="${parkURL}" class="btn btn-default" role="button" target="_blank">Learn More!</a> <button type="button" class="btn btn-default favorite">Favorite</button> </div> </div>`)

      }

      // favorite button event handler + results.data to localStorage
      $('.favorite').click(function() {
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

  // TODO:

  var addFavToLocalStorage = function(myId, myPark) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    let found = false
    for(let i=0; i<favorites.length; i++) {
      if(favorites[i].id === myId) {
        found = true
      }
    }

    // push on a new object representing a park, into the array
    if(!found) {
      favorites.push({
        parkCode: myId,
        fullName: myPark
      })


    // save to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites))
    }

  }

  // remove from local storage
  let favsArr = JSON.parse(localStorage.getItem('favorites') || '[]')
  for(let i=0; i<favsArr.length; i++) {
    if(favsArr[i].id === data.results[i].fullName) {
      favsArr.splice(i, 1)
    }
  }




  // TODO: add media query to set max size

});
