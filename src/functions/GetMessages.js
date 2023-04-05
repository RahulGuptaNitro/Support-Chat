import axios from "axios"
import isOnline from "./IsOnline"

  //To get all the messages of particular Chat Id
  //Called only once on chat creation or on clicking on previous chat 
export default function getmsglist(id,title,i,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,headers,setChatNav,setMsgList,setLastRead){
    
    //Setting Chat ID of particular chat
    setChatID(id)

    //Closing display of new chat 
    setNewChat(false)

    //Setting Chat Title
    setChatTitle(title)

    //Setting index to show active chat from chatlist
    setActiveChatIndex(i)

    //To check if user is online on particular chat id
    if (chatNav===false){
      setInterval(()=>{
        isOnline(setChatID,userName,setActive,headers)
      },3000)
      setChatNav(true)
    }

    //API to get all the messages of particular chat
    axios.get(`https://api.chatengine.io/chats/${id}/messages/`,{headers:headers})
    .then((res)=>{
      const msgdata=res.data
      
      //Setting new message list
      setMsgList(prev=>prev=msgdata)

      //Updating last read on opening chat
      if (msgdata.length){
        axios.patch(`https://api.chatengine.io/chats/${id}/people/`,{"last_read":msgdata[msgdata.length-1].id},{headers:headers})
        .then((res)=>{
          res.data.people.map((p)=> p.person.username!==userName && setLastRead(p.last_read));
        })
      }
    })

  }
