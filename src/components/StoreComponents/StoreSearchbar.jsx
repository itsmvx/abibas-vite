import {animated} from "@react-spring/web";
import { useContext} from "react";
import storeContext from "./StoreContext.jsx";

export const StoreSearchbar = () => {
    const {
        searchbarRef,
        handleSearchClose,
        searchbarAnimation
    } = useContext(storeContext)
    return (
        <>
            <animated.div ref={searchbarRef} style={searchbarAnimation} className="hidden block fixed top-[10vh] md:top-[15.1vh] left-0 w-full min-h-screen bg-white overflow-y-scroll z-20">
                <button onClick={handleSearchClose}
                    className="absolute flex items-center justify-center top-1 right-3 text-base">
                    Close <i className="bi bi-x text-3xl"></i>
                </button>
                <form className="relative w-full h-auto mt-10 flex flex-row justify-center items-center">
                    <div className="relative w-1/2 h-full py-2">
                        <input type="text"
                               className="w-full h-full py-2 outline-none border-b-2 border-black tracking-wide"
                               placeholder="Search something..."
                        />
                        <button type="submit" className="absolute -right-10 top-2 w-10 h-10">
                            <i className="bi bi-search text-xl"></i>
                        </button>
                    </div>

                    <div className="">

                    </div>
                </form>
            </animated.div>
        </>
    )
}