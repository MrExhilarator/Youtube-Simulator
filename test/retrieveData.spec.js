describe("Client must return expected JSON object when made call to Youtube Data API to", () => {
    var searchResults = [
        {
            "kind": "youtube#searchResult",
            "etag": "fa5yjUREguQkcfLYqOybHQa-ZvE",
            "id": {
                "kind": "youtube#video",
                "videoId": "NOmDsYrJ0Ew"
            },
            "snippet": {
                "publishedAt": "2021-04-04T15:58:38Z",
                "channelId": "UCaTsG_3WPBTF2OoKf4SZ4pQ",
                "title": "Tozkoparan İskender 18. Bölüm Fragmanı",
                "description": "#Tozkoparanİskender #Tozkoparan #TRT1 ===================================== #İskender - #ÇağanEfeAk | #Duygu - #ÜlküHilalÇiftçi | #Ece ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Tozkoparan İskender",
                "liveBroadcastContent": "none",
                "publishTime": "2021-04-04T15:58:38Z"
            }
        }
    ];

    it("get videos related to a search term", async () => {
        var dataMockObject = {
            items: [
                {
                    snippet: {}
                }
            ]
        }
        var query = "Javascript";
        spyOn(window, "getData").and.returnValue(dataMockObject);
        var data = await getSearchItems(query);
        expect(data).toEqual(dataMockObject);
    });

    it("get statistics of a video when given videoId", async () => {
        var dataMockObject = {
            items: [
                {
                    statistics: {
                        viewCount: 1000
                    }
                }
            ]
        };
        var query = "Javascript";
        spyOn(window, "getData").and.returnValue(dataMockObject);
        var data = await getStats(query);
        expect(data).toEqual(dataMockObject);
    });

    it("append the got data to the document", async () => {
        var dataMockObject = {
            "items": [
                {
                "statistics": {
                    "viewCount": "1940300",
                  }
                }
            ]
        };

        spyOn(window, "paginate");
        spyOn(window, "displayResults");
        spyOn(window, "getStats").and.returnValue(dataMockObject);

        await appendStatsToResultItems(searchResults);

        expect(paginate).toHaveBeenCalled();
        expect(displayResults).toHaveBeenCalled();
        expect(searchResults[0].snippet.viewCount).toBe("1940300");
    });
});
