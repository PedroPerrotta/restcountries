import { Link } from "react-router-dom";

const Filter = (props) => {
  let content;

  if (props.from === "all") {
    content = (
      <div className="filter-container mx-5 mt-5">
        <div className="row">
          <div className="col-5 filter-input ">
            <input type="text" placeholder="Search for a country..."></input>
          </div>
          <div className="col-7">
            <select
              className="regions ps-2 pe-4"
              name="region"
              id="region"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled hidden>
                Filter by Region
              </option>
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
      <div className="filter-container mx-5 mt-5">
        <Link to='/' className="back-button px-5 py-3">Back</Link>
      </div>
    );
  }

  return content;
};

export default Filter;
