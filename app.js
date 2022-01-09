const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

let holeInfo = [];
let body = "";
let url = "https://restcountries.com/v3.1/all";

app.get("/", (req, res) => {
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
        const countryData = JSON.parse(data);

        var languages = " ";

        if (countryData[0].languages.length === 1) {
          languages = languages + countryData[0].languages[0].name;
        } else {
          var index = 0;
          for (index; index < countryData[0].languages.length - 1; index++) {
            languages = languages + countryData[0].languages[index] + ", ";
          }
          languages = languages + countryData[0].languages[index];
        }

        var currencies = " ";

        if (countryData[0].currencies.length === 1) {
          currencies = currencies + countryData[0].languages[0].name;
        } else {
          var index = 0;
          for (
            let index = 0;
            index < countryData[0].currencies.length - 1;
            index++
          ) {
            currencies = currencies + countryData[0].currencies[index] + ", ";
          }
          currencies = currencies + countryData[0].currencies[index];
        }

        var borders = [];

        if (countryData[0].borders) {
          if (countryData[0].borders.length === 1) {
            borders[0] = countryData[0].borders[0];
          } else {
            var index = 0;
            for (
              let index = 0;
              index < countryData[0].borders.length - 1;
              index++
            ) {
              borders[index] = countryData[0].borders[index];
            }
            borders[index] = countryData[0].borders[index];
          }
        } else {
          borders = ["None"];
        }

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
  console.log(req.body);
  // url = "https://restcountries.com/v3.1/region/" + req.body.cityName;
  // https.get(url, function (response) {
  //   response.on("data", (chunk) => (body += chunk));
  //   response.on("end", () => {
  //     holeInfo = JSON.parse(body);
  //     res.render("countriesList", {
  //       countries: holeInfo,
  //     });
  //     body = "";
  //   });
  // });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
