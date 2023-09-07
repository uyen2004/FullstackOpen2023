import React from 'react';

const Country = ({ countries }) => {
  return (
    <div>
      {countries.length === 1 ? (
        countries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} square kilometers</p>
            <h3>Languages </h3>
            <li>{Object.values(country.languages).join(', ')}</li>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          </div>
        ))
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>
            <h5>{country.name.common}</h5>
          </div>
        ))
      )}
    </div>
  )
}

export default Country
