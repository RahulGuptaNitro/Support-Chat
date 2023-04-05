import sendmsg from "./SendMsg";

//Send message on clicking Enter
export default function handleEnter(event,chatID,msg,setMsg,headers){
    if (event.key==="Enter")
      sendmsg(chatID,msg,setMsg,headers)
}