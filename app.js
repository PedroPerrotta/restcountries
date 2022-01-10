const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

let holeInfo = [];
let body = "";
let url = "";
let countryData = [];

app.get("/", (req, res) => {
  url = "https://restcountries.com/v3.1/all";
  https.get(url, function (response) {
    response.on("data", (chunk) => (body += chunk));
    response.on("end", () => {
      holeInfo = JSON.parse(body);
      res.render("countriesList", {
        countries: holeInfo,
      });
      body = "";
    });
  });
});

app.get("/:search", (req, res) => {
  let search = req.params.search.toLowerCase();
  if (
    search == "europe" ||
    search == "africa" ||
    search == "america" ||
    search == "asia" ||
    search == "oceania"
  ) {
    url = "https://restcountries.com/v3.1/region/" + req.params.search;
    https.get(url, function (response) {
      response.on("data", (chunk) => (body += chunk));
      response.on("end", () => {
        holeInfo = JSON.parse(body);
        res.render("countriesList", {
          countries: holeInfo,
        });
        
        body = "";
      });
    });
  } else {
    const singleCountryUrl =
      "https://restcountries.com/v3.1/name/" + req.params.search;
    https.get(singleCountryUrl, function (response) {
      response.on("data", function (data) {
        countryData = JSON.parse(data);
      });
      response.on("end", () => {
        var languages = " ";
        // console.log(countryData);
        // if (countryData[0].languages.length === 1) {
        //   languages = languages + countryData[0].languages[0].name;
        // } else {
        //   var index = 0;
        //   for (index; index < countryData[0].languages.length - 1; index++) {
        //     languages = languages + countryData[0].languages[index] + ", ";
        //   }
        //   languages = languages + countryData[0].languages[index];
        // }

        // if (countryData[0].currencies.length === 1) {
        //   currencies = currencies + countryData[0].currencies[0];
        // } else {
        //   var index = 0;
        //   for (
        //     let index = 0;
        //     index < countryData[0].currencies.length - 1;
        //     index++
        //   ) {
        //     currencies = currencies + countryData[0].currencies[index] + ", ";
        //   }
        //   currencies = currencies + countryData[0].currencies[index];
        // }

        var currencies = countryData[0].currencies;
        var currencie = "";
        for (let y; y < currencies.length; y++) {
          if ((y + 1) === currencies.length) {
            currencie = currencie + currencies[y].name;
          } else {
            currencie = currencie + currencies[y].name + ", ";
          }
        }
        
        console.log(currencie);

        var borders = [];

        // if (countryData[0].borders) {
        //   if (countryData[0].borders.length === 1) {
        //     borders[0] = countryData[0].borders[0];
        //   } else {
        //     var index = 0;
        //     for (
        //       let index = 0;
        //       index < countryData[0].borders.length - 1;
        //       index++
        //     ) {
        //       borders[index] = countryData[0].borders[index];
        //     }
        //     borders[index] = countryData[0].borders[index];
        //   }
        // } else {
        //   borders = ["None"];
        // }

        res.render("singleCountry", {
          country: countryData[0],
          currencies: currencies,
          languages: languages,
          borders: borders,
        });
      });
    });
  }
});

app.post("/name", (req, res) => {
  url = "https://restcountries.com/v3.1/name/" + req.body.countryName;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const countryData = JSON.parse(data);
      res.render("countriesList", {
        countries: countryData
      });
      url = "";
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
