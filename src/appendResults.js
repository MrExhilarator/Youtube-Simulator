//displayResults iterates through the 15 search results and 
//appends the results based on the page the user is currently in
var displayResults = (searchResults, page) => {
    searchResults = searchResults.slice(page * 4, page * 4 + 4);
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

//createAndAppendSearchResult creates and appends the individual
//search result into the container in which the results are to be appended
var createAndAppendSearchResult = (result) => {
    let searchResultsEle = document.getElementById("searchResults");
    let {
        id,
        snippet
    } = result;

    let videoId = id.videoId;

    let resultItemEle = document.createElement("div");
    resultItemEle.id = videoId;
    resultItemEle.classList.add("result-item");

    let videoEle = document.createElement("iframe");
    videoEle.id = videoId + "video";
    videoEle.classList.add("hide");
    videoEle.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
    videoEle.classList.add("video-size");
    resultItemEle.appendChild(videoEle);

    let thumbEle = document.createElement("img");
    thumbEle.id = videoId + "thumbnail";
    thumbEle.setAttribute("src", snippet.thumbnails.medium.url);
    thumbEle.classList.add("image-size");
    resultItemEle.appendChild(thumbEle);

    let titleEle = document.createElement("h1");
    titleEle.id = videoId + "title";
    titleEle.textContent = snippet.title;
    titleEle.classList.add("result-title");
    resultItemEle.appendChild(titleEle);

    let authorEle = document.createElement("p");
    authorEle.id = videoId + "author";
    authorEle.textContent = snippet.channelTitle;
    authorEle.classList.add("result-author");
    resultItemEle.appendChild(authorEle);

    let publishTimeEle = document.createElement("p");
    publishTimeEle.id = videoId + "publish-time";
    publishTimeEle.textContent = "Uploaded on " + snippet.publishTime.substring(0, 10);
    publishTimeEle.classList.add("result-info");
    resultItemEle.appendChild(publishTimeEle);

    let viewCountEle = document.createElement("p");
    viewCountEle.id = videoId + "view-count";
    viewCountEle.textContent = snippet.viewCount + " views";
    viewCountEle.classList.add("result-info");
    resultItemEle.appendChild(viewCountEle);

    let descriptionEle = document.createElement("p");
    descriptionEle.id = videoId + "description";
    descriptionEle.textContent = snippet.description;
    descriptionEle.classList.add("result-info");
    resultItemEle.appendChild(descriptionEle);

    searchResultsEle.appendChild(resultItemEle);

    resultItemEle.addEventListener("mouseenter", (hoverEvent) => {

        const thumbId = hoverEvent.target.id + "thumbnail";
        const iframeId = hoverEvent.target.id + "video";

        document.getElementById(thumbId).classList.toggle("hide");
        document.getElementById(iframeId).classList.toggle("hide");

        document.getElementById(iframeId).src = "https://www.youtube.com/embed/" + hoverEvent.target.id + "?autoplay=1&mute=1&controls=0";
    });

    resultItemEle.addEventListener("mouseleave", (hoverEvent) => {

        const thumbId = hoverEvent.target.id + "thumbnail";
        const iframeId = hoverEvent.target.id + "video";

        document.getElementById(thumbId).classList.toggle("hide");
        document.getElementById(iframeId).classList.toggle("hide");
    });
}
