import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroRight = () => {
  const [inputs, setInputs] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    pH_Level: "",
    rainfall: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const validationRules = {
      nitrogen: { min: 0 },
      phosphorus: { min: 0 },
      potassium: { min: 0 },
      temperature: {},
      humidity: { min: 0, max: 100 },
      pH_Level: { min: 0, max: 14 },
      rainfall: { min: 0 },
    };

    Object.entries(validationRules).forEach(([field, { min, max }]) => {
      const value = parseFloat(inputs[field]);
      if (inputs[field] === "") {
        newErrors[field] = "This field is required";
      } else if (isNaN(value)) {
        newErrors[field] = "Please enter a valid number";
      } else if (value < min || (max !== undefined && value > max)) {
        newErrors[field] = max !== undefined 
          ? `Must be between ${min} and ${max}` 
          : `Must be at least ${min}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", inputs);
      navigate("/ask-grownius", { 
        state: { 
          ...inputs, 
          prediction: response.data.prediction 
        } 
      });
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Failed to get prediction. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Field configurations
  const topFields = ["nitrogen", "phosphorus", "potassium"];
  const bottomFields = [
    { name: "temperature", placeholder: "Enter environment temperature", unit: "°C" },
    { name: "humidity", placeholder: "Enter humidity level", unit: "%" },
    { name: "pH_Level", placeholder: "Enter soil pH", unit: "" },
    { name: "rainfall", placeholder: "Enter rainfall", unit: "mm/year" },
  ];

  return (
    <div className="flex justify-center lg:justify-between w-full">
      <div className="w-full max-w-[580px] bg-white rounded-[25px] p-6 lg:p-10">
        <h1 className="text-cyan-950 text-2xl font-bold mb-6">Know Your Land</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Top Row - NPK Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {topFields.map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm sm:text-[15px] text-cyan-950 font-bold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)} level
                </label>
                <div className="relative">
                  <input
                    name={field}
                    value={inputs[field]}
                    onChange={handleChange}
                    className={`border-[1.5px] ${
                      errors[field] ? "border-red-500" : 
                      inputs[field] ? "border-[#04364A]" : "border-[#04364A4A]"
                    } rounded-lg w-full h-12 px-4 font-medium outline-none bg-transparent placeholder-[#04364A4A]`}
                    type="text"
                    placeholder="_ _ _"
                    inputMode="numeric"
                  />
                  <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    inputs[field] ? "text-[#04364A]" : "text-[#04364A4A]"
                  }`}>
                    mg/kg
                  </span>
                </div>
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Fields */}
          <div className="space-y-4">
            {bottomFields.map(({ name, placeholder, unit }) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm sm:text-[15px] text-cyan-950 font-bold mb-2">
                  {name.replace("_", " ")}
                </label>
                <div className="relative">
                  <input
                    name={name}
                    value={inputs[name]}
                    onChange={handleChange}
                    type="text"
                    placeholder={placeholder}
                    inputMode={name === "pH_Level" ? "decimal" : "numeric"}
                    className={`border-[1.5px] ${
                      errors[name] ? "border-red-500" : 
                      inputs[name] ? "border-[#04364A]" : "border-[#04364A4A]"
                    } rounded-lg w-full h-12 px-4 outline-none bg-transparent placeholder-[#04364A4A]`}
                  />
                  {unit && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#04364A4A]">
                      {unit}
                    </span>
                  )}
                </div>
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 bg-cyan-700 rounded-full text-white font-bold transition duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-cyan-800"
              }`}
            >
              {isLoading ? "Processing..." : "Ask Grownius"}
            </button>
            {errors.submit && (
              <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroRight;