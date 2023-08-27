import React, { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./styles.css";
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import Chatbg from "../components/Chatbotbg";

const Chatbox = () => {
  const API_KEY = "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";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hi there! I am Flow-Bot. Let me help you learn more about electricity!",
      sender: "Flow-Bot"
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing" // message will show on the right
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  let lastApiRequestTimestamp = 0;
  const MINIMUM_TIME_BETWEEN_REQUESTS = 1000 / 3;

  async function processMessageToChatGPT(chatMessages) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastApiRequestTimestamp;

    if (timeSinceLastRequest < MINIMUM_TIME_BETWEEN_REQUESTS) {
      await new Promise((resolve) =>
        setTimeout(resolve, MINIMUM_TIME_BETWEEN_REQUESTS - timeSinceLastRequest)
      );
    }

    lastApiRequestTimestamp = Date.now();

    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "Flow-Bot" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old"
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();
    const responseMessage = data.choices[0].message.content;

    setMessages([...chatMessages, { message: responseMessage, sender: "Flow-Bot" }]);
    setTyping(false);
  }

  return (
    <div className="container-chat">
      {isLoading ? (
        <LoadingCard />
      ) : (
        <div>
          <NavSideBarComponent />
          <Chatbg />
          <div className="main-content-card">
            <div className="main-content-card-item">
              <h1 style={{ color: "white" }}>Chatbot</h1>
            </div>
            <div className="chat-details">
              <div style={{ position: "left", height: "1000px", width: "700px" }}>
                <MainContainer style={{ position: "left", height: "1000px", width: "700px" }}>
                  <ChatContainer style={{ height: "1000px", width: "700px" }}>
                    <MessageList scrollBehavior="smooth" typingIndicator={typing ? <TypingIndicator content="Flow-Bot is typing" /> : null}>
                      {messages.map((message, i) => (
                        <Message key={i} model={message}>
                          <Avatar
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            src={message.sender === "user" ? "user-avatar-url" : "assistant-avatar-url"}
                          />
                        </Message>
                      ))}
                    </MessageList>
                    <MessageInput placeholder="Type your message here" onSend={handleSend} />
                  </ChatContainer>
                </MainContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
