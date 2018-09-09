import { Grid } from "ag-grid";

$("form").on("submit", e => {
  e.preventDefault();

  let searchTerm = $("#term").val();
  let searchZip = $("#zip").val();
  console.log($("#searchTerm").val());
  if (searchTerm.length > 0) {
    doSearch(searchTerm, searchZip);
  }
});

var doSearch = (term, zip) => {
  $.ajax({
    url: "search?term=" + term + "&location=" + zip,
    // url: "http://localhost:8833/search?term=" + term + "&location=" + zip,
    success: function(data) {
      // htmlObject = "";
      // data.forEach((each) => {

      //     htmlObject += "<li> <strong> " + each.name + "  </strong> <strong> phone </strong>" + each.phone + "</br> <a href=" + each.urlSite + "> yelp link</a></li>";

      // })
      // $("#results").html(htmlObject);
      showTable(data);
    }
  });
};

function retrievePastSearch(term, zip) {
  $.ajax({
    // url: "http://localhost:8833/allTerms",
    url: "allTerms",
    success: function(terms) {
      // htmlObject = "";
      // data.forEach((each) => {

      //     htmlObject += "<li> <strong> " + each.name + "  </strong> <strong> phone </strong>" + each.phone + "</br> <a href=" + each.urlSite + "> yelp link</a></li>";

      terms.forEach(function(each) {
        $(".search-terms").append("   " + each);
      });
      // })
      // $("#results").html(htmlObject);
      // showTable(data);
      console.log(data);
    }
  });
}
window.onload = retrievePastSearch;
var showTable = rowData => {
  // specify the columns
  var columnDefs = [
    { headerName: "name", field: "name", sortingOrder: ["asc", "desc"] },
    { headerName: "phone", field: "phone" },
    { headerName: "url", field: "url", cellRenderer: "urlCellRenderer" }
  ];

  // cell renderer class
  function urlCellRenderer() {}

  // init method gets the details of the cell to be rendere
  urlCellRenderer.prototype.init = function(object) {
    this.eGui = document.createElement("a");
    this.eGui.setAttribute("href", object.data.urlSite);
    this.eGui.setAttribute("target", "_blank");
    this.eGui.appendChild(document.createTextNode("link"));
  };

  urlCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };

  // let the grid know which columns and what data to use
  var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    enableSorting: true,
    animateRows: true,
    sortingOrder: ["desc", "asc", null],
    components: {
      urlCellRenderer: urlCellRenderer
    }
  };

  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector("#myGrid");
  eGridDiv.innerHTML = "";
  // create the grid passing in the div to use together with the columns & data we want to use
  new Grid(eGridDiv, gridOptions);
};
