import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountry } from "../../httpCalls/requests";
import Filter from "../filter/filter";
import Header from "../headers/header";
import { Link } from "react-router-dom";

const SingleCountry = () => {
  const country = useParams().country;
  let response;
  const [content, setContent] = useState(<div></div>);

  const getCountryInfo = async () => {
    response = await getCountry(country);

    console.log(response[0]);

    let lang = response[0].languages;

    let languages = [];

    for (let [key, value] of Object.entries(lang)) {
      languages += `${value} `;
    }
    
    let curr = response[0].currencies;

    let currencies = [];

    for (let [value] of Object.entries(curr)) {
      currencies += `${value.name}`;
    }

    let brds = response[0].borders;
    let borders = [<div className="borders mx-2 px-3 py-1">None Borders</div>];

    if (brds) {
      for (let [index, value] of Object.entries(brds)) {
        borders[index] = <div className="borders mx-2 px-3 py-1">{value}</div>
      } 
    }

    setContent(
      <div className="single-country-info-container container-fluid p-0">
        <div className="row mx-4 mx-sm-5">
          <div className="single-flag-container mb-5 mb-md-0 col-12 col-md-6 p-0">
            <img className="single-flag" src={response[0].flags.svg}></img>
          </div>
          <div className="single-country-info col-12 col-md-6">
            <h1 className="country-title mb-5">{response[0].name.official}</h1>
            <div className="row">
              <div className="col-12 col-md-6 mb-5 mb-md-0">
                <p className="country-data">
                  <strong>Native Name: </strong>
                  {
                    response[0].name.nativeName[
                      Object.keys(response[0].name.nativeName)[0]
                    ].official
                  }
                </p>
                <p className="country-data">
                  <strong>Population:</strong> {response[0].population}
                </p>
                <p className="country-data">Region: {response[0].region}</p>
                <p className="country-data">
                  <strong>Sub Region:</strong> {response[0].subregion}{" "}
                </p>
                <p className="country-data"><strong>Capital:</strong> {response[0].capital} </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="country-data">
                  <strong>Top Level Domain:</strong> {response[0].tld}
                </p>
                <p className="country-data"><strong>Currencies:</strong> {currencies}</p>
                <p className="country-data"><strong>Languages:</strong> {languages}</p>
              </div>
              <div className="col-12 mt-5"><strong>Border Countries:</strong> {borders}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getCountryInfo();
  }, []);

  return (
    <div className="single-country-page">
      <Header />
      <Filter from="single" />
      {content}
    </div>
  );
};

export default SingleCountry;
