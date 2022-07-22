import { Sidebar } from "react-responsive-sidebar";
import { MyChat } from "../MyChat/MyChat";
import { useNavigate, Navigate } from "react-router-dom";
import Content from "./Content";
import { useEffect } from "react";
export const Sidebar1 = () => {


  return (
    <>
      <div>
      <Sidebar
        breakPoint="768"
        content={[<MyChat />]}
      >
        
      </Sidebar>
      <Content />
      </div>
    </>
  );
}