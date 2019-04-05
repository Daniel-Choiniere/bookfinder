/*global goodreadsApiKey */
/*global fetch */

function search() {
    const keyword = document.getElementById("keyword").value;
    console.log(keyword);
    
    // get results from API using fetch
    console.log(goodreadsApiKey);
    const endpoint = "https://www.goodreads.com/search/index.xml?key=";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = proxy + endpoint + "?key=" + goodreadsApiKey + "&q=" + keyword;
    
    fetch(url)
    .then(function(response) {
        console.log(response);
    });
}