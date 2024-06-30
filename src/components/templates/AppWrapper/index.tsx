import { Outlet } from "@tanstack/react-router";
import React from "react";

// TODO: ADD NAVIGATION HERE
export const AppWrapper: React.FC = () => {
    return (
        <>
            {/* <p style={{ position: "absolute", top: 0, height: "fit-content" }}> */}
            Puffsterz
            {/* </p> */}
            <hr />
            <div style={{ border: "1px solid red", flexGrow: 1 }}>
                <Outlet />
            </div>
        </>
    );
};
