import axios from "axios";

//Message list update through socket without api calling (was called from socket.onmessage)
export default function addData(usern,usermsg,id,msgid,setChatID,headers,userName,setLastRead,setMsgList){
    let currID=""
    setChatID(chatID=>{
      currID=chatID
      //Only update if currently opened chat id is equal to id from socket
      if (currID===id){
        axios.patch(`https://api.chatengine.io/chats/${chatID}/people/`,{"last_read":msgid},{headers:headers})
        .then((res)=>{
          //Storing last read of other user from list of both users
          res.data.people.map((p)=> p.person.username!==userName && setLastRead(p.last_read));
        })
        const date=new Date()
        const tempjson={"sender_username":usern,"text":usermsg,"created":date.toString(),"id":msgid}
        setMsgList(msgList=>[...msgList,tempjson])
      }
      return currID
    })
  }
  