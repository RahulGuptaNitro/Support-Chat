import styled from "@emotion/styled";

export const FormContainer = styled.form`
    background: ${p=>p.background?p.background:"#2c2020"};
    height: ${p=>p.height?p.height:"50vh"};
    width: ${p=>p.width?p.width:"40vw"};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 5%;
    margin-inline: auto;
    box-shadow: 5px 5px 20px 0px #2c2020;
    padding: 10px;
    border: 1px solid #2c2020;
    border-radius: 10px;
    color: white;
`