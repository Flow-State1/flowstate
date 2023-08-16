// Config starter code
import React from "react"
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "../components/BotAvatar";
const botName="Somebot";
const config = {
  botName:"Flow-Bot",
  initialMessages: [
    createChatBotMessage(`Hey there my name is ${botName} how can I help you`)],
    customComponents: {
      // Replaces the default header
     // Replaces the default bot avatar
     botAvatar: (props) => <BotAvatar{...props} />
   },
}

export default config