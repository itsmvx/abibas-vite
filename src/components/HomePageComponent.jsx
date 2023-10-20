import {Navbar} from "../fragments/Navbar.jsx";
import PropTypes from "prop-types";
import {isMobile, useMobileOrientation} from "react-device-detect";

export const HomePageComponent = ({userPreferences, setUserPreferences}) => {

    return (
        <>
            <Navbar
                userPreferences={userPreferences}
                setUserPreferences={setUserPreferences}
            />
            <div className={`flex ${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'flex-row mt-[15vh] h-[85vh]' : 'flex-col mt-[10vh] h-[90vh]'} w-full  bg-cyan-500`}>
                <div className={`${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'order-first' : 'order-last'} basis-[45%] w-full h-full bg-white flex flex-col`}>
                    <div className={`${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'basis-1/3' : 'basis-1/5'} flex items-center justify-center w-full h-full flex-none`}>
                        <h1 className="text-center text-4xl md:text-6xl text-black font-bold tracking-tighter mx-3">
                            Kurodate Haruna Series
                        </h1>
                    </div>
                    <div className={`${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'basis-2/3' : 'basis-4/5' }`}>
                        <div className={`relative h-full overflow-hidden text-ellipsis mx-5`}>
                            <div className="w-full h-3/4 text-justify tracking-tight leading-relaxed overflow-hidden">
                                <p className="text-center text-lg font-bold">
                                    READY! SET GO!!
                                </p>
                                <p className="indent-8">
                                    She looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.
                                </p>
                            </div>
                            <button className={`absolute ${((isMobile && !useMobileOrientation) || userPreferences.smallWindow) && 'left-1/2 -translate-x-1/2' } top-3/4 px-1.5 h-12 font-semibold bg-black text-white`}>
                                SEE GALLERIES <i className="bi bi-caret-right"></i>
                            </button>
                        </div>
                        <div className={`${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'basis-1/2' : 'basis-1/4'} basis-1/2 flex-none flex items-start`}>

                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full h-full bg-white">
                    <div className="mx-auto my-10 aspect-[4/3] w-[90%] rounded-md overflow-hidden">
                        <img
                            // src="/src/assets/haruna-banner.webp"
                            src="https://cdn.discordapp.com/attachments/1104037318521798746/1165044483558219776/haruna-banner.webp?ex=65456b3a&is=6532f63a&hm=070712fa5ce15bf2fffde11767cfba95ff742d1466389a46927ed3e719973077&"
                            className="w-full h-full object-cover"
                            alt="haruna-buntut"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-96 bg-blue-500">

            </div><div className="w-full h-96 bg-red-500">

        </div><div className="w-full h-96 bg-fuchsia-500">

        </div><div className="w-full h-96 bg-yellow-500">

        </div><div className="w-full h-96 bg-purple-500">

        </div>
        </>
    )
}

HomePageComponent.propTypes = {
    userPreferences: PropTypes.object,
    setUserPreferences: PropTypes.func,
}