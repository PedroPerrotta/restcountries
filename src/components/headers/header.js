import { Link } from "react-router-dom";

const header = () => {
  const handleTheme = () => {
    document.body.classList.toggle('light');
  }

  return (
    <div className="header-container px-4 px-sm-5 pt-4 pb-3">
      <Link to="/"><h1 className="title">Where in the world?</h1></Link>
      <button type='button' onClick={handleTheme} className="theme-mode"><i className="fas moon-icon fa-moon"></i> Dark Mode</button>
    </div>
  );
};

export default header;
