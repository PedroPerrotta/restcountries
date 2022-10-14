import { useContext, useEffect, useState } from "react";
import { getAllCountries } from "../../httpCalls/requests";
import CountryCard from "./countryCard";
import Header from "../headers/header";
import Filter from "../filter/filter";
import FilterContext from "../../context/filterContext";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  let response;
  let content = <div></div>;
  const [allCountries, setAllCountries] = useState();
  const [filteredCountry, setFilterCountry] = useState();
  const filterCtx = useContext(FilterContext);


  const getCountries = async () => {
    response = await getAllCountries();
    setCountries(response);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    console.log(countries);
    if (countries.length > 0) {
      let counter = 0;
      content = (
        <div className="row countries-row">
          {countries.map(
            (country) => (
              counter++,
              (
                <CountryCard
                  key={counter}
                  name={country.name.official}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flag={country.flags.png}
                />
              )
            )
          )}
        </div>
      );
    }

    setAllCountries(content);
  }, [countries]);

  useEffect(() => {
    if (countries.length > 0) {
      if (filterCtx.filter.length > 0) {
        // setFilterCountry(countries.filter (country) => )
      }
    }
  }, [filterCtx.filter])

  return (
    <>
      <Header />
      <Filter from={'all'} />
      <div className="container-fluid mt-5 px-0">{allCountries}</div>;
    </>
  );
};

export default AllCountries;
