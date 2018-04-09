console.log("---> Running");

const curl = require("curl");
const jsdom = require("jsdom");
//const url = "http://www.imdb.com/list/ls004489992/";

var urlList = [
    "https://www.google.com/search?q=Tokyo+Imperial+Palace"
    ,"https://www.google.com/search?q=Tsukiji+fish+market"];

function getData ()
{
    for(var i=0; i<urlList.length; i++)
    {
        curl.get(urlList[i], null, (err, resp, body) => {
            if (resp.statusCode == 200) {
                parseData(body);
            }
            else {
                console.log("error while fetching url");
            }
        });
    }
    
}

var data = [];
data.push(["target", "website", "direction", "rate"]);

function parseData(html) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);

    console.log(html.getElementById('rhs_block').getElementsByTagName('span')[1].innerHTML);

    // var row = [
    //     $('#rhs_block').find('.fYOrjf span:eq(0)').html() // target
    //     ,$('.fYOrjf .hZCf6e:eq(0) a').attr('href') // website
    //     ,$('.fYOrjf .hZCf6e:eq(1) a').attr('href') // direction
    //     ,$('.fYOrjf .rtng').html() // rate
    //     //data.push(); // 
    //     //data.push(); // 
    //     //data.push(); // 
    // ];

    //data.push(row);
    //console.log(row);

}

getData();