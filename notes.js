// AJAX

$.ajax({
  url: 'http://www.football-data.org/v1/competitions/',
  method: 'GET',
  success: function(competitionsData) {
    $.ajax({
      url: competitionsData[0]["_links"]["self"]["href"],
      method: 'GET',
      success: function(data) {

      }
    })
  }
}).then()

// MUST have a success callback in order to do anything with response of API request
