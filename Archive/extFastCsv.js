
var Rx = require('rxjs/Rx');

module.exports = {
    test: function (input) {
        return input;
    },
    readCsv: function (filePath) {
        var fs = require('fs');
        var csv = require('fast-csv');
        var output = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', function(data){
                output.push(data);
            })
            .on('end', function(count){
                console.log('Read row count : ' + count);
                return output;
            });
    },
    writeCsv: function (filePath, data) {
        var fs = require('fs');
        var csv = require('fast-csv');
        var ws = fs.createWriteStream(filePath);
    
        csv.write(data, {headers:true})
        .pipe(ws);
    }
  };
