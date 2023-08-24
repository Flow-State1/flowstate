import {useState,useEffect} from 'react'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator } from "@chatscope/chat-ui-kit-react" 
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import LineChart from "../components/lineChart";
import "./styles.css";
const chatbox = () => {
    const API_KEY="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";

    
    const [typing,setTyping]=useState(false);
    const [messages,setMessages]=useState([
        {
            message:"Hi there I am Flow-Bot",
            sender:"Flow-Bot"
        }
    ])
    const handleSend= async (message)=>{
        const newMessage={
            message:message, 
            sender:"user",
            direction:"outgoing"//message will show on the right
        }
        const newMessages=[...messages,newMessage];//all the old messages,+ the new messages
        //update our nessages state
        setMessages(newMessages);
        // type indicator 
        setTyping(true);
        //process message to chatGPT (senit over and see the response)
        await processMessagetoChatGPT(newMessages);
    }
    async function processMessagetoChatGPT(chatMessages) {
        //chatMessages{sender:"user" or Flow-bot .message:"The message content here"}
        //apuMessages{role:"user" or assistant,content:"The message contenet here"}
        let apiMessages=chatMessages.map((messageObject)=>{
            let role="";
            if(messageObject.sender==="Flow-Bot"){
                role="assisant"
            }else{
                role="user"
            }
            return{role:role,content:messageObject.message}
        });
        //role:"user"->a message from the user,"assistant"->a response from flow-bot
        //system->generally one initai message defining how we want chatgpt to talk
        const systemMessage={
            role:"system",
            content:"Explain all concepts like I am 10 years old"
        }
        const apiRequestBody={
            "model":"gpt-3.5-turbo",
            "messages":[
                systemMessage,
                ...apiMessages// [messsage1 ,message2,message3]
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST", 
            headers:{
                "Authorization":"Bearer"+ API_KEY,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].messages.content);
            setMessages(
                [...chatMessages,{
                    message:data.choices[0].messages.content,
                    sender:"Flow-Bot"
                }]//user wll see the response from chat chatpgt
            );
            setTyping(false);
        })
    }
    return (
        <div>
        <div style={{postion:"left",height:"800px",width:"700px"}}>
                   
            <MainContainer>
               <ChatContainer>
                <MessageList
                scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="Flow-Bot is typing"/>:null}
                >
                    {messages.map((message,i)=>{
                        return<Message key={i} model={message}/>
                    })}
                </MessageList>
                <MessageInput placeholder='Type your message here' onSend={handleSend}/>
                </ChatContainer> 
            </MainContainer>
            </div>
     
        </div>
    )
}
export default chatbox