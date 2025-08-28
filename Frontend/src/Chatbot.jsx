import React, { useState } from "react";
import Navbar from "./components/shared-component/Navbar";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/api/genai/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.generated_text || "No response from AI");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-500 text-center">
          Confused ??? Well, I can help 😁
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col gap-4"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-4 rounded-lg bg-white text-gray-800 text-lg resize-none h-40 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {response && (
          <div className="w-full max-w-3xl mt-8 p-6 bg-white rounded-lg text-gray-800 text-lg whitespace-pre-wrap border border-gray-300 overflow-auto max-h-[400px]">
            {loading ? "Loading..." : response}
          </div>
        )}
      </div>
    </>
  );
}

export default Chatbot;
