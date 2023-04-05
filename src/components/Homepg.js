import { Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {Logout, Send, Add, DoneAll, Done} from '@mui/icons-material';
import { ChatDiv, MsgDiv } from '../emotion_files/Chatdiv_emotion'
import { AddDiv, ChatList, ChatNav, SearchBar } from '../emotion_files/ChatScreen_emotion'
import { Main } from '../emotion_files/Main_emotion'
import { MsgList, MsgNav, NavTitle, NavTyping } from '../emotion_files/MessageScreen_emotion'
import { ReceivedMsg, ReceivedText, RecTimeDiv, SeenText, SentMsg, SentText, SentTimeDiv, } from '../emotion_files/Message_emotion'
import { Sidediv } from '../emotion_files/Sidediv_emotion'
import { NewScreen, NewScreenDiv } from '../emotion_files/NewScreen';
import '../styles/homepg.css'
import Quespg from './Quespg';
import classNames from 'classnames';
import logout from '../functions/Logout';
import handleEnter from '../functions/HandleEnter';
import sendmsg from '../functions/SendMsg';
import scrollToBottom from '../functions/BottomScroll';
import typing from '../functions/IsTyping';
import getChatList from '../functions/GetChatList';
import newChatCreate from '../functions/NewQuery';
import addData from '../functions/AddData';
import getmsglist from '../functions/GetMessages';
import searchChat from '../functions/SearchChat';
import { useNavigate } from 'react-router-dom';

let socket;

const Homepg = () => {

  //Constants
  const [msg, setMsg] = useState("")
  const userName=sessionStorage.getItem("userName")
  const userPass=sessionStorage.getItem("userPass")
  const [msgList, setMsgList] = useState([])
  const [chatID, setChatID] = useState("")
  const [chatList, setChatList] = useState([])
  const [chatListCopy, setChatListCopy] = useState([])
  const [active, setActive] = useState(false)
  const [chatNav, setChatNav]=useState(false)
  const [typingStatus, setTypingStatus]=useState(true)
  const [typingShow, setTypingShow]=useState(false)
  const [lastRead, setLastRead]=useState(0)
  const messagesEndRef = useRef(null)
  const [chatTitle, setChatTitle]=useState("Name")
  const [newChat, setNewChat]=useState(false)
  const [activeChatIndex, setActiveChatIndex] = useState(-1)
  const navigate=useNavigate()
  // const userName=useSelector(state=>state.user.data.username)
  // const userPass=useSelector(state=>state.user.pass)

  //Header to be passed while POST
  const headers = {
    "Project-ID":"b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf",
    "User-Name":userName,
    "User-Secret":userPass
  }

  useEffect(()=>{
    if (!userName){
      logout(navigate,socket);
    }
    createSocket()
    getChatList(headers,setChatList,setChatListCopy)
  },[])

  //useEffect for automatically scrolling chats to bottom
  useEffect(() => {
    scrollToBottom(messagesEndRef)
  }, [msgList]);
  
  //WebSocket creation and handling events on it
  function createSocket(){

    socket = new WebSocket(
      `wss://api.chatengine.io/person/?publicKey=b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf&username=${userName}&secret=${userPass}`
    );

    //Retrieving events from other user by websocket
    socket.onmessage = (event) => {
      const parsedData=JSON.parse(event.data)
      const action=parsedData?.action
      const id=parsedData?.data?.id
      if (action==="new_chat"){
        //If new chat is created chatlist will be updated
        getChatList(headers,setChatList,setChatListCopy)
      }
      else if(action==="is_typing"){
        //If other user is typing show typing on message nav
        const person=parsedData?.data?.person
        if (person!==userName){
          setChatID(chatID=>{
            if (chatID===id){
              setTypingShow(true)
              setTimeout(()=>{
                setTypingShow(false)
              },3000)
            }
            return chatID
          })
        }
      }
      else{
        const data=parsedData?.data?.message?.text
        const user=parsedData?.data?.message?.sender_username
        const msgid=parsedData?.data?.message?.id
        if (data!==undefined){
          //Handling message view on screen by updating msgList
          addData(user,data,id,msgid,setChatID,headers,userName,setLastRead,setMsgList);
        }
        else{
          //Handling last read directly by websocket
          const people=parsedData?.data?.people
          setChatID(chatID=>{
            if (chatID===id){
              //Storing last read of other user from list of both users
              people.map((p)=> p.person.username!==userName && setLastRead(p.last_read));
            }
            return chatID
          })
        }
      }
    };
  }

  return (
    <Main>
      <Sidediv>
        <ChatNav>
          <SearchBar>
            <h2 style={{fontFamily:"Copperplate"}}>Support Chat</h2>
            <Button variant="contained" style={{backgroundColor:"rgb(36,164,194)",height:"7vh"}}  size={"small"} onClick={()=>logout(navigate,socket)}>
              <Logout/>
            </Button>
          </SearchBar>
          <TextField 
            type="Search" 
            size={"small"} 
            style={{width:"20vw",background:"white"}} 
            onChange={(event)=>searchChat(event.target.value,setChatList,setChatListCopy)}
            placeholder="Search"/>
        </ChatNav>
        <ChatList>
          {chatList && chatList.map((chats,i)=><>
            <ChatDiv key={i} onClick={()=>{
              getmsglist(chats.id,chats.title,i,chatNav,setChatID,setNewChat,setChatTitle,setActiveChatIndex,userName,setActive,headers,setChatNav,setMsgList,setLastRead)
            }} 
            className={classNames({
              'chat':true,
              'activechat': activeChatIndex===i
            })}>
              {chats.title}
            </ChatDiv>
            </>
          )}
        </ChatList>
        <AddDiv>
          {userName!=="agent" && <Button variant="contained" style={{height:"7vh",backgroundColor:"rgb(79,91,93)"}}  size={"small"} onClick={()=>newChatCreate(setChatNav,setNewChat)}>
            <Add/>
          </Button>}
        </AddDiv>
      </Sidediv>
      <MsgDiv>
        {chatNav && <MsgNav>
          <NavTitle>
            <h4>{chatTitle}</h4>
            {active? <h5>Online</h5>: <h5>Offline</h5>}
          </NavTitle>
          <NavTyping>{typingShow && <h5>Typing...</h5>}</NavTyping>
        </MsgNav>}
        {newChat && <Quespg 
          headers={headers} 
          setChatList={setChatList} 
          chatNav={chatNav} 
          setChatID={setChatID}
          setNewChat={setNewChat}
          setChatTitle={setChatTitle}
          setActiveChatIndex={setActiveChatIndex}
          userName={userName}
          setActive={setActive}
          setChatNav={setChatNav}
          setMsgList={setMsgList}
          setLastRead={setLastRead}
          setChatListCopy={setChatListCopy}
        />}
        {!newChat && <MsgList>
          {!chatNav && !newChat && <NewScreen>
            <NewScreenDiv><h3>Select old chat OR Create new chat</h3></NewScreenDiv>
          </NewScreen>}
          {msgList && msgList.map((x,i)=>{
              if (x.sender_username===userName)
                return <SentMsg key={i}><SentText>
                    {x.text}
                    <SentTimeDiv>
                        {new Date(x.created).getMinutes()<10
                        ?new Date(x.created).getHours()+":0"+new Date(x.created).getMinutes()
                        :new Date(x.created).getHours()+":"+new Date(x.created).getMinutes()}
                      </SentTimeDiv>
                      {x.id<=lastRead
                      ?<SeenText><DoneAll color='primary' fontSize='8px'/></SeenText>
                      :<SeenText><DoneAll fontSize='8px'/></SeenText>
                      }
                  </SentText></SentMsg>
              else
                return <ReceivedMsg key={i}>
                    <ReceivedText>{x.text}
                      <RecTimeDiv>
                        {new Date(x.created).getMinutes()<10
                        ?new Date(x.created).getHours()+":0"+new Date(x.created).getMinutes()
                        :new Date(x.created).getHours()+":"+new Date(x.created).getMinutes()}
                      </RecTimeDiv>
                    </ReceivedText>
                  </ReceivedMsg>
          })}
          <div ref={messagesEndRef} />
          </MsgList>}
          {chatNav && 
          <>
            <TextField style={{width:"90%"}} 
              size={"small"} 
              onChange={(event)=>{
                typing(chatID,headers,typingStatus,setTypingStatus);
                setMsg(event.target.value);
              }} 
              onKeyDown={(event)=>handleEnter(event,chatID,msg,setMsg,headers)}
              value={msg}
              placeholder="Type your text here..."/>
            <Button variant="contained" style={{backgroundColor:"rgb(79,91,93)"}} onClick={()=>sendmsg(chatID,msg,setMsg,headers)}>
              <Send/>
            </Button>
          </>}
      </MsgDiv>
    </Main>
  )
}

export default Homepg