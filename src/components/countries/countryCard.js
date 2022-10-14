import { Link } from "react-router-dom";

const CountryCard = (props) => {
  return (
    <div className="single-country-list-container col-3 px-5 py-3">
      <div className="shadow country-list-card" to={`/${props.name}`}>
        <Link className="country-link" to={`/country/${props.name}`}>
          <img
            className="all-countries-flag mb-4"
            src={props.flag}
            alt="Country Flag"
          ></img>
          <p className="all-countries-name mb-3 px-3">{props.name}</p>
          <p className="all-countries-data mb-1 px-3">
            Population: {props.population}
          </p>
          <p className="all-countries-data mb-1 px-3">
            Region: {props.region}{" "}
          </p>
          <p className="all-countries-data mb-1 px-3">
            Capital: {props.capital}{" "}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
