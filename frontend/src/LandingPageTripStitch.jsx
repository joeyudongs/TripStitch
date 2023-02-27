import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LandingPageTripStitch() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search?query=${searchTerm}`);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Trip Stitch</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for a destination..." value={searchTerm} onChange={handleSearch} />
        <button type="submit">Search</button>
      </form>
      <div className="footer">
        <p>Footer content here</p>
      </div>
    </div>
  );
}

export default LandingPageTripStitch;
