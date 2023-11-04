import {HomeNavbar} from "../components/HomeFragments/HomeNavbar.jsx";
import {BrowserView, MobileView} from "react-device-detect";
import {HomeViewWeb} from "../components/HomeViewWeb.jsx";
import {HomeViewMobile} from "../components/HomeViewMobile.jsx";

export const HomePage = () => {
    return (
        <>
            <HomeNavbar/>

            <BrowserView>
                <HomeViewWeb/>
            </BrowserView>
            <MobileView>
                <HomeViewMobile/>
            </MobileView>
        </>
    )
}