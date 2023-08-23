// Config starter code
import React from "react";
import { createChatBotMessage  } from "react-chatbot-kit";
import BotAvatar from "../components/BotAvatar";
import InAppqs from "../components/InAppqs";
const botName="Flowbot";
const config = {
  botName:"Flow-Bot",
  initialMessages: [
    createChatBotMessage(`Hi lets chat`)],
    customComponents: {
      // Replaces the default header
      header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
     // Replaces the default bot avatar
     botAvatar: (props) => <BotAvatar{...props} />,
     botChatMessage: (props) => <CustomChatMessage {...props} />,
         // Replaces the default user icon
    userAvatar: (props) => <MyUserAvatar {...props} />,
    // Replaces the default user chat message
    userChatMessage: (props) => <MyUserChatMessage {...props} />
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