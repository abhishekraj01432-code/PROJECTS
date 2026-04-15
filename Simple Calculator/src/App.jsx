import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clear = () => {
    setInput("");
  };

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Calculator</h1>

      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "200px", height: "40px", fontSize: "18px" }}
      />

      <div style={{ marginTop: "20px" }}>
        {["7", "8", "9", "/"].map((item) => (
          <button key={item} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
        <br />

        {["4", "5", "6", "*"].map((item) => (
          <button key={item} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
        <br />

        {["1", "2", "3", "-"].map((item) => (
          <button key={item} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
        <br />

        {["0", ".", "+", "="].map((item) => (
          <button
            key={item}
            onClick={() =>
              item === "=" ? calculate() : handleClick(item)
            }
          >
            {item}
          </button>
        ))}
        <br />

        <button onClick={clear}>C</button>
      </div>
    </div>
  );
}

export default App;