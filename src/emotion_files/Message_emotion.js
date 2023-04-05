import styled from "@emotion/styled";

export const SentMsg = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 71vw;
`

export const ReceivedMsg = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 71vw;
`

export const ReceivedText = styled.div`
    background: ${p=>p.background?p.background:"rgb(240,240,240)"};
    max-width: 65%;
    min-width: 4%;
    display:flex;
    flex-wrap:wrap;
    padding: 1vw;
    border-radius: 3px 10px 15px 10px ;
    margin-top:1vh;
    margin-bottom:1vh; 
    width: fit-content;
    position: relative;
    text-align: left;
    flex-direction: ${p=>p.fdirection?p.fdirection:"row"};
`

export const SentText = styled.div`
    background: ${p=>p.background?p.background:"rgb(230,247,252)"};
    max-width: 65%;
    min-width: 4%;
    width: fit-content;
    display:flex;
    position:relative;
    flex-wrap:wrap;
    padding: 1vw;
    border-radius: 10px 3px 10px 15px;
    margin-top: 1vh;
    margin-bottom:1vh;
    text-align: left;
`

export const SentTimeDiv = styled.div`
    position: absolute;    
    font-size: 60%;
    bottom: 4px;
    right: 22px;
    color: #272222;
`

export const RecTimeDiv = styled.div`
    position: absolute;    
    font-size: 60%;
    bottom: 3px;
    right: 6px;
    color: #272222;
`

export const SeenText = styled.div`
    position: absolute;
    bottom: -2px;
    right: 3px;
`