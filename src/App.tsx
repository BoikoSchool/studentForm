import { useState } from "react";
function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    behaviorNotes: "",
    recommendations: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Анкету збережено!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Анкета учня для психолога</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 bg-white p-6 rounded-xl shadow-xl"
      >
        <div>
          <label className="block font-semibold mb-1">ПІБ учня</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Напишіть стилусом або введіть вручну"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Дата народження</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Особливості поведінки
          </label>
          <textarea
            name="behaviorNotes"
            value={formData.behaviorNotes}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Можна писати стилусом (Scribble) на iPad"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Рекомендації психолога
          </label>
          <textarea
            name="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Можна писати стилусом (Scribble) на iPad"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Зберегти анкету
        </button>
      </form>
    </main>
  );
}

export default App;
