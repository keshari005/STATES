import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

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
      .catch((err) => console.error("Error fetching states:", err));
  }, [country]);

  useEffect(() => {
    if (!country || !state) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setCity("");
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, [state]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Location</h2>

      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      <select value={state} onChange={(e) => setState(e.target.value)} disabled={!country}>
        <option value="">Select State</option>
        {states.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
        <option value="">Select City</option>
        {cities.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      {country && state && city && (
        <h3>You selected: {city}, {state}, {country}</h3>
      )}
    </div>
  );
}

export default App;
