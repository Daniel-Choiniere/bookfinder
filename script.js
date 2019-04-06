/*global goodreadsApiKey */
/*global fetch */
/*global DOMParser */

function search() {
    const keyword = document.getElementById("keyword").value;
    // console.log(keyword);
    
    // get results from API using fetch
    console.log(goodreadsApiKey);
    const endpoint = "https://www.goodreads.com/search/index.xml";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = proxy + endpoint + "?key=" + goodreadsApiKey + "&q=" + keyword;
    
    fetch(url)
    .then(function(response) {
        // console.log(response);
        // converts the XML to a string
        return response.text();
    })
    .then(function(response){
        // creating a parser
        const parser = new DOMParser();
        // using the parser to parse the data to text/xml
        const parsedResponse = parser.parseFromString(response, "text/xml");
        // turning the XML object to a JSON object
        const parsedJSON = xmlToJson(parsedResponse);
        // logs out the new JSON object
        console.log(parsedJSON);
        displayResults(parsedJSON);
    });
}

// By calling the funtion inside of the search() function now I can use data from that local function
 // Display results on page as a list
    function displayResults(responseObj) {
        // console.log("calling inside", responseObj);
        
        document.getElementById("results").innerHTML = "";
        const works = responseObj.GoodreadsResponse.search.results.work;
        
        works.forEach(function(work) {
            // console.log(work);
            
            
            const title = work.best_book.title["#text"];
            console.log(title);
            const author = work.best_book.author.name["#text"];
            console.log(author);
            const imgUrl = work.best_book.image_url["#text"];
            console.log(imgUrl);
            
            
            const myListItem = document.createElement("li");
            const image = document.createElement("img");
            image.setAttribute("src", imgUrl);
            myListItem.innerHTML = title + " by " + author;
            document.getElementById("results").appendChild(myListItem);
            myListItem.appendChild(image);
            // document.getElementById("results").innerHTML = "myList";
            
        });
    }
 
    const myList = document.createElement("li");
    
    myList.innerHTML = "item1";
     
     
// source: "https://davidwalsh.name/convert-xml-json"
// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};