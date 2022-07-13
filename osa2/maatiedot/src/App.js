import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const FilterField = ({filter, handleFilterChange}) => {
  return (
    <input value={filter} onChange={handleFilterChange} />
  )
}

const Weather = ({weather}) => {
  if (Object.keys(weather).length === 0) {
    return (<div></div>)
  }
  
  const icon_url = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
  return (
    <div>
    <p>Temp: {weather.main.temp} °C</p>
    <p>Wind: {weather.wind.speed} m/s</p>
    <img src={icon_url} alt="weather icon" />
    </div>
  )
}

const CountryStats = ({country}) => {
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + country.capitalInfo.latlng[0] + "&lon=" + country.capitalInfo.latlng[1] +"&appid=" + api_key)
      .then(response => {
        setWeather(response.data)
    })
  }, [])
  
  let langList = []
  
  for (let key in country.languages) {
    if (country.languages.hasOwnProperty(key)) {
      langList.push(country.languages[key])
    }
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {langList.map(lang =>
            <li key={lang}>{lang}</li>
            )}
        </ul>
      <img src={country.flags.png} alt="country flag" />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather weather={weather} />
    </div>
  )
}

const CountryList = ({countries, handleShowButton}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => {
              handleShowButton(country)
          }}>show</button>
          </div>
                )}
    </div>
    )
  }
  
  return (
    <div>
        {countries.map(country =>
          <CountryStats key={country.name.common} country={country} />
        )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
   
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
    })
  }, [])
  
  const countriesToShow = (filter === "")
    ? countries
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleShowButton = (c) => {
    setFilter(c.name.common)
  }
  
  return (
    <div>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList countries={countriesToShow} handleShowButton={handleShowButton} />
    </div>
  )
}

export default App;
