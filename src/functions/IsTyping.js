import axios from "axios"

//To check if user is typing
export default function typing(chatID,headers,typingStatus,setTypingStatus){
    if (typingStatus){
        setTypingStatus(false)
        axios.post(`https://api.chatengine.io/chats/${chatID}/typing/`,{},{headers:headers})
        setTimeout(()=>{
            setTypingStatus(true)
        },3000)
    }
}