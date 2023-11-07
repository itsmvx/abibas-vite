import {useEffect, useState} from "react";
import {useSpring, animated} from "@react-spring/web";
import {Link} from "react-router-dom";

export const HomeNavbar = () => {
    const [searchState, setSearchState] = useState({
        isSearching: false,
        textValue: '',
    })
    const [isScrollDownState, setIsScrollDownState] = useState(false)
    const [navMenuState, setNavMenuState] = useState({
        isHover: false,
        category: '',
    })
    const navbarAnimation = useSpring({
        transform: isScrollDownState ? 'translateY(-100%)' : 'translateY(0%)',
        config: {
            duration: 225
        }
    })
    const handleSearchTextChange = event => {
        event.target.value === '' ?
            setSearchState({
                isSearching: false,
                textValue: ''
            }) :
            setSearchState({
                isSearching: true,
                textValue: event.target.value,
            })
    }
    const handleSearchTextReset = () => {
        setSearchState({
            isSearching: false,
            textValue: ''
        })
    }
    const handleNavMenuInHover = eventValue => {
        setNavMenuState({
            isHover: true,
            category: eventValue,
        })
    }
    const handleNavMenuOutHover = () => {
        setNavMenuState({
            isHover: false,
            category: '',
        })
    }

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let isScrollUp = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 40) {
                if (currentScrollY > lastScrollY) {
                    setIsScrollDownState(true);
                    isScrollUp = false;
                    setNavMenuState({
                        isHover: false,
                        category: ''
                    })
                } else if (!isScrollUp) {
                    setIsScrollDownState(false);
                    isScrollUp = true;
                }
            }

            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, [])

    useEffect(() => {
        const handleReload = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
        handleReload()

        window.addEventListener('load', handleReload)
        return ()=> {
            window.removeEventListener('load',handleReload)
        }
    }, []);


    return (
        <>
            <animated.nav style={navbarAnimation} className="w-full h-20 bg-white flex flex-row fixed top-0 left-0 z-50 border-b-2">
                <button className="basis-2/12 sm:basis-[12%] md:hidden w-full flex-none text-2xl mx-auto ">
                    <i className="bi bi-list"></i>
                </button>
                <div className="flex-1 md:flex-none basis-8/12 sm:basis-[76%] md:basis-1/4 md:order-first flex flex-row items-center justify-center">
                    <img
                        width="413"
                        height="278"
                        src="/assets/abibas-logo.webp"
                        // src="https://cdn.discordapp.com/attachments/1104037318521798746/1165044484166385754/abibas-logo.webp?ex=65456b3a&is=6532f63a&hm=f4a9a5361de75526e40785f186111e4d3af0ce76133bccf0f972ee00304aae02&"
                        className="w-12 sm:w-14"
                        alt="..."/>
                    <a href="/" className="mt-2 font-breston font-bold text-3xl">ABIBAS</a>
                </div>
                <div className="hidden basis-3/4 md:flex md:flex-col">
                    <ul className="basis-1/4 flex flex-row justify-end gap-x-5 text-sm text-slate-600 font-sans mt-0.5 mr-3">
                        <li> <a href="/">News</a> </li>
                        <li> <a href="/">Help</a> </li>
                        <li> <a href="/">FAQ</a> </li>
                        <li> <a href="/">About Us</a> </li>
                    </ul>
                    <div className="basis-3/4 flex flex-row">
                        <ul className="flex-1 basis-auto mt-2 flex flex-row justify-center items-center gap-x-8 text-lg font-breston font-semibold ">
                            <li>
                                <a className="p-4 hover:underline underline-offset-4 decoration-4 decoration-slate-950" href="/"
                                   onMouseEnter={()=>handleNavMenuInHover('men')}
                                   onMouseLeave={handleNavMenuOutHover}
                                > MEN
                                </a>
                            </li>
                            <li>
                                <a className="p-4 hover:underline underline-offset-4 decoration-4 decoration-slate-950" href="/"
                                   onMouseEnter={()=>handleNavMenuInHover('women')}
                                   onMouseLeave={handleNavMenuOutHover}
                                > WOMEN </a>
                            </li>
                            <li>
                                <a className="p-4 hover:underline underline-offset-4 decoration-4 decoration-slate-950" href="/"
                                   onMouseEnter={()=>handleNavMenuInHover('kid')}
                                   onMouseLeave={handleNavMenuOutHover}
                                > KID </a>
                            </li>
                        </ul>
                        <div className="md:basis-[30%] flex items-center">
                            <form className="my-auto relative w-full h-3/4 border-[1.5px] border-black rounded-md overflow-hidden antialiased " action="/s">
                                <input
                                    type="text"
                                    value={searchState.textValue}
                                    className="w-full h-full bg-zinc-100 focus:outline-0 text-sm font-medium indent-2 text-ellipsis"
                                    placeholder="ABIBAS Ori Cibaduyut"
                                    onInput={handleSearchTextChange}
                                    name="search"
                                />
                                <button
                                    type="button"
                                    className={`${searchState.textValue === '' ? 'invisible' : 'visible'} absolute right-1 top-1/2 -translate-y-1/2`}
                                    onClick={handleSearchTextReset}
                                >
                                    <i className="bi bi-x text-black text-xl"></i>
                                </button>
                            </form>
                        </div>
                        <div className="basis-[5%] flex items-center justify-center text-2xl">
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                </div>
                <button className="basis-2/12 sm:basis-[12%] md:hidden w-full flex-none text-2xl mx-auto">
                    <i className="bi bi-search"></i>
                </button>
            </animated.nav>

            <div className={`fixed top-0 left-0 z-50 w-full mt-20 ${navMenuState.category === '' ? 'invisible' : 'visible'} flex flex-row bg-white border-y-[1.5px] border-zinc-400 transition-invisible ease-in-out duration-500`}
                 onMouseEnter={()=> handleNavMenuInHover(navMenuState.category)}
                 onMouseLeave={handleNavMenuOutHover}
            >
                <div className="basis-1/4 w-full h-full">
                    <h1 className="w-full mt-7 mb-5 mx-4 font-bold font-sans text-lg">FEATURED</h1>
                    <ul className="w-full h-full flex flex-col items-start mb-4 mx-4 gap-y-0.5 tracking-tighter">
                        <Link to="/new-arrival">New Arrival</Link>
                        <Link to="/whats-hot">What&apos;s Hot</Link>
                        <Link to="/series">Series</Link>
                        <Link to="/events">Events</Link>
                    </ul>
                </div>

                <div className="basis-1/4 w-full h-full">
                    <h1 className="w-full mt-7 mb-5 mx-4 font-bold font-sans text-lg">SHOES</h1>
                    <ul className="w-full h-full flex flex-col items-start mb-4 mx-4 gap-y-0.5 tracking-tighter">

                    </ul>
                </div>
            </div>

        </>
    )
}
