import React from 'react'

const CountryDetails = ({ country, onClose }) => {
  return (
    <div>
      <div>
        <button onClick={onClose}>
          Close
        </button>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} square kilometers</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    </div>
  )
}

export default CountryDetails
