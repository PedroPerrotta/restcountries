const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

let holeInfo = [];
let str = "";
let body = "";
const url = "https://restcountries.com/v2/all";

app.get("/", (req, res) => {
  https.get(url, function (response) {
    response.on("data", (chunk) => (body += chunk));
    response.on("end", () => {
      holeInfo = JSON.parse(body);
      res.render("allCountries", {
        countries: holeInfo
      });
      body = "";
    });
  });
});

app.get("/:country", (req, res) => {
  const singleCountryUrl = "https://restcountries.com/v2/name/" + req.params.country;
  https.get(singleCountryUrl, function(response) {
    response.on("data", function(data){
      const countryData = JSON.parse(data);
      res.render("singleCountry", {
        country: countryData[0]
      });
    })
  })
})



app.listen(3000, () => {
  console.log("Server started on port 3000");
});

