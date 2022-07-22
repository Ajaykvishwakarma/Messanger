
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../Navbar/Navbar";
import { Chattingpage } from "../Chatting/Chatting";
import { Navigate } from "react-router-dom";
import './Home.css';

export const Home = () => {

    const { user, loading, error } = useSelector((store) => store.user);
    const { chatting } = useSelector((store) => store.chatting)


    if(!user._id) {
      return <Navigate to={'/login'} />
    }

    return (
      <div style={{background:"white"}}>
        <div className="home_cont">
            <Navbar />
            {chatting._id ? <Chattingpage /> : <MessageStarter {...user} />}
        </div>
        </div>
    )
}
const MessageStarter = ({ avatar, name }) => {
    return (
      <div className="chattingpage start_msg">
        <div>
          <Avatar src={avatar} sx={{ width: 70, height: 70 }} />
          <h3>Welcome, {name}</h3>
          <p>Please select a chat to start messaging.</p>
        </div>
      </div>
    );
  };