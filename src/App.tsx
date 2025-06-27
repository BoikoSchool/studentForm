// src/App.tsx
import { useState } from "react";
import CanvasModal from "./CanvasModal";
import "./index.css";

function App() {
  const [form, setForm] = useState({
    behavior: "",
    recommendations: "",
  });

  const [activeField, setActiveField] = useState<keyof typeof form | null>(
    null
  );

  const handleRecognize = (text: string) => {
    if (!activeField) return;
    setForm((prev) => ({ ...prev, [activeField]: text }));
  };

  return (
    <div className="container">
      <h1>Анкета учня</h1>

      <div className="form-group">
        <label>Особливості поведінки</label>
        <textarea
          value={form.behavior}
          onChange={(e) => setForm({ ...form, behavior: e.target.value })}
          rows={3}
        />
        <button onClick={() => setActiveField("behavior")}>
          ✍️ Писати стилусом
        </button>
      </div>

      <div className="form-group">
        <label>Рекомендації психолога</label>
        <textarea
          value={form.recommendations}
          onChange={(e) =>
            setForm({ ...form, recommendations: e.target.value })
          }
          rows={3}
        />
        <button onClick={() => setActiveField("recommendations")}>
          ✍️ Писати стилусом
        </button>
      </div>

      <CanvasModal
        visible={activeField !== null}
        onClose={() => setActiveField(null)}
        onRecognize={handleRecognize}
      />
    </div>
  );
}

export default App;
