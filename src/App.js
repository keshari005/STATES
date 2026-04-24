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
      .catch(() => setCountries([]));
  }, []);

  // Fetch States
  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setState("");
        setCities([]);
        setCity("");
      })
      .catch(() => setStates([]));
  }, [country]);

  // Fetch Cities
  useEffect(() => {
    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setCity("");
      })
      .catch(() => setCities([]));
  }, [country, state]);

  return (
    <div>
      <h2>Select Location</h2>

      {/* Country */}
      <select onChange={(e) => setCountry(e.target.value.trim())} value={country}>
        <option value="">Select Country</option>
        {countries.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* State */}
      <select
        onChange={(e) => setState(e.target.value.trim())}
        value={state}
        disabled={!country}
      >
        <option value="">Select State</option>
        {states.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* City */}
      <select
        onChange={(e) => setCity(e.target.value.trim())}
        value={city}
        disabled={!state}
      >
        <option value="">Select City</option>
        {cities.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* ✅ ALWAYS render + EXACT format */}
      <h3>
        {`You selected ${city}, ${state}, ${country}`}
      </h3>
    </div>
  );
}

export default App;