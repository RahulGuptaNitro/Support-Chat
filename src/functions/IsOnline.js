import axios from "axios"


//To Check if user is online
export default function isOnline(setChatID,userName,setActive,headers){
    setChatID(chatID=>{
      axios.get(`https://api.chatengine.io/chats/${chatID}/people/`,{headers:headers})
      .then((res)=>{
        const people=res.data
        //Storing last read of other user from list of both users
        people.map((x)=> x.person.username!==userName && setActive(x.person.is_online))
      })
      return chatID
    })
  }