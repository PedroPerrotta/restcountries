import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterContext from "../../context/filterContext";

const Filter = (props) => {
  let content;
  const filterCtx = useContext(FilterContext);

  const navigate = useNavigate();

  const [filterCountry, setFilterCountry] = useState("");

  const handleSelectChange = (event) => {
    if (event.target.value === "all-countries") {
      navigate("/");
    } else {
      navigate(`/continent/${event.target.value}`);
    }
  };

  const handleInputChange = (event) => {
    setFilterCountry(event.target.value);
    filterCtx.setFilter(event.target.value);
  };

  if (props.from === "all") {
    content = (
      <div className="filter-container mx-4 mx-sm-5 mt-5">
        <div className="row filter-row">
          <div className="col-md-5 filter-input applied-shadow">
            <i className="fas fa-search me-1 magnifying-icon ms-2"></i>
            <input
              value={filterCountry}
              onChange={handleInputChange}
              className=""
              type="text"
              placeholder="Search for a country..."
            ></input>
          </div>
          <div className="col-md-7 col-xl-7 region-filter">
            <select
              className="regions ps-2 pe-4 applied-shadow"
              name="region"
              id="region"
              defaultValue={"DEFAULT"}
              onChange={handleSelectChange}
            >
              <option value="DEFAULT" disabled hidden>
                Filter by Region
              </option>
              <option value="all-countries">All Countries</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
      </div>
    );
  } else if (props.from === "single") {
    content = (
      <div className="filter-container mx-5 my-5">
        <Link to="/" className="back-button px-5 py-3 applied-shadow">
          Back
        </Link>
      </div>
    );
  }

  return content;
};

export default Filter;
