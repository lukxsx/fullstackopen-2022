import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterField = ({filter, handleFilterChange}) => {
  return (
    <input value={filter} onChange={handleFilterChange} />
  )
}

const CountryStats = ({country}) => {
  let langList = []
  
  for (let key in country.languages) {
    if (country.languages.hasOwnProperty(key)) {
      langList.push(country.languages[key])
    }
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {langList.map(lang =>
            <li key={lang}>{lang}</li>
            )}
        </ul>
      <img src={country.flags.png} />
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
