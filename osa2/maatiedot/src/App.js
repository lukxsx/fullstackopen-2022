import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterField = ({filter, handleFilterChange}) => {
  return (
    <input value={filter} onChange={handleFilterChange} />
  )
}

const CountryEntry = ({country}) => {
  return (
    <div>
      {country.name.common} 
      <button>show</button>
    </div>
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

const CountryList = ({countries}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <CountryEntry key={country.name.common} country={country} />
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
  
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList countries={countriesToShow} />
    </div>
  )
}

export default App;
