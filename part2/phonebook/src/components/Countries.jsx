import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "https://studies.cs.helsinki.fi/restcountries/api/all",
  });

  useEffect(() => {
    value &&
      axiosInstance
        // .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          setCountries(response.data);
        });
  }, [value]);

  return (
    <div>
      find countries{" "}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <div>
        {countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        ).length > 10 ? (
          <p>Too many matches, sepcify another filter</p>
        ) : (
          countries
            .filter((country) =>
              country.name.common.toLowerCase().includes(value.toLowerCase())
            )
            .map((country) => (
              <p key={country.name.common}>{country.name.common}</p>
            ))
        )}
      </div>
    </div>
  );
};

export default Countries;
