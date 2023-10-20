import PropTypes from 'prop-types';
import {isMobile, useMobileOrientation} from "react-device-detect";
import {useEffect, useState} from "react";
import {useSpring, animated} from "@react-spring/web";

export const Navbar = ({userPreferences, setUserPreferences}) => {
    const [isScrollDown, setIsScrollDown] = useState(false)
    const navbarAnimation = useSpring({
        transform: isScrollDown ? 'translateY(-100%)' : 'translateY(0%)',
        config: {
            duration: 225
        }
    })

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const smallDevices = userPreferences && isMobile
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            (currentScrollY > 80) && !smallDevices && currentScrollY > lastScrollY ? setIsScrollDown(true) : setIsScrollDown(false)
            
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <animated.nav style={navbarAnimation} className="w-full h-20 bg-white flex flex-row fixed top-0 left-0">
                { (isMobile && !useMobileOrientation || userPreferences.smallWindow ) && (
                    <button className="basis-1/6 w-full flex-none flex items-center justify-center ">
                        <i className="bi bi-list text-2xl"></i>
                    </button>
                )}
                <div className="basis-2/5 sm:basis-[15%] w-full flex-1 flex flex-row items-center justify-center">
                    <img src="/src/assets/img/abibas-logo.webp"
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

                        <div className="basis-2/3 flex-1 flex sm:justify-end w-full h-full">
                            <button className="text-2xl mx-auto sm:mr-3.5">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </animated.nav>

            <animated.div className="fixed mt-20 top-0 left-0 w-full h-96 bg-slate-50">

            </animated.div>
        </>
    )
}

Navbar.propTypes = {
    userPreferences: PropTypes.object,
    setUserPreferences: PropTypes.func,
}