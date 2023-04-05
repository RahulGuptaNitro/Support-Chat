import axios from "axios"

//To Send message
export default function sendmsg(id,msg,setMsg,headers){
    if (msg!==""){
      //If Message is not empty
      axios.post(`https://api.chatengine.io/chats/${id}/messages/`,{"text":msg},{headers:headers})
      .then((res)=>{
        setMsg("")
      })
    }
}