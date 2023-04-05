import styled from "@emotion/styled";

export const Main = styled.div`
    background: ${p=>p.background?p.background:"white"};
    height: ${p=>p.height?p.height:"100vh"};
    width: ${p=>p.width?p.width:"100vw"};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    `