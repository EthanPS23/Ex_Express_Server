const puppeteer = require('puppeteer');

const searchSoundCloud = async (searchQuery) => {
    const browser = await puppeteer.launch({
        // headless:false,
        // defaultViewport:null
    });

    const page = await browser.newPage();
    // searches for tracks on soundcloud based upon the searchQuery
    await page.goto('https://soundcloud.com/search/sounds?q=' + searchQuery);

    // Finds that the content has initially loaded
    await page.waitForSelector('div[id=content]');

    // Looks to see the initial list of songs has loaded
    await page.waitForSelector('ul[class="lazyLoadingList__list sc-list-nostyle sc-clearfix"]');

    //Find all div elements with class 'sound_body' in initial load
    //This is grabing only the initial 9 results as more results are shown as page is scrolled down
    const searchResults =   await page.$$eval('div[class=sound__body]', results => {
        //Array to hold all our results
        let data = [];

        //Iterate over all the results
        results.forEach(parent => {

            //Target the title "span[class=soundTitle__usernameText]" and then checks to make sure it is not null
            const userName = parent.querySelector('span[class=soundTitle__usernameText]');
            if (userName === null) {
                return;
            }
            const userNameText = userName.innerText

            //Target the url "a[class="soundTitle__title sc-link-dark"] > span" and then checks to make sure it is not null
            const title = parent.querySelector('a[class="soundTitle__title sc-link-dark"] > span');
            if (title === null) {
                return;
            }
            const titleText = title.innerText;

            //Target the url "span[class="sc-truncate sc-tagContent"]" and then checks to make sure it is not null
            const tag = parent.querySelector('span[class="sc-truncate sc-tagContent"]');
            if (tag === null) {
                return;
            }
            const tagText = tag.innerText;

            //Add to the return Array
            data.push({userNameText, titleText, /*desciption,*/ tagText});
        });

        //Return the search results
        return data;
    });

    await browser.close();

    return searchResults;
};

// Export the funstion so we can access it in our server
module.exports = searchSoundCloud;

//export default searchSoundCloud;
// searchSoundCloud('cats');