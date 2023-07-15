import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUserDataAsync } from "../redux/Slice/loginSlice";
import {useEffect} from 'react'

export const ProductedRouteEmployee = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.login.loggedInUserData);
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    },[dispatch])
    if (!user) {
        return <Navigate to="/login" />;
    }else if(user && user.employee){
        return <>{children}</>
    }
    else{
        return <Navigate to="/login" />;
    }

     // Wrapping children with empty fragment to avoid wrapping issue
}