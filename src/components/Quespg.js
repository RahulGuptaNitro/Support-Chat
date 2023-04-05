import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ques } from '../constants/questions'
import { MsgList } from '../emotion_files/MessageScreen_emotion'
import { ReceivedMsg, ReceivedText, SentMsg, SentText } from '../emotion_files/Message_emotion'
import scrollToBottom from '../functions/BottomScroll'
import createChat from '../functions/CreateChat'

const Quespg = (props) => {

  const {headers,setChatList,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,setChatNav,setMsgList,setLastRead,setChatListCopy}=props

  const [lastMsg,setLastMsg]=useState("")

  const [msgs,setMsgs]=useState([])
  
  const messagesEndRef = useRef(null)
  
  //useEffect for automatically scrolling chats to bottom
  useEffect(() => {
    scrollToBottom(messagesEndRef)
  }, [msgs]);

  function Addmsg(x){
    setLastMsg(lastMsg=>{
      return x[0]
    })
    const sent=<SentMsg>
        <SentText>{x[0]}</SentText>
    </SentMsg>
    const newmsg=<ReceivedMsg><ReceivedText fdirection={"column"}>{
        addlist(x)
    }
    </ReceivedText></ReceivedMsg>
    setMsgs(msgs=>[...msgs,sent,newmsg])
  }

  function addlist(x){
    if (typeof(x[1][1])!=="string"){
        return x[1].map((y)=>{
            return <p><Button variant="contained" style={{width:"20vw",background:"white",color:"grey"}} size={"small"} onClick={()=>Addmsg(y)}>
                {y[0]}
            </Button></p>
        })
    }
    else{
      return <><p><b>Steps to follow: </b></p>
        <ul>
            {x[1].map((y)=><li>{y}</li>)}
        </ul>
        <p>
          <Button variant="contained" style={{width:"-webkit-fill-available",background:"white",color:"grey"}} size={"small"} onClick={()=>
          createChat(headers,setChatList,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,setChatNav,setMsgList,setLastRead,setChatListCopy,setLastMsg)
          }>
            Talk to Customer Executive
          </Button>
        </p>
        </>
    }
  }

  return (
    <MsgList height={"100vh"}>
      <ReceivedMsg>
        <ReceivedText fdirection={"column"}>{
          ques.map((x)=>{
              return <p><Button variant="contained" style={{width:"20vw",background:"white",color:"grey"}} size={"small"} onClick={()=>Addmsg(x)}>
                  {x[0]}
              </Button></p>
          })}
        </ReceivedText>
      </ReceivedMsg>
      {msgs && msgs.map((x)=>x)}
      <div ref={messagesEndRef} />
    </MsgList>
  )
}

export default Quespg