import React, { useState } from 'react'

const Country = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const showCountryDetails = (country) => {
    setSelectedCountry(country)
  };

  return (
    <div>
      {selectedCountry ? (
        <div key={selectedCountry.name.common}>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} square kilometers</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
        </div>
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>
            <h5>{country.name.common}</h5>
            {countries.length > 1 ? (
              <button onClick={() => showCountryDetails(country)}>Show Details</button>
            ) : (
              <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area} square kilometers</p>
                <h3>Languages</h3>
                <ul>
                  {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Country
