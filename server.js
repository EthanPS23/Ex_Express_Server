const express = require('express');
//const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

// Import puppeteer function
const searchSoundCloud = require('./searchSoundCloud');

// Catches requests made to localhost:3000/search
app.get('/search', (request,response) =>{
    // Holds value of the query param 'searchquery'
    const searchQuery = request.query.searchquery;

    // do something when the searchquery is not null.
    if (searchQuery != null) {
        searchSoundCloud(searchQuery)
        .then(results =>{
            // Returns a 200 Status OK with Results JSON back to the client.
            response.status(200);
            response.json(results);
        });
    }else{
        response.end();
    }
})

//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));


//Initialises the express server on the port 30000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

