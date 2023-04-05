import styled from "@emotion/styled";

export const Sidediv= styled.div`
    height:${p=>p.height?p.height:"100vh"};
    width: ${p=>p.width?p.width:"25vw"};
    background: ${p=>p.background?p.background:"white"};
    position:relative;
    gap: 5%;
    z-index: 1;
    box-shadow: 2px 0px 0px 0px lightgrey;
`