import React, { useState } from "react";
import style from './Auth.module.css';
import logo from './logo.png';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate, Navigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../Redux/Auth/action";


export const Login = () => {

    const { user, loading, error } = useSelector((store) => store.user);
    const userInfo = localStorage.getItem('userInfo')

    const navigate = useNavigate()

    const [regData, setRegData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRegData({ ...regData, [name]: value });
    };

    const handleSubmit = () => {
        const url = "https://mateed.herokuapp.com/auth/login";
        dispatch(authRegister(url, regData));
      };
      

      function logout(){
        localStorage.removeItem('userInfo')
    
        alert("Signing out Successfully!")
        navigate('/register')
    }

    return (
        <div className={style.register_cont}>
         <div className={style.auth_cont}>
            <div>
                <h2 className={style.auth_heading}>Welcome To Mateed</h2>
                <h5 className={style.auth_heading}>Login</h5>

                <div className={style.details_cont}>
                <p>Email</p>
                <input name="email" onChange={handleChange} className={style.inputcom} />

                <p>Password</p>
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    className={style.inputcom}
                />

                {loading ? (
                    <ColorButton disabled>
                    <CircularProgress style={{ color: "white" }} />
                    </ColorButton>
                ) : (
                    <>
                    <ColorButton onClick={handleSubmit}>Continue</ColorButton>
                    { userInfo ? <ColorButton onClick={logout}>Logout</ColorButton> : ""}
                    </>
                )}

                <Link className={style.auth_link} to={"/login"}>
                    Forgot your password?
                </Link>
                <p className={style.contract}>
                    Create an account ?
                    <Link className={style.auth_link} to={"/register"}>
                    Register
                    </Link>
                    ?
                    <Link className={style.auth_link} to={"/"}>
                    Home
                    </Link>
                </p>
                </div>
            </div>
         </div>
        </div>  
    )


};

export const ColorButton = styled(Button)(() => ({
    color: "white",
    fontSize: "20px",
    textTransform: "none",
    backgroundColor: "#01d401",
    "&:hover": {
      backgroundColor: "#3a45c3",
    },
  }));