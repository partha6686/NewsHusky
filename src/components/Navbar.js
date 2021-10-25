import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [category, setCategory] = useState("general");
  const [value, setValue] = useState("");
  function handleClick(cat) {
    setCategory(cat);
  }
  function handleChange(e){
    //console.log(e.target.value);
    setValue(e.target.value);
  }
  function handleSubmit(){
    props.setQuery(value);
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">NewsHusky</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("general"))} className={category === "general" ? "nav-link active" : "nav-link"} aria-current="page" to="/" >Home</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("business"))} className={category === "business" ? "nav-link active" : "nav-link"} to="/business">Business</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("entertainment"))} className={category === "entertainment" ? "nav-link active" : "nav-link"} to="/entertainment" >Entertainment</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("health"))} className={category === "health" ? "nav-link active" : "nav-link"} to="/health">Health</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("science"))} className={category === "science" ? "nav-link active" : "nav-link"} to="/science">Science</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("sports"))} className={category === "sports" ? "nav-link active" : "nav-link"} to="/sports" >Sports</Link></li>
              <li className="nav-item mx-3"><Link onClick={() => (handleClick("technology"))} className={category === "technology" ? "nav-link active" : "nav-link"} to="/technology" >Technology</Link></li>
            </ul>
            <div className="d-flex" >
              <input onChange={handleChange} className="form-control me-2" type="search" name="q" placeholder="Search" aria-label="Search" />
              {/* <button onClick={handleSubmit} className="btn btn-outline-info" type="submit">Search</button> */}
              <Link to={{
                pathname: "/query",
                search: "?q=" + value
              }} ><button onClick={handleSubmit} className="btn btn-outline-info">Search</button></Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
