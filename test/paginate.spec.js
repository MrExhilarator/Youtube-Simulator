describe("paginate should", () => {
 
    beforeEach(() => {
       var parser = new DOMParser();
       let str = __html__['testyt.html'];
       var doc = parser.parseFromString(str, 'text/html');
       document.body.innerHTML = doc.body.innerHTML;
    });
 
    afterEach(() => {
       document.body.textContent = '';
    });
 
    it("add pagination to the document based on the maximum results for a search query", async () => {
        spyOn(window, "displayResults");
        
       await paginate(15);
 
       expect(document.getElementById('buttonContainer').children.length).toBe(4);
    });

    it("should change the styling of the selected button on mouse click", async () => {
        spyOn(window, "displayResults");

        await paginate(15);
        
        expect(document.getElementById('btn0').classList.contains('select')).toBe(true);
        document.getElementById('btn1').dispatchEvent(new Event('click'));
        expect(document.getElementById('btn1').classList.contains('select')).toBe(true);
        expect(document.getElementById('btn0').classList.contains('select')).toBe(false);
    });
 });