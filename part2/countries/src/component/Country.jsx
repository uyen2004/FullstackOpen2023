import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (selectedCountry) {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      const capital = selectedCountry.capital
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

      axios
        .get(weatherUrl)
        .then((response) => {
          setWeatherData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error)
        })
    }
  }, [selectedCountry])

  useEffect(() => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0])
    }
  }, [countries])

  const showCountryDetails = (country) => {
    setSelectedCountry(country)
  }

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
          {weatherData && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              {weatherData.weather.length > 0 && (
                <div>
                  <h4>Weather Condition:</h4>
                  <p>{weatherData.weather[0].description}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>
            <h5>{country.name.common}</h5>
            {countries.length > 1 && (
              <button onClick={() => showCountryDetails(country)}>Show Details</button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Country
