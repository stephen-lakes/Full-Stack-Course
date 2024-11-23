import axios from "axios";
import React, { useEffect, useState } from "react";

const api_key = import.meta.env.VITE_SOME_KEY;
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

const Countries = () => {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [info, setInfo] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);

  const axiosInstance = axios.create({
    baseURL: "https://studies.cs.helsinki.fi/restcountries/api/all",
  });

  useEffect(() => {
    axiosInstance
      // .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue.toLowerCase())
      )
    );

    if (filteredCountries.length === 1)
      setCityName(filteredCountries[0].name.common);
  }, [inputValue]);

  useEffect(() => {
    if (cityName) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
        axiosInstance.get(url).then((response) => setWeather(response.data));
      } catch (err) {
        console.error("Error fetching weather data");
      }
    }
  }, [cityName]);

  const handleShow = (countryName) => {
    axiosInstance
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName.toLowerCase()}`
      )
      .then((response) => {
        setInfo(response.data);
      });
    setCityName(countryName);
  };

  return (
    <div>
      find countries{" "}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* SEARCH FILTER RESULT */}
      <div>
        {filteredCountries.length === 1 ? (
          <>
            <Summary country={filteredCountries[0]} />
          </>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((c) => (
            <div key={c.name.common}>
              <span>{c.name.common}</span>
              <button onClick={() => handleShow(c.name.common)}>show</button>
            </div>
          ))
        )}
      </div>
      {/* COUNTRY INFO ON CLICK SHOW BUTTON */}
      <Info countryInfo={info} />
      {/* WEATHER DATA FOR COUNTRY */}
      <Weather weather={weather} />
    </div>
  );
};

const Info = ({ countryInfo }) => {
  return (
    <>
      {countryInfo && (
        <div>
          <h1>{countryInfo.name.common}</h1>
          <p>Capital {countryInfo.capital}</p>
          <p>Area: {countryInfo.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.keys(countryInfo.languages).map((key) => (
              <li key={key}>
                {key}: {countryInfo.languages[key]}
              </li>
            ))}
          </ul>

          {/* FLAG */}
          <div style={{ width: 200, height: 200 }}>
            <img src={countryInfo.flags.svg} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

const Summary = ({ country }) => {
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.keys(country.languages).map((key) => (
            <li key={key}>
              {key}: {country.languages[key]}
            </li>
          ))}
        </ul>

        {/* FLAG */}
        <div style={{ width: 200, height: "auto" }}>
          <img src={country.flags.svg} alt="" />
        </div>
      </div>
    </>
  );
};

const Weather = ({ weather }) => {
  {
    weather ? (
      <div>
        <h2>Weather in {weather.name}</h2>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    ) : (
      <p>no weather info for the location </p>
    );
  }
};

export default Countries;
