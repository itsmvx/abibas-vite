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
            <div className={`mt-[15vh] flex ${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'flex-row' : 'flex-col'} w-full h-[85vh] bg-cyan-500`}>
                <div className="basis-[45%] w-full h-full bg-white flex flex-col">
                    <div className="basis-1/3 flex items-center justify-center w-full h-full flex-none">
                        <h1 className="text-center text-6xl text-black font-bold tracking-tighter mx-3">
                            Kurodate Haruna Series
                        </h1>
                    </div>
                    <div className="basis-2/3 flex flex-col">
                        <div className="basis-1/2 flex-none mx-5  text-lg text-justify tracking-tight leading-relaxed overflow-y-hidden">
                            <p className="text-center font-bold">
                                READY! SET GO!!
                            </p>
                            <p className="indent-8">
                                She looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.
                            </p>

                        </div>
                        <div className="basis-1/2 flex-none flex items-start">
                            <button className="mx-5 mt-7 px-2 h-12 font-semibold bg-black text-white">
                                SEE GALLERIES <i className="bi bi-caret-right"></i>
                            </button>
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