var globalSearchResults = [];

var API_KEY = "AIzaSyAuBJaT3jQlKCsXii2QBQmZ58fMsRyhEb4";
var maxResults = 15;

//appendStatsToResultItems appends the viewCount resultItems
var appendStatsToResultItems = async (searchResults) => {
    let resultVideoIds = "";
    for (let result of searchResults) {
        resultVideoIds += result.id.videoId + ",";
    }
    let { items } = await getStats(resultVideoIds);
    for (let i = 0; i < searchResults.length; i++) {
        searchResults[i].snippet.viewCount = items[i].statistics.viewCount;
    }
    globalSearchResults = searchResults;
    displayResults(searchResults, 0);
    paginate(maxResults);
}

//getSearchItems takes the search_input as parameter which the 
//query from the client and does the API call and gets the result items
var getSearchItems = async (search_input) => {
    const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${search_input}`;
    const data = await getData(URL);
    return data;
}

//getStats takes the videoIds of the result items as parameter and 
//does the API call to get the viewCount of each search result
var getStats = async (videoIds) => {
    const URL = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}g&part=statistics`;
    const data = await getData(URL);
    return data;
}

var getData = async (URL) => {
    return await (await fetch(URL)).json();
}