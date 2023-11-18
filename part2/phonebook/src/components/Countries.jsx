import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

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
  }, [inputValue]);

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
          <p>Info about {inputValue}</p>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((c) => (
            <div key={c.name.common}>
              <span>{c.name.common}</span>
              <button>show</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Countries;
