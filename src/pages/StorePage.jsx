import {BrowserView} from "react-device-detect";
import {StoreViewWeb} from "../components/StoreViewWeb.jsx";

export const StorePage = () => {
    return (
        <>
           <BrowserView>
               <StoreViewWeb/>
           </BrowserView>
        </>
    )
}