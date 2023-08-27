import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import "../styles.css";
//import Chatbg from "../components/Chatbotbg";

const Chatbox = () => {
    const API_KEY = "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";

    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
        message: "Hi there I am Flow-Bot, let me help you learn more about electricity!",
        sender: "Flow-Bot"
        }
    ]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
        <div className="container-chat">
            <div>
            {/* <Chatbg /> */}
            <div className="main-content-card">
                <div className="chat-details">
                <div style={{marginLeft:'auto'}} >
                    <MainContainer style={{borderRadius:'18px', height:'500px', width:'800px'}}>
                    <ChatContainer style={{padding:'5px'}} >
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
        </div>
    </motion.div>
  );
};

export default React.memo(Chatbox);