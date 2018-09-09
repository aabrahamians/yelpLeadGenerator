module.exports = app => {
  const searchResults = require("./controller/searchResultController.js");

    app.get("/allTerms", searchResults.retrieveall);
   
    app.get("/search", searchResults.search);


};




