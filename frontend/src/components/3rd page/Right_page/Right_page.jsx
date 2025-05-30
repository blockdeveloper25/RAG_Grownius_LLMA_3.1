import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/logo_.svg";
import mini_logo from "../../../assets/mini_logo.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

const Right_Page = () => {
  const location = useLocation();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState("");
  const { result, question } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible(true);

    // Typewriter effect for the result
    if (result) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i <= result.length) {
          setTypingText(result.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 10); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    }
  }, [result]);

  const handleNavigate = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/"), 500); // Wait for animation to complete
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-[580px] h-[780px] bg-white rounded-[25px] p-10 relative overflow-hidden"
      >
        {/* Floating background elements */}
        <motion.div
          animate={{
            x: [0, 5, 0, -5, 0],
            y: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -z-10 top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage: "radial-gradient(#176B87 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={logo}
            alt="Main Logo"
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="border-t border-[#176B872A] mt-[31px]"></div>
        </motion.div>

        {/* Question Bubble */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#176B872A] mt-12 w-auto max-w-[80%] rounded-[12px] ml-auto"
        >
          <motion.h1
            className="text-[15px] text-[#04364A] px-5 py-2.5"
            whileHover={{ scale: 1.02 }}
          >
            {question}
          </motion.h1>
        </motion.div>

        {/* Response Section */}
        <motion.div
          className="flex mt-7.5"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-7.5 w-7.5 bg-[#176B87] flex items-center justify-center rounded-full"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <img
              className="w-2.4 h-3.7 px-2.5 py-2"
              src={mini_logo}
              alt="Mini Logo"
            />
          </motion.div>
          <motion.div
            className="ml-3 p-3 w-full max-h-[700px] h-[600px] border border-gray-200 rounded overflow-y-auto"
            style={{ minHeight: "150px", maxHeight: "400px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {typingText || result}
            </ReactMarkdown>
          </motion.div>
        </motion.div>

        {/* Start Fresh Button */}
        <motion.div
          className="flex justify-center items-center mt-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={handleNavigate}
            className="text-[15px] font-bold text-white bg-[#176B87] rounded-[100px] px-8 py-3 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Fresh & Grow Again</span>
            <motion.span
              className="absolute inset-0 bg-[#04364A] rounded-[100px] z-0"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </motion.div>

        
      </motion.div>
    </AnimatePresence>
  );
};

export default Right_Page;
