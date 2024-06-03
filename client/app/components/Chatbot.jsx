"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { WindupChildren } from "windups";
import UserAvatar from "../assets/images/user_avtar.jpg";
import AIAvatar from "../assets/images/chatbot.png";

const Chatbot = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const toggleChatbox = () => {
    setShowChatbox((prev) => !prev);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const [loading, setLoading] = useState(false); // Add loading state
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Handle user input, e.g., send it to a chatbot API
    console.log("User input:", userInput);
    const newUserMessage = { role: "user", message: userInput };
    setChatMessages((prevData) => [...prevData, newUserMessage]);
    console.log("chatMessages", chatMessages);
    // Clear the input after submission
    setUserInput("");
    setLoading(true);
    try {
      // const response = await fetch("api/chat", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     query: userInput,
      //   }),
      // });
      // const message = await response.json();
      // console.log("message", message);
      const message = { title: "This is a test response, as we have stopped the model, and this is the demo stream of text for you. To see an actual demo contact us." };

      // Simulate chatbot response (replace this with actual API interaction)
      const newChatbotMessage = { role: "chatbot", message: message.title };
      setChatMessages((prevData) => [...prevData, newChatbotMessage]);
      console.log("chatMessages", chatMessages);
      const chatbox = document.getElementById("chatbox-content");
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setLoading(false);
    }
    // Scroll to the bottom when a new message is added
  };

  useEffect(() => {
    // Simulate initial chatbot messages
    if (showChatbox && chatMessages.length === 0) {
      setChatMessages([
        { role: "chatbot", message: "Hello! How can I assist you today?" },
      ]);
    }

    // Scroll to the bottom when a new message is added
    const chatbox = document.getElementById("chatbox-content");
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [showChatbox, chatMessages]);

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        className="chatbot-icon w-16 h-16 text-4xl bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center fixed bottom-10 right-10 cursor-pointer shadow-lg hover:scale-105 transition-transform"
        onClick={toggleChatbox}
      >
        🤖
      </div>

      {/* Chatbox */}
      {showChatbox && (
        <div className="chatbox fixed bottom-10 w-[70vw] right-10 md:w-[25vw] h-[70vh] rounded-2xl shadow-2xl flex flex-col bg-white justify-between border-2 border-gray-300">
          {/* Chatbox Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl text-white">
            <div className="text-lg font-semibold">
              Chat with Expert
            </div>
            <div
              onClick={toggleChatbox}
              className="cursor-pointer bg-red-500 hover:bg-red-700 transition-colors rounded-full p-3 text-white"
            >
              ✖
            </div>
          </div>

          {/* Chatbox Content */}
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
                  <Avatar src={UserAvatar} className="mr-2" />
                )}
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-800"
                  }`}
                >
                  <WindupChildren>{message.message}</WindupChildren>
                </div>
                {message.role === "user" && (
                  <Avatar src={UserAvatar} className="ml-2" />
                )}
              </div>
            ))}
          </div>

          {/* Loading Animation with Chatbot Avatar */}
          {loading && (
            <div className="flex justify-start items-center p-4">
              <Avatar src={AIAvatar} className="mr-2" />
              <div className="p-3 bg-blue-500 text-white rounded-lg max-w-[70%]">
                {/* You can replace this with your loading animation or component */}
                Loading...
              </div>
            </div>
          )}

          <div className="flex gap-4 items-center p-4 bg-gray-100 border-t border-gray-300">
            {/* User Input */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-700 hover:to-purple-700 rounded-md transition-colors"
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
