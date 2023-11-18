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
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div>
        {filteredCountries.map((c) => (
          <p key={c.name.common}>{c.name.common}</p>
        ))}
      </div>
    </div>
  );
};

export default Countries;
