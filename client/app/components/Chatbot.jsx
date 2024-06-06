"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { WindupChildren } from "windups";
import UserAvatar from "../assets/images/user_avtar.png";
import AIAvatar from "../assets/images/chatbot.png";

const Chatbot = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChatbox = () => {
    if (showChatbox) {
      setShowChatbox(false);
      setChatMessages([]); // Reset chat messages when chatbox is closed
    } else {
      setShowChatbox(true);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("User input:", userInput);
    const newUserMessage = { role: "user", message: userInput };
    setChatMessages((prevData) => [...prevData, newUserMessage]);
    setUserInput("");
    setLoading(true);
    try {
      const response = await fetch("https://literacy-api-1.onrender.com/api/ask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userInput, // Change "query" to "prompt" as per new request format
        }),
      });
      const data = await response.json();
      const newChatbotMessage = { role: "chatbot", message: data.response }; // Ensure 'response' matches the actual key from your API
      setChatMessages((prevData) => [...prevData, newChatbotMessage]);
      const chatbox = document.getElementById("chatbox-content");
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showChatbox && chatMessages.length === 0) {
      setChatMessages([
        { role: "chatbot", message: "Hello! How can I assist you today?" },
      ]);
    }
    const chatbox = document.getElementById("chatbox-content");
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [showChatbox, chatMessages]);

  return (
    <div>
      <div
        className="chatbot-icon w-16 h-16 text-4xl bg-blue-700 text-white rounded-full flex items-center justify-center fixed bottom-10 right-10 cursor-pointer shadow-lg hover:scale-105 transition-transform"
        onClick={toggleChatbox}
      >
        🤖
      </div>
      {showChatbox && (
        <div className="chatbox fixed bottom-10 w-[70vw] right-10 md:w-[25vw] h-[70vh] rounded-2xl shadow-2xl flex flex-col bg-white justify-between border-2 border-gray-300">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r bg-blue-900 rounded-t-2xl text-white">
            <div className="text-lg font-semibold">
              Chat with Expert
            </div>
            <div
              onClick={toggleChatbox}
              className="cursor-pointer bg-red-500 hover:bg-red-700 transition-colors rounded-full p-2 w-10px text-white"
            >
              ✖
            </div>
          </div>
          <div
            id="chatbox-content"
            className="flex flex-col overflow-y-auto flex-grow p-4 space-y-4"
            style={{ minHeight: 0 }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role !== "user" && (
                  <Avatar src={AIAvatar.src} className="mr-2" />
                )}
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-blue-800 text-white"
                  }`}
                >
                  <WindupChildren>{message.message}</WindupChildren>
                </div>
                {message.role === "user" && (
                  <Avatar src={UserAvatar.src} className="ml-2" />
                )}
              </div>
            ))}
          </div>
          {loading && (
            <div className="flex justify-start items-center p-4">
              <Avatar src={AIAvatar.src} className="mr-2" />
              <div className="p-3 bg-blue-500 text-white rounded-lg max-w-[70%]">
                Loading...
              </div>
            </div>
          )}
          <div className="flex gap-4 items-center p-4 bg-gray-100 border-t border-gray-300">
            <Input
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              placeholder="Enter your prompts here"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white rounded-md",
                input: "text-gray-800",
              }}
              size="lg"
              fullWidth
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-900 text-white hover:bg-blue-500 rounded-md transition-colors"
              auto
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
