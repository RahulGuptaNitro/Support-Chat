import { useNavigate } from "react-router-dom";

//To logout user
export default function logout(navigate,socket){
    //Session clearing
    sessionStorage.clear();
    //Closing Socket
    socket.close();
    //Navigating to login page
    navigate("/")

}
