const fs = require('fs');
const GithubContent = require('github-content');
const async = require('async');
const options = {
    owner: '15Dkatz',
    repo: 'official_joke_api',
    branch: 'master' // defaults to master
};
const gc = new GithubContent(options);


const joke_type_masters = require('../models').joke_type_masters;
const joke_masters = require('../models').joke_masters;

const cron_helper = {

    download_data: () => {
        cron_helper.jsonReader(`public/data/data.json`, (err, data) => {
            if (err) {
                gc.file('jokes/index.json', function (err, file) {
                    if (err) return console.log(err);
                    fs.writeFile('public/data/data.json', file.contents, function (err) {
                        if (err) return console.log(err);
                        console.log('data.json created');
                        cron_helper.process_data();
                    });
                });
            } else {
                console.log('File Already There');
                cron_helper.process_data();
            }
        })
    },

    process_data: () => {

        var bulk_data = [];
        joke_masters.truncate().then(() => {
            joke_type_masters.truncate().then(() => {
                cron_helper.jsonReader(`public/data/data.json`, (err, data) => {
                    if (err) {
                        console.log('File Not Found');
                    } else {
                        async.eachSeries(data, function (item, callback) {
                            joke_type_masters.findOrCreate({ where: { type_name: item.type } }).then((joke_type_info) => {
                                if (joke_type_info.length) {
                                    let insert_data = {
                                        type_id: joke_type_info[0].id,
                                        setup: item.setup,
                                        punchline: item.punchline
                                    };
                                    bulk_data.push(insert_data);
                                } else {

                                }
                                callback();
                            })
                        }, () => {
                            if (bulk_data.length) {
                                joke_masters.bulkCreate(bulk_data).then(() => {
                                    console.log('End');
                                })
                            } else {
                                console.log('End');
                            }
                        })
                    }
                })
            })

        })




    },

    jsonReader: (filePath, cb) => {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData)
                return cb && cb(null, object)
            } catch (err) {
                return cb && cb(err)
            }
        })
    }

};



module.exports = cron_helper;