describe("displayResults should", () => {
   const videosData =
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
         "publishTime": "2021-04-04T15:58:38Z",
         "viewCount": "100000"
      }
   };

   beforeEach(() => {
      var parser = new DOMParser();
      let str = __html__['testyt.html'];
      var doc = parser.parseFromString(str, 'text/html');
      document.body.innerHTML = doc.body.innerHTML;
   });

   afterEach(() => {
      document.body.textContent = '';
   });

   it("append videos data correctly to the document", async () => {
      await displayResults([videosData],0);

      expect(document.getElementById('NOmDsYrJ0Ew').children.length).toBe(7);
      expect(document.getElementById('NOmDsYrJ0Ewthumbnail').src).toBe(videosData.snippet.thumbnails.medium.url);
      expect(document.getElementById('NOmDsYrJ0Ewvideo').src).toBe(
         'https://www.youtube.com/embed/' + videosData.id.videoId);
      expect(document.getElementById('NOmDsYrJ0Ewtitle').textContent).toBe(videosData.snippet.title);
      expect(document.getElementById('NOmDsYrJ0Ewauthor').textContent).toBe(videosData.snippet.channelTitle);
      expect(document.getElementById('NOmDsYrJ0Ewpublish-time').textContent).toBe('Uploaded on ' + videosData.snippet.publishTime.slice(0, 10));
      expect(document.getElementById('NOmDsYrJ0Ewview-count').textContent).toBe(videosData.snippet.viewCount + ' views');
      expect(document.getElementById('NOmDsYrJ0Ewdescription').textContent).toBe(videosData.snippet.description);
   });

   it("replace thumbnail with video preview on mouse hover and replace video preview with thumbnail on mouse leave", async () => {
      await displayResults([videosData],0);

      document.getElementById('NOmDsYrJ0Ew').dispatchEvent(new Event('mouseenter'));
      expect(document.getElementById('NOmDsYrJ0Ewthumbnail').classList["1"]).toBe('hide');
      expect(document.getElementById('NOmDsYrJ0Ewvideo').classList.contains('hide')).toBe(false);

      document.getElementById('NOmDsYrJ0Ew').dispatchEvent(new Event('mouseleave'));
      expect(document.getElementById('NOmDsYrJ0Ewthumbnail').classList.contains('hide')).toBe(false);
      expect(document.getElementById('NOmDsYrJ0Ewvideo').classList["1"]).toBe('hide');
   });
});