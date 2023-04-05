import styled from "@emotion/styled";

export const ChatDiv = styled.div`
    width: ${p=>p.width?p.width:"21vw"};
    background: ${p=>p.background?p.background:"transparent"};
    margin-left: 1vw;
    margin-right: 1vw;
    padding-left: 1vw;
    padding-block: 2vh;
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid lightgrey;
    font-weight: 600;
`

export const MsgDiv = styled.div`
    height: 100vh;
    width: ${p=>p.width?p.width:"75vw"};
    background: ${p=>p.background?p.background:"white"};
    position:relative;
`

export const Chathead =styled.div`
    background: ${p=>p.background?p.background:"black"};
`