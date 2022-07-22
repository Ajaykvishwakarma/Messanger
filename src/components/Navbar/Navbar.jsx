import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChatIcon from '@mui/icons-material/Chat';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { CustomizedDialogs } from "../GroupMode/GroupMode";
import './Navbar.css';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LoginIcon from '@mui/icons-material/Login';
export const Navbar = () => {

    const { user, loading, error } = useSelector((store) => store.user)


    return (
    
        <div className="side-nav">
        <div >
          <Avatar src={user.pic} className="user-avatar" />
        </div>
        <div className="mid-icon">
          <LightTooltip title="Chats" placement="right">
           <ChatIcon />
          </LightTooltip>
          <LightTooltip placement="right" title="Settings">
             <SettingsOutlinedIcon />
          </LightTooltip>
          <CustomizedDialogs />
          <LightTooltip placement="right" title="Contacts">
            <PermContactCalendarIcon />
          </LightTooltip>
          <LightTooltip placement="right" title="Signin/Signup">
           
            <Link to="/login" style={{color:"gray"}}><LoginIcon /></Link>
          </LightTooltip>
        </div>
        <div className="bottom-icon">
          <LightTooltip placement="right" title="Dark/Light Mode">
            <InvertColorsIcon />
          </LightTooltip>
        </div>
      </div>
    )
};

export const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "black",
      color: "white",
      fontSize: 13,
    },
  }));