import { Link } from "react-router-dom";

const header = () => {
  return (
    <div className="header-container px-5 pt-4 pb-3">
      <Link to="/"><h1 className="title">Where in the world?</h1></Link>
      <p className="theme-mode">Dark Mode</p>
    </div>
  );
};

export default header;
