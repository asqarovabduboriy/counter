import React, { useState, useEffect } from 'react';
import './App.css'


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCountries, setSortedCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    const selectedContinent = event.target.value;
    if (selectedContinent === 'All') {
      setSortedCountries([...countries]);
    } else {
      const filteredCountries = countries.filter((country) => country.region === selectedContinent);
      setSortedCountries(filteredCountries);
    }
  };

  const filteredCountries = sortedCountries.filter((country) => {
    const regex = new RegExp(searchTerm, 'gi');
    return country.name.common.match(regex);
  });

  const continents = new Set(countries.map((country) => country.region));
  
  

  return (
    <div>
      <h1>COUNTRY</h1>
      <div>
        <input type="text" placeholder="Qidirish" onChange={handleSearch} />
        <select onChange={handleSort}>
          <option value="All">Hamma mintaqa</option>
          {[...continents].map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
     {filteredCountries.map((country, index) => (
  <div key={country.cca3} className="country-card">
    <h2 className="country-name">
      {country.name.common} ({country.cca3})
    </h2>
    <img
      src={`https://www.countryflags.io/${country.cca2}/flat/64.png`}
      alt={`${country.name.common} flag`}
      className="country-flag"
    />
    <div className="country-info">
      <p className="country-details">Poytaxt: {country.capital}</p>
      <p className="country-details">Hudud: {country.region}</p>
      <p className="country-details">Aholi soni: {country.population}</p>
    </div>
  </div>
))}
    </div>
  );
};

export default App;