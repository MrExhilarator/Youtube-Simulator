describe("When client enters the query and presses enter", () => {

    beforeEach(() => {
        var parser = new DOMParser();
        let str = __html__['ytSimulator.html'];
        var doc = parser.parseFromString(str, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
    });

    afterEach(() => {
        document.body.textContent = '';
    });

    it("get videos related to a search term", async () => {
        var videosData = {
            "items": [
                {
                    "kind": "youtube#searchResult",
                    "etag": "jvEUI_pdKHgdarpsJtXfzksYsiA",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "miul8Nmc9dY"
                    },
                    "snippet": {
                        "publishedAt": "2019-12-11T20:17:24Z",
                        "channelId": "UCZny4nHHsdHTXe4HyqDEEpw",
                        "title": "RUDRANSH Jain RR  |simbha | rhythm revolution crew | Mera Wala dance",
                        "description": "Rhythm revolution dance crew Choreography by = UK Manish RR Song = Mera Wala dance Movie= simbha Insta _meghna_jain Insta_ rhythm_revolution_crew.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/miul8Nmc9dY/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/miul8Nmc9dY/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/miul8Nmc9dY/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            }
                        },
                        "channelTitle": "Rudransh r. r",
                        "liveBroadcastContent": "none",
                        "publishTime": "2019-12-11T20:17:24Z"
                    }
                }
            ]
        };
        spyOn(window, "searchVideoInDb").and.callThrough();
        spyOn(window, "appendStatsToResultItems");
        spyOn(window, "getSearchItems").and.returnValue(videosData);

        var textArea = document.getElementById('searchInput');

            var keyboardEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
            });

        textArea.addEventListener('keydown', function (e) {
            searchVideoInDb(keyboardEvent);
        });

        textArea.dispatchEvent(keyboardEvent);
        expect(searchVideoInDb).toHaveBeenCalled();
    });
});
