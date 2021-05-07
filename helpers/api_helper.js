
const joke_masters = require('../models').joke_masters;
const Sequelize = require('sequelize');

const api_helper = {

    getOneJoke: (req, res, next) => {


        joke_masters.findOne({ order: Sequelize.literal('rand()') }).then((result) => {

            if (result.id > 0) {
                res.json({ status: true, data: result });
            } else {
                res.json({ status: false, data: result, message: 'Error try after sometime' });
            }
        })
    }
}

module.exports = api_helper;