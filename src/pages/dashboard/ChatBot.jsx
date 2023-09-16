import React, { useState, useEffect, useContext } from "react";
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
import { AppContext } from "../../context/AppContext";

const Chatbox = () => {

  const {typing, messages, handleSend}= useContext(AppContext);

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