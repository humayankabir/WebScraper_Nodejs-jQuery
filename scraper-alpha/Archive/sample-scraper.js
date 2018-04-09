// reference - https://medium.com/@asimmittal/using-jquery-nodejs-to-scrape-the-web-9bb5d439413b 

console.log("---> Running");

const curl = require("curl");
const jsdom = require("jsdom");
const url = "http://www.imdb.com/list/ls004489992/";

curl.get(url, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
        parseData(body);
    }
    else {
        //some error handling
        console.log("error while fetching url");
    }
});


function parseData(html) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);

    var i =0;
    $(".lister-item").each(function () {
        i++;
        var _this = $(this);
        var movieName = _this.find('.lister-item-header a').html();
        var movieYear = _this.find('.lister-item-header .lister-item-year').html();
        console.log(i + " -> " + movieYear + ":" + movieName);
    });

}