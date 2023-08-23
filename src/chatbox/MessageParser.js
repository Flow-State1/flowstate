// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    parse(message) {
      // console.log(message)
      const lowercase=message.toLowerCase();
      const greetings = [
        "hello",
        "hi",
        "good morning",
        "good afternoon",
        "hey",
        "good evening",
      ];
      const endings = [
        "no thank you",
        "bye",
        "see you later",
        "good night",
        "till next time",
        "thanks",
        "thank you",
        "thank",
      ];

      if (lowercase.includes(greetings)){
       this.actionProvider.helloWorldHandler()//coming from the action provider 
      } 
      if(lowercase.includes("settings")){
        this.actionProvider.inAppqsHandler();
      }
    }
  }
  
  export default MessageParser;
  //  new MessageParser(actionProvider,state)   