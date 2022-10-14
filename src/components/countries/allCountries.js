import { useContext, useEffect, useState } from "react";
import { getAllCountries, getContinentCountriesList } from "../../httpCalls/requests";
import CountryCard from "./countryCard";
import Header from "../headers/header";
import Filter from "../filter/filter";
import FilterContext from "../../context/filterContext";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../spinner/spinner";

const AllCountries = (props) => {
  const [countries, setCountries] = useState([]);
  let response;
  let content = <div></div>;
  const [allCountries, setAllCountries] = useState();
  const filterCtx = useContext(FilterContext);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const getCountries = async () => {
    setIsLoading(true)
    response = await getAllCountries();
    setCountries(response);
    setIsLoading(false);
  };

  const getContinentCountries = async () => {
    setIsLoading(true);
    response = await getContinentCountriesList(params.continent);
    setCountries(response);
    setIsLoading(false);
  }

  useEffect(() => {
    if (props.from === "all"){
      getCountries();
    } else if (props.from === "continent") {
      getContinentCountries();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (countries.length > 0) {
      let counter = 0;
      content = (
        <div id="countries" className="row countries-row">
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
                  value={country.name.official}
                />
              )
            )
          )}
        </div>
      );
    }

    setAllCountries(content);
  }, [countries]);

  const [filteredCountriesList, setFilteredCountriesList] = useState("");
  let filteredContent;
  let [filteredList, setFilteredList] = useState();

  useEffect(() => {
    if (countries.length > 0) {
      if (filterCtx.filter.length > 0) {
        filteredContent = (
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .startsWith(filterCtx.filter.toLocaleLowerCase())
          )
        );
        setFilteredCountriesList(filteredContent);
      } else {
        setFilteredCountriesList();
      }
    }
  }, [filterCtx.filter]);

  useEffect(() => {
    let counter = 0;

    if (filteredCountriesList) {
      if (filteredCountriesList.length > 0) {
        setFilteredList(
          <div id="countries" className="row countries-row">
            {filteredCountriesList.map(
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
                    value={country.name.official}
                  />
                )
              )
            )}
          </div>
        );
      } else {
        setFilteredList(<p className="not-found">No countries found</p>)
      }
    } else {
      setFilteredList();
    }

  }, [filteredCountriesList]);

  return (
    <>
      <Header />
      <Filter from={"all"} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && <div className="container-fluid mt-5 px-0">
        {filteredList
          ? filteredList
          : allCountries}
      </div>}
    </>
  );
};

export default AllCountries;
