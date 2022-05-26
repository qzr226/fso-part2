import React, { useState, useEffect } from "react";
import axios from "axios";
import ListCountries from "./components/ListCountries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setAllCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    console.log(newFilter);
    if (newFilter) {
      const regex = new RegExp(newFilter, "i");
      const filteredCountries = () =>
        allCountries.filter((country) =>
          country["name"]["common"].match(regex)
        );
      setCountries(filteredCountries);
    }
  }, [newFilter, allCountries]);

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <ListCountries countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;
