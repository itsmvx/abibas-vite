import {animated} from "@react-spring/web";
import {useContext} from "react";
import storeContext from "../StoreContext.jsx";

export const StoreSearchbar = () => {
    const {
        sidebarRef,
        sidebarAnimation
    } = useContext(storeContext)

    return (
        <>
            <animated.div ref={sidebarRef} style={sidebarAnimation} className="hidden fixed top-[15.1vh] bottom-0 left-0 w-full h-full bg-white overflow-hidden z-20">
                <button className="absolute flex items-center justify-center top-1 right-3 text-base">
                    Close <i className="bi bi-x text-3xl"></i>
                </button>
                <form className="relative w-full h-auto mt-10 flex flex-row justify-between items-center">
                    <input type="text"
                           className="w-1/2 h-full py-2 outline-none border-b-2 border-black tracking-wide"
                           placeholder="Search something..."
                    />
                    <div className="">

                    </div>
                </form>
            </animated.div>
        </>
    )
}