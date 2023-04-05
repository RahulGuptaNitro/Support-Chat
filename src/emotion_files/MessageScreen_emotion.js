import styled from "@emotion/styled";

export const MsgNav = styled.div`
    width:75vw;
    height: 9vh;
    display: flex;
    align-items: center;
    background: rgb(79,91,93);
    color: white;
    z-index: 2;
`

export const MsgList = styled.div`
    width: 71vw;
    padding-left: 2vw;
    padding-right: 2vw;
    height: ${p=>p.height?p.height:"83vh"};
    overflow: auto;
`

export const NavTitle = styled.div`
    width: 21vw;
    padding-left: 2vw;
    padding-right: 2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export const NavTyping = styled.div`
    padding-left: 35vw;
    padding-right: 10vw;
`