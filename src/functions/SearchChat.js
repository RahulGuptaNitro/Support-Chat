
//To search (filter) chats from chat list
export default function searchChat(val,setChatList,setChatListCopy){
    console.log(val)
    setChatListCopy(chatListCopy=>{
      setChatList(chatList=>chatListCopy.filter((chats)=>{
        return chats.title.toLowerCase().includes(val.toLowerCase())
      }))
      return chatListCopy
    })
  }