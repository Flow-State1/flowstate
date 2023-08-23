// Config starter code
import React from "react";
import { createChatBotMessage  } from "react-chatbot-kit";
import BotAvatar from "../components/BotAvatar";
import InAppqs from "../components/InAppqs";
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
   customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton:{
      backgroundColor:"purple",
    },
  },
    state:{
      inAppqs: []
    },
    widgets:[
      {
        // defines the name you will use to reference to this widget in "createChatBotMessage".
      widgetName: "InAppqs",
      // Function that will be called internally to resolve the widget
      widgetFunc: (props) => <InAppqs {...props} />,
      mapStateToProps:["inAppqs"],//tells the chatbot which state want to ive to the comoponents
      },
    ]
  }               

export default config