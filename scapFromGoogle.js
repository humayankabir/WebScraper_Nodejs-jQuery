// reference - https://medium.com/@asimmittal/using-jquery-nodejs-to-scrape-the-web-9bb5d439413b 

console.log("---> Running");
const curl = require("curl");
const jsdom = require("jsdom");
const outputFolder = "Output\\";
const noDataSign = "_";
const targetList_0 = [
    "Tsukiji Fish Market",
    "Roppongi Hills",
    "Tokyo Royal Palace",
    "Tokyo Tower",
    "Shibuya",
    //"Harajuku Park",
    "Tokyo Disneyland",
    "Yokohama Minatomirai",
    "Sakuragicho"
];
const targetList = [
    "Odaiba",
    "Sensō-ji",
    "Tokyo Skytree",
    "Tokyo Disneyland",
    "Harajuku",
    "Meiji Shrine",
    "Ueno Park",
    "Tokyo Imperial Palace",
    "Tokyo DisneySea",
    //"Roppongi",
    "Tokyo Tower",
    "Tsukiji fish market",
    "Yoyogi Park",
    "Mount Takao",
    "Roppongi Hills"
];
const targetObj = {
    i_name: noDataSign,
    url: noDataSign,
    name: noDataSign,

    map_url: noDataSign,
    map_img: noDataSign,

    rate: noDataSign,
    reviews: noDataSign,

    details: noDataSign,

    directions: noDataSign,
    website: noDataSign,

    wiki_description: noDataSign,
    wiki_link: noDataSign,
    description: noDataSign,

    address: noDataSign,
    open_today: noDataSign,
    opened: noDataSign,
    phone: noDataSign,

    owner: noDataSign,
    floor_count: noDataSign,
    date_completed: noDataSign,
    construction_started: noDataSign,
    completed: noDataSign,
    floor_area: noDataSign,
    architect: noDataSign,
    floor_area: noDataSign,

    Lines: noDataSign,
    previous_names: noDataSign,
    area: noDataSign,
    city_office: noDataSign,
    population: noDataSign,
    prefecture: noDataSign,
    colleges_and_universities: noDataSign,
    theme: noDataSign,

    height: noDataSign,
    cost: noDataSign,
    top_floor: noDataSign,

    did_you_know: noDataSign,

    end: noDataSign
};
outObjList = [];

scrapTargets(targetList);

function scrapTargets(targetList) {
    for (i = 0; i < targetList.length; i++) {
        outObjList[i] = cloneObj(targetObj);
        outObjList[i].i_name = targetList[i];
        outObjList[i].url = "https://www.google.com/search?hl=en&q=" + replaceAll(targetList[i], ' ', '+');
        scrapperCore(outObjList[i].url, i);
    }
}

function scrapperCore(url, index) {
    curl.get(url, null, (err, resp, body) => {
        if (resp.statusCode == 200)
            ParseDataGoogle(body, index);
        else
            console.log("error while fetching url");
    });
}

function ParseDataGoogle(html, index) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);

    $('.VBt9Dc > div').each(function () {
        var _this = $(this);
        if (_this.find('div').hasClass('FSP1Dd')) {
            outObjList[index].name = validateData(_this.find('.FSP1Dd').html());
        }
        else if (_this.hasClass('R8KuR')) {
            outObjList[index].map_url = validateData(_this.find('a').attr('href'));
            outObjList[index].map_img = validateData('https://www.google.com/' + _this.find('a > img').attr('src'));
        }
        else if (_this.find('span').hasClass('ul7Gbc')) {
            outObjList[index].rate = validateData(_this.find('.ul7Gbc').html());
            outObjList[index].reviews = validateData(_this.parent().find('span:eq(1)').html());
        }
        else if (_this.find('div').hasClass('oTDgte')) {
            outObjList[index].details = validateData(_this.find('span').html());
        }
        else if (_this.find('div').hasClass('NB2VS')) {
            outObjList[index].directions = validateData(_this.find('.NB2VS > a:eq(0)').attr('href'));
            //outObjList[index].website = _this.find('.NB2VS > a:eq(1)').attr('href').split('/url?q=')[1].split('&sa=')[0];
            outObjList[index].website = _this.find('.NB2VS > a:eq(1)').attr('href');
        }
        else if (_this.find('div').hasClass('mraOPb')) {
            outObjList[index].wiki_description = validateData(_this.find('span').text());
            //outObjList[index].wiki_link = _this.find('a:eq(0)').attr('href').split('/url?q=')[1].split('&sa=')[0];
            outObjList[index].wiki_link = _this.find('a:eq(0)').attr('href');
        }
        else if (_this.find('div').hasClass('DjxOn')) {
            outObjList[index].description = validateData(_this.find('.DjxOn').text());
        }
        else if (_this.find('.cC4Myd').html() == 'Address:&nbsp;') {
            outObjList[index].address = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.mv26yd').html() == 'Open today') {
            outObjList[index].open_today = validateData(_this.find('.A1t5ne:eq(1)').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Phone: ') {
            outObjList[index].phone = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Owner: ') {
            outObjList[index].owner = validateData(_this.find('a').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Floor count: ') {
            outObjList[index].floor_count = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Date completed: ') {
            outObjList[index].date_completed = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Construction started: ') {
            outObjList[index].construction_started = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Completed: ') {
            outObjList[index].completed = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Floor area: ') {
            outObjList[index].floor_area = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Architect: ') {
            outObjList[index].architect = validateData(_this.find('a.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Floor: ') {
            outObjList[index].floor_area = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Opened: ') {
            outObjList[index].opened = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Line(s): ') {
            outObjList[index].Lines = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Previous names: ') {
            outObjList[index].previous_names = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Area: ') {
            outObjList[index].area = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'City office: ') {
            outObjList[index].city_office = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Population: ') {
            outObjList[index].population = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Prefecture: ') {
            outObjList[index].prefecture = validateData(_this.find('a.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Colleges and Universities: ') {
            outObjList[index].colleges_and_universities = validateData(_this.find('a.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Theme: ') {
            outObjList[index].theme = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Did you know: ') {
            outObjList[index].did_you_know = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Height: ') {
            outObjList[index].height = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Cost: ') {
            outObjList[index].cost = validateData(_this.find('.A1t5ne').html());
        }
        else if (_this.find('.cC4Myd').html() == 'Top floor: ') {
            outObjList[index].top_floor = validateData(_this.find('.A1t5ne').html());
        }
    });
    //console.log("[" + index + "] " + outObjList[index].description);

    console.log("[" + index + "] " + outObjList[index].i_name);
    //writeFile(outputFolder + outObjList[index].i_name + ".html", html);
    writeCsv(outputFolder + "Output.csv", outObjList);
}

function validateData(data) {
    return (data == "" || data == null) ? noDataSign : data;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// Create + Write 
function writeFile(fileName, data) {
    var fs = require('fs');

    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
}

function appendFile(fileName, data) {
    var fs = require('fs');

    fs.appendFile(fileName, data, function (err) {
        if (err) throw err;
        //console.log('Updated!');
    });
}

function writeCsv(fileName, data) {
    var fs = require('fs');
    var csv = require('fast-csv');
    var ws = fs.createWriteStream(fileName);

    csv.write(data, { headers: true })
        .pipe(ws);
}

function cloneObj(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}