
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Issue = new Schema({
        zipcode: {
            type: Array
        },
        searchTerm: {
            type: Array
        },
        name: {
                type: String
        },
        phone: {
                type: String
        },
        siteurl: {
                type: String
        },
        isCustomer: {
                type: Boolean
        }
  });

module.exports = mongoose.model('searchResult', Issue);