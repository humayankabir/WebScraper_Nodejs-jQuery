// https://www.npmjs.com/package/fast-csv

function writeCsv()
{
    var fs = require('fs');
    var csv = require('fast-csv');
    var ws = fs.createWriteStream('output.csv');

    csv.write([
        ["A", "B"],
        ["a1", "b1"],
        ["a2", "b2"],
        ["a3", "b3"]
    ], {headers:true})
    .pipe(ws);
}

function readCsv()
{
    var fs = require('fs');
    var csv = require('fast-csv');

    fs.createReadStream('output.csv')
        .pipe(csv())
        .on('data', function(data){
            console.log(data);
        })
        .on('end', function(data){
            console.log('Read finished');
        });
}

//writeCsv();
readCsv();