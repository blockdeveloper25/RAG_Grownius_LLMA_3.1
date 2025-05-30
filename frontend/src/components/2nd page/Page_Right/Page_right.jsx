import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back_btn from "../../../assets/back.svg";
import logo from "../../../assets/logo_.svg";
import send_btn from "../../../assets/send.svg";
import axios from "axios";

const prompts = [
  "Which crop suits my land?",
  "How can I improve my soil?",
  "What's the best planting season?",
  "Which fertilizer should I use?",
  "What are the best farming techniques?",
];

const PageRight = () => {
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setUserInput(prompt);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (selectedPrompt) {
      setSelectedPrompt("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      alert("Please enter a question before proceeding.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5001/userQuery", { text: userInput });
      const last_prompt = response.data.prompt;
      const resultsResponse = await axios.post("http://127.0.0.1:5002/chat", { prompt: last_prompt });
      const results = resultsResponse.data.rag_response;
      navigate("/results", { state: { result: results, question: userInput } });
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full max-w-[580px] h-[780px] bg-white rounded-[25px] p-6 flex flex-col shadow-lg">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
        <img src={back_btn} alt="Back" className="w-5 h-5" />
        <span className="text-cyan-950 text-sm font-medium hover:underline">Edit inputs</span>
      </div>

      {/* Logo and Heading Section */}
      <div className="flex flex-col items-center mt-8 flex-grow">
        <img src={logo} alt="Logo" className="w-24 h-24" />
        <h1 className="text-2xl font-bold text-cyan-950 mt-4">
          Get Answers, Grow Better
        </h1>
        <p className="text-sm text-cyan-950 opacity-50 max-w-[370px] text-center mt-2">
          Choose a default prompt or type your own question to get expert farming insights.
        </p>
      </div>

      {/* Prompts and Input Section */}
      <div className="mt-auto mb-8 w-full">
        {/* Prompt Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${
                selectedPrompt === prompt
                  ? "border-cyan-950 bg-cyan-950 text-white font-semibold"
                  : "border-cyan-950/20 text-cyan-950 hover:border-cyan-950/40"
              }`}
              onClick={() => handlePromptClick(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative w-full max-w-[500px] mx-auto">
          <div
            className={`flex items-center border rounded-2xl px-4 py-3 w-full transition-all ${
              userInput ? "border-cyan-950" : "border-cyan-950/20"
            } ${isLoading ? "opacity-70" : ""}`}
          >
            <input
              type="text"
              placeholder="Type your prompt here..."
              value={userInput}
              onChange={handleInputChange}
              className="flex-1 bg-transparent outline-none text-cyan-950 text-sm placeholder-cyan-950/50"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                isLoading ? "bg-cyan-950/70" : "bg-cyan-950 hover:bg-cyan-800"
              }`}
            >
              <img 
                src={send_btn} 
                alt="Send" 
                className="w-4 h-4" 
              />
            </button>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-2xl">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-950"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageRight;