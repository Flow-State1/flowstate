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

const chatbox = () => {
  const API_KEY = "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";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hi there I am Flow-Bot, let me help you learn more about electricity!",
      sender: "Flow-Bot"
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessagetoChatGPT(newMessages);
  };

  let lastApiRequestTimestamp = 0;
  const MINIMUM_TIME_BETWEEN_REQUESTS = 1000 / 3;

  async function processMessagetoChatGPT(chatMessages) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastApiRequestTimestamp;

    if (timeSinceLastRequest < MINIMUM_TIME_BETWEEN_REQUESTS) {
      await new Promise((resolve) =>
        setTimeout(resolve, MINIMUM_TIME_BETWEEN_REQUESTS - timeSinceLastRequest)
      );
    }

    lastApiRequestTimestamp = Date.now();
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Flow-Bot") {
        role = "assistant";
      } else {
        role = "user";
      }
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

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "Flow-Bot"
          }
        ]);
        setTyping(false);
      });
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
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={typing ? <TypingIndicator content="Flow-Bot is typing" /> : null}
                    >
                      {messages.map((message, i) => (
                        <Message key={i} model={message}>
                          {message.sender === "user" ? (
                            <Avatar
                              style={{ width: 40, height: 40, borderRadius: 20 }}
                              src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                            />
                          ) : (
                            <Avatar
                              style={{ width: 40, height: 40, borderRadius: 20 }}
                              src="https://static.vecteezy.com/system/resources/previews/007/224/792/original/robot-modern-style-vector.jpg"
                            />
                          )}
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

export default chatbox;
