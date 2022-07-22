import { Routes, Route } from "react-router-dom";
import { Login } from '../Auth/Login';
import { Register } from '../Auth/Registration';
import { NotFound } from "../NotFound/NotFound";
import { Sidebar1 } from '../Sidebar/Sidebar'

export const AllRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Sidebar1 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    )
}