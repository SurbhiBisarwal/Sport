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
    <div className="App">
      <div style={{ width: "100%", padding: "24px" }}>
        <h2>FIFA Upcoming Matches</h2>
        <div style={{ color: "#555", marginBottom: "16px" }}>
          7 Matches · Jun 01 - Jun 07
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fafafa",
          }}
        >
          <thead>
            <tr style={{ background: "#eee" }}>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  width: "120px",
                }}
              >
                Date
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Match Details
              </th>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  width: "120px",
                }}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", padding: "16px" }}
                >
                  Loading...
                </td>
              </tr>
            ) : (
              matches.map((match, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    {match.date}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <div>
                      {match.details.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                    <div style={{ color: "#1976d2", marginTop: "4px" }}>
                      {match.result}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <div>{match.time}</div>
                    <div style={{ color: "#888", fontSize: "12px" }}>
                      {match.gmt}
                    </div>
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
