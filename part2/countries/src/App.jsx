import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './component/Country';

const App = () => {
  const [query, setQuery] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        if (response.data.length > 0) {
          setMessage('');
          setAllCountries(response.data);
        } else {
          setMessage('No countries found.');
          setAllCountries([]);
        }
      })
      .catch((error) => {
        setMessage('Error fetching data.');
        setAllCountries([]);
      });
  }, []);

  useEffect(() => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length > 10) {
      setMessage('Too many matches, specify another filter.');
      setFilteredCountries([]);
    } else if (filtered.length >= 1) {
      setMessage('');
      setFilteredCountries(filtered);
    } else {
      setMessage('No matches found.');
      setFilteredCountries([]);
    }
  }, [query, allCountries]);

  return (
    <div>
      <h1>Country Searching</h1>
      <input
        type="text"
        placeholder="Find country"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>Search</button>
      <p>{message}</p>
      <Country countries={filteredCountries} />
    </div>
  );
};

export default App;
