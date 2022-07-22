import style from "./Auth.module.css";

import avatar1 from "./profile.png";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useNavigate, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, uploadPic } from "../../Redux/Auth/action";
export const Register = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
    avatar : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isAdmin: false,
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };
  
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(uploadPic(reader.result));
      // setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = () => {
    const url = "https://mateed.herokuapp.com/auth/signup";
    if (user.avatar) regData["avatar"] = user.avatar;
    dispatch(authRegister(url, regData));
  
  };
  if (user._id) {
    return <Navigate to={"/"} />;
  }
  
      return (
        <div className={style.register_cont}>
        <div className={style.auth_cont}>
            <div>
                <h2 className={style.auth_heading}>Create an account</h2>
                <div>
                <div className={style.profile_pic}>
                    <input onChange={handleInputFile} type="file" name="" id="file" className={style.files}/>
                    <label htmlFor="file" id="uploadBtn">
                    <img id={style.photo} src={user.avatar ? user.avatar : avatar1} />
                    </label>
                </div>
                <p className={style.profile_text}>Choose Profile</p>
                </div>
                <div className={style.details_cont}>
                <p>Name</p>
                <input onChange={handleChange} name="name" className={style.inputcom} />

                <p>Email</p>
                <input onChange={handleChange} name="email" className={style.inputcom} />

                <p>Password</p>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={style.inputcom}
                />

                {loading ? (
                    <ColorButton disabled>
                    <CircularProgress style={{ color: "white" }} />
                    </ColorButton>
                ) : (
                    <ColorButton onClick={handleSubmit}>Continue</ColorButton>
                )}

                <Link className={style.auth_link} to={"/login"}>
                    Already have an account
                </Link>
                <p className={style.contract}>
                    By registering you agree to Mateed's{" "}
                    <span>Terms of Service</span> and <span>Privacy Policy</span>.
                </p>
                </div>
            </div>
            </div>
        </div>
      )
};
const ColorButton = styled(Button)(() => ({
    color: "white",
    fontSize: "20px",
    textTransform: "none",
    backgroundColor: "#01d401",
    "&:hover": {
      backgroundColor: "#3a45c3",
    },
  }));