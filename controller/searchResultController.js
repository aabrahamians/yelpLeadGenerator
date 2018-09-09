const SearchResults = require("../model/searchResult.js");
const yelp = require("yelp-fusion");

const retrieveall = function(req, res) {
  var searchArea;
  SearchResults.distinct("zipcode", (error, ids) => {
    // ids is an array of all ObjectIds
    res.send(ids);
  });
};
const search = function(request, mainRes) {
  const apiKey =
    "qKS0a6kW8RQLJd3uXznUGl7kvF0Lv1C73IRc_4sW-rDFcTtz69XrSnL9krbBWmyCj4AD16PkDMcXYN9O8k44kUzIbnkY8enIr-w9_ztfY_BBOu-6vibk3nE6AWlXW3Yx";

  const searchRequest = {
    term: request.query.term,
    location: request.query.location
  };

  const client = yelp.client(apiKey);

  client
    .search(searchRequest)
    .then(response => {
      let that = this;
      let resultObject = [];
      response.jsonBody.businesses.forEach(element => {
        resultObject.push({
          name: element.name,
          phone: element.phone,
          siteurl: element.url,
          searchTerm: searchRequest.term,
          zipcode: searchRequest.location,
          isCustomer: null
        });
      });

      (async function() {
        const insertMany = await SearchResults.insertMany(resultObject);
      })();

      const prettyJson = JSON.stringify(resultObject, null, 4);
      mainRes.send(resultObject);
    })
    .catch(e => {
      console.log((e = "shit"));
    });
};
module.exports = { retrieveall, search };
