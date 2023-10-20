import PropTypes from 'prop-types';
import {isMobile, useMobileOrientation} from "react-device-detect";
import {useEffect, useState} from "react";
import {useSpring, animated} from "@react-spring/web";

export const Navbar = ({userPreferences, setUserPreferences}) => {
    const [isScrollDownState, setIsScrollDownState] = useState(false)
    const [searchTextValue, setSearchTextValue] = useState('')
    const navbarAnimation = useSpring({
        transform: isScrollDownState ? 'translateY(-100%)' : 'translateY(0%)',
        config: {
            duration: 225
        }
    })

    const handleSearchTextChange = event => {
        event.target.value === '' ? setSearchTextValue(event.target.value) : setSearchTextValue(event.target.value)
    }
    const handleSearchTextReset = () => {
        setSearchTextValue('')
    }

    console.log('search',searchTextValue)
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const smallDevices = userPreferences && isMobile
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            (currentScrollY > 80) && !smallDevices && currentScrollY > lastScrollY ? setIsScrollDownState(true) : setIsScrollDownState(false)
            
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <animated.nav style={navbarAnimation} className={`${!((isMobile && !useMobileOrientation) || userPreferences.smallWindow) ? 'h-[15vh]' : 'h-[10vh]'} w-full h-[15vh] bg-white flex flex-row fixed top-0 left-0 z-50`}>
                { (isMobile && !useMobileOrientation || userPreferences.smallWindow ) && (
                    <button className="basis-1/6 w-full flex-none flex items-center justify-center ">
                        <i className="bi bi-list text-2xl"></i>
                    </button>
                )}
                <div className="basis-2/5 sm:basis-[15%] w-full flex-1 flex flex-row items-center justify-center">
                    <img
                        // src="/src/assets/abibas-logo.webp"
                        src="https://cdn.discordapp.com/attachments/1104037318521798746/1165044484166385754/abibas-logo.webp?ex=65456b3a&is=6532f63a&hm=f4a9a5361de75526e40785f186111e4d3af0ce76133bccf0f972ee00304aae02&"
                        className="w-12 sm:w-14"
                        alt="..."/>
                    <h1 className="mt-2 font-breston font-bold text-3xl">ABIBAS</h1>
                </div>
                <div className="basis-1/6 sm:basis-[40%] w-full sm:flex-1 flex flex-row sm:flex-col">
                    { !((isMobile && !useMobileOrientation) || userPreferences.smallWindow) && (
                        <ul className="basis-1/2 flex flex-row justify-end gap-x-5 text-sm text-slate-600 font-sans mt-0.5 mr-3">
                            <li>
                               <a href="/">Berita</a>
                            </li>
                            <li>
                               <a href="/">Tentang Kami</a>
                            </li>
                            <li>
                               <a href="/">Bantuan</a>
                            </li>
                        </ul>

                    )}

                    <div className={"basis-1/2 flex-1 sm:flex-none flex flex-row justify-center sm:justify-end items-center"}>
                        { !((isMobile && !useMobileOrientation) || userPreferences.smallWindow) && (
                            <div className="basis-1/3 font-semibold font-breston flex-none flex flex-row sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
                                <a href="/" className="sm:ml-2 md:ml-6 ml-10 hover:underline underline-offset-4 decoration-4">
                                    <h2>PRIA</h2>
                                </a>
                                <a href="/" className="hover:underline underline-offset-4 decoration-4">
                                    <h2>WANITA</h2>
                                </a>
                                <a href="/" className="hover:underline underline-offset-4 decoration-4">
                                    <h2>ANAK</h2>
                                </a>
                            </div>
                        )}

                        <div className="basis-2/3 flex-1 flex flex-row justify-end sm:justify-end w-full h-full">

                            { !((isMobile && !useMobileOrientation) || userPreferences.smallWindow) && (
                                <div className="basis-1/2 relative w-full border-[1.5px] border-black rounded-md overflow-hidden antialiased ">
                                    <input
                                        type="text"
                                        value={searchTextValue}
                                        className="w-full h-full bg-zinc-100 focus:outline-0 text-sm font-medium indent-2"
                                        placeholder="ABIBAS Ori Cibaduyut"
                                        onInput={handleSearchTextChange}
                                    />
                                    { searchTextValue !== '' ? (
                                        <button
                                            className="absolute right-1 top-1/2 -translate-y-1/2"
                                            onClick={handleSearchTextReset}
                                        >
                                            <i className="bi bi-x-circle"></i>
                                        </button>
                                        )
                                        : '' }
                                </div>

                            )}
                            <button className="basis-2/12 text-2xl mx-auto sm:mx-0 fill-none">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </animated.nav>

            <animated.div className="fixed mt-20 top-0 left-0 w-full h-96 bg-slate-50 hidden">

            </animated.div>
        </>
    )
}

Navbar.propTypes = {
    userPreferences: PropTypes.object,
    setUserPreferences: PropTypes.func,
}