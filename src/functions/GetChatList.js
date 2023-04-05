import axios from "axios";

//To get all the chats of signed in user
export default function getChatList(headers,setChatList,setChatListCopy){
    axios.get("https://api.chatengine.io/chats/",{headers:headers})
    .then((res)=>{
        setChatList(res.data);
        setChatListCopy(res.data)
    })
  }
  