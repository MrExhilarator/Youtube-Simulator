//paginate divides the search results into different pages 
//by giving the pages, buttons and onclick event is added to those buttons
var paginate = (maxResults) => {
    let totalNumberOfPages = Math.ceil(maxResults / 4);

    for (let i = 0; i < totalNumberOfPages; i++) {
        let btnEle = document.createElement("button");
        btnEle.textContent = i + 1;
        btnEle.id = "btn" + i;
        btnEle.classList.add("custom-btn");
        if (i === 0) {
            btnEle.classList.add("select");
        }
        btnEle.addEventListener("click", () => {
            document.getElementById("searchResults").textContent = "";
            for (let j = 0; j < totalNumberOfPages; j++) {
                document.getElementById("btn" + j).classList.remove("select");
            }
            document.getElementById("btn" + i).classList.add("select");
            displayResults(globalSearchResults, i);
        });
        document.getElementById("buttonContainer").appendChild(btnEle);
    }

}
