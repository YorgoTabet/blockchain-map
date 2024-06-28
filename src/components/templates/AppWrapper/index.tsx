import { Outlet } from "@tanstack/react-router";
import React from "react";

// TODO: ADD NAVIGATION HERE
export const AppWrapper: React.FC = () => {
    return (
        <>
            THIS IS THE APP WRAPPER
            <hr />
            <Outlet />
        </>
    );
};
