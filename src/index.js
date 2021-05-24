var searchInputElement = document.getElementById("searchInput");

window.globalSearchResults = [];

window.API_KEY = "AIzaSyAuBJaT3jQlKCsXii2QBQmZ58fMsRyhEb4";
window.maxResults = 15;

var searchVideoInDb = async (event) => {
    if (event.key === "Enter") {
        document.getElementById("buttonContainer").textContent = "";
        document.getElementById("searchResults").textContent = "";
        const searchInput = searchInputElement.value;
        const { items } = await getSearchItems(searchInput);
        appendStatsToResultItems(items);
    }
}

if (searchInputElement) {
    searchInputElement.addEventListener("keydown", searchVideoInDb);
}

window.onload = () => {
    var keyboardEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
    });
    searchVideoInDb(keyboardEvent);
};
