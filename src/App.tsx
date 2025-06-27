import React from "react";

export default function App() {
  const [text, setText] = React.useState("");

  return (
    <div>
      <h1>Анкета учня</h1>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Пиши стилусом або клавіатурою"
        style={{ width: "100%", fontSize: "18px" }}
      />
    </div>
  );
}
