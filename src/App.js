import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Fetch Countries
  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Fetch States when country changes
  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setState("");     // reset state
        setCities([]);    // clear cities
        setCity("");      // reset city
      })
      .catch((err) => console.error("Error fetching states:", err));
  }, [country]);

  // Fetch Cities when state changes
  useEffect(() => {
    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setCity(""); // reset city when state changes
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, [country, state]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={!country}
      >
        <option value="">Select State</option>
        {states.map((s, index) => (
          <option key={index} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!state}
      >
        <option value="">Select City</option>
        {cities.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* ✅ Show only when all selected */}
      {country && state && city && (
        <h3>
          You selected {city}, {state}, {country}
        </h3>
      )}
    </div>
  );
}

export default App;