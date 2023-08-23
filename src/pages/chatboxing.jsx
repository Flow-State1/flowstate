import {useState,useEffect} from 'react'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator } from "@chatscope/chat-ui-kit-react" 
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import LineChart from "../components/lineChart";
import "./styles.css";
const chatbox = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);
    
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
    }
    return (
        <div className="container">
            {isLoading ?(
                <LoadingCard/>):( 
        <div style={{postion:"left",height:"800px",width:"700px"}}>
                    <NavSideBarComponent />
            <MainContainer className="main-content-card">
               <ChatContainer className="notifications-content">
                <MessageList
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
            )}
        </div>
    )
}
export default chatbox