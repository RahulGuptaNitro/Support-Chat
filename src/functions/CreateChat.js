import axios from "axios";
import getmsglist from "./GetMessages";

//Creating chat room if user is not satisfied with predefined solution and wants to chat to executive
export default function createChat(headers,setChatList,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,setChatNav,setMsgList,setLastRead,setChatListCopy,setLastMsg){
  let title="" 
  setLastMsg(prev=>title=prev)
    //Defining other user as agent and title as Date in miliseconds (Ticket Id)
    const createdata={
      "usernames": ["agent"],
      "title": `${title}- ${new Date().getTime()}`,
      "is_direct_chat": false
    } 

    //Creates chat room
    axios.put("https://api.chatengine.io/chats/",createdata,{headers:headers})
    .then((res)=>{
      //Adding recent chat to chatlist without calling api to get whole Chat list
      setChatList(chatList=>[...chatList,{"id":res.data.id,"title":res.data.title,"access_key":res.data.access_key}]);
      //Adding recent chat to chatlist copy
      setChatListCopy(chatListCopy=>[...chatListCopy,{"id":res.data.id,"title":res.data.title,"access_key":res.data.access_key}]);
      //Get message list to open newly created chat
      getmsglist(res.data.id,res.data.title,0,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,headers,setChatNav,setMsgList,setLastRead)
    })
}
