import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountry } from "../../httpCalls/requests";
import Filter from "../filter/filter";
import Header from "../headers/header";

const SingleCountry = () => {
  const country = useParams().country;
  let response;
  const [content, setContent] = useState(<div></div>);

  const getCountryInfo = async () => {
      response = await getCountry(country);
      console.log(response);
    setContent(
      <div className="single-country-info-container">
        <div className="single-flag-container">
          <img src={response[0].flags.png}></img>
        </div>
        <div className="single-country-info">
            <h1 className="country-title">{response[0].name.official}</h1>
            <div className="row">
                <div className="col-6">
                    <p className="country-data">Native Name: {response[0].name.nativeName[Object.keys(response[0].name.nativeName)[0]].official}</p>
                    <p className="country-data">Population: {response[0].populations}</p>
                    <p className="country-data">Region: {response[0].region}</p>
                    <p className="country-data">Sub Region: {response[0].subregion} </p>
                    <p className="country-data">Capital: {response[0].capital} </p>
                </div>
                <div className="col-6">
                    <p className="country-data">Top Level Domain: {response[0].tld}</p>
                    <p className="country-data">Currencies: {response[0].currencies[Object.keys(response[0].currencies)[0]].name}</p>
                    <p className="country-data">Languages: {response[0].languages[Object.keys(response[0].languages)[0]]} </p>
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
