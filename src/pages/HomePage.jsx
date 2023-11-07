import {HomeNavbar} from "../components/HomeComponents/HomeNavbar.jsx";
import {HomeViewWeb} from "../components/HomeViewWeb.jsx";
import {useEffect} from "react";

export const HomePage = () => {
    useEffect(() => {
        return ()=>{
            document.title = 'Abibas : Home'
        }
    }, []);
    return (
        <>
            <HomeNavbar/>
            <HomeViewWeb/>
        </>
    )
}