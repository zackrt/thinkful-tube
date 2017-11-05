//declare global variable of the youtube url, from thinkful assignment
const Youtube_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
function getDataFromYoutube(searchTerm,callback) {
    const query = {
        //search terms as a string
        q: `${searchTerm} in:name`,
        part: 'snippet' ,
        maxResults: 5,
        per_page: 5,
        key : 'AIzaSyAZG3H2t31ZB1bqBwih44E73mF2mvLiVfg'
      }
      $.getJSON(Youtube_Search_URL, query, callback);
}
function renderResults(results) {
    //renderResults return title with link and thumbnail
   
    return `<div>
    <h3>
    <a class="js-results-name" href="http://www.youtube.com/watch?v=${results.id.videoId}" target= "_blank">${results.snippet.title}</h3></a>
    <p><span class="js-search-result">
    </span>
    </p>
    <img src="${results.snippet.thumbnails.medium.url}">
    </div>`;
    //need to insert img scr= thumbnail, used right-click & "copy path"
}
function displayYoutubeSearchData(data){
    //invokes resultsCount with the parameters data.items.length or the number of items in the array of items, found in network on chrome
    resultsCount(data.items.length);
    //set const results to Data to jQuery .map with values item, index fat arrow function, renderResult with value (item) ???
    const results = data.items.map((item, index) => renderResults(item));
    //send those results into the DOM with .html into the div w/ class = js-search-results.
    // items.snippet.thumbnails.medium.url;
    $('.js-search-results').html(results);
}
function watchSubmit() {
    $('.js-search-form').submit(event => {

    event.preventDefault();
    //changing aria-live property hidden to false in results h3
    $(".js-search-results").prop('hidden', false);
    //get that element, the object
    const queryTarget = $(event.currentTarget).find('.js-query');
    //sets const query to a value
    const query = queryTarget.val();
    //clears text from textbox
    queryTarget.val("");
    //runs getDataFromYoutube with search term 'query'(a value), with call back 'displayYoutubeSearchData'
    getDataFromYoutube(query,displayYoutubeSearchData);
    });
}
$(watchSubmit);
//Should be given textual feedback when results appear, including the number of results.
function resultsCount(numResults){
    console.log(numResults);
    $("#results-count").html(`Displaying ${numResults} video links:`);
}