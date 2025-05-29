import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/matches.json")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  return (
   <div className="container">
    <div className="App">
      <h2>FIFA Upcoming Matches</h2>
      <div className="heading">7 Matches · Jun 01 - Jun 07</div>
      <table className="matches-table">
        <thead>
          <tr>
            <th style={{ width: "120px" }}>Date</th>
            <th className="match-details">Match Details</th>
            <th style={{ width: "120px" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="loading-row">
              <td colSpan={3}>Loading...</td>
            </tr>
          ) : (
            matches.map((match, idx) => (
              <tr key={idx}>
                <td className="match-date">{match.date}</td>
                <td className="match-details">
                  <div>
                    {match.details.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <div className="match-result">{match.result}</div>
                </td>
                <td className="match-time">
                  <div>{match.time}</div>
                  <div className="match-gmt">{match.gmt}</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
