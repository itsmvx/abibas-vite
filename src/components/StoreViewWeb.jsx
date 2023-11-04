import {Suspense, useEffect, useRef, useState} from "react";
import {StoreContentCollage} from "./StoreFragments/StoreContentCollage.jsx";
import {useSpring, animated} from "@react-spring/web";
import {Link, useSearchParams} from "react-router-dom";
import {LoadingView} from "../lib/LoadingView.jsx";

export const StoreViewWeb = () => {
    const [isSortMenuOpen, setisSortMenuOpen] = useState(false)
    const [sortState, setSortState] = useState('featured')
    let [storeSearchParams, setStoreSearchParams] = useSearchParams('')
    const [storeHeadingText, setStoreHeadingText] = useState('')
    const [utilityState, setUtilityState] = useState({
        filter: false,
        search: false,
    })
    const sidebarRef = useRef(null)
    const [sortMenuAnimation, api]
        = useSpring(() => ({
            from: { y: 0 },
            to: { y: 0 },
            config: { duration: 300 }
        })
    )
    const sidebarAnimation= useSpring({
        from: { x: utilityState.filter || utilityState.search ? 1000 : 0 },
        to: { x: utilityState.filter || utilityState.search ? 0 : 1000 },
        config: { duration: 500 },
    })
    const handleSort = sort => {
        setSortState(sort)
        setisSortMenuOpen(false)
    }
    const handleSortMenu = () => {
        setisSortMenuOpen(!isSortMenuOpen)
        api.start(()=>({
            from: { y: isSortMenuOpen ? 0 : -10 },
            to: {  y: isSortMenuOpen ? -30 : 0 },
            config: { duration: 150 }
        }))
    }
    const handleSetSearchParams = params => setStoreSearchParams({category: params})
    const handleSearchOpen = () => {
        setTimeout(()=>{
            sidebarRef.current.classList.remove('hidden')
        },100)
        setUtilityState(prevState => ({
                ...prevState, search: true
        }))
    }
    const handleSearchClose = () => {
        setUtilityState(prevState => ({
            ...prevState,
            search: false,
        }))
    }
    const handleFilterOpen = () => {
        setUtilityState(prevState => ({
            ...prevState,
            filter: true
        }))
    }
    const handleFilterClose = () => {
        setUtilityState(prevState => ({
            ...prevState,
            filter: false,
        }))
    }
    useEffect(() => {
        let headingText
        storeSearchParams.get('series')
            ? storeSearchParams.get('category')
            ? headingText = storeSearchParams.get('series').concat(' ', storeSearchParams.get('category'))
            : headingText = storeSearchParams.get('series')
            : storeSearchParams.get('category')
                ? headingText = storeSearchParams.get('category')
                : headingText = 'ABIBAS STORE'

        setStoreHeadingText(headingText)
    }, [storeSearchParams]);

    const storeSidebar = () => {
        return(
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
        )
    }

    return (
        <>
            {storeSidebar()}
            <div className="w-[95%] h-[15vh] mx-auto flex flex-row justify-between items-end border-b-2 border-zinc-400">
                <h1 className="text-4xl mb-5 font-semibold uppercase ">{storeHeadingText}</h1>
                <div className="text-zinc-600 mb-2 flex justify-end gap-x-5">
                    <div className="relative hidden md:block w-4/5 h-4/5 z-20 bg-white">
                        <input
                            type="text"
                            className="w-full indent-1 outline-none border-b-[1.5px] border-zinc-800 relative"
                            placeholder="Search.."
                        />
                        <button className="absolute left-[90%]">
                            <i className=" bi bi-x"></i>
                        </button>
                        <div className="absolute top-[160%] md:w-[250%] lg:w-[300%] h-auto md:-translate-x-[60%] lg:-translate-x-2/3 bg-white shadow-sm shadow-zinc-800 z-10 overflow-hidden transition-width ease-in-out duration-[400ms]">
                            <div className="w-full h-full flex flex-row text-black">
                                <div className="basis-2/5 flex flex-col">
                                    <div className="w-11/12 h-8 mx-auto select-none">
                                        <h1 className="font-bold md:text-lg lg:text-xl">
                                            Categories
                                        </h1>
                                    </div>
                                    <ul className="w-11/12 mx-auto flex flex-col gap-y-0.5 text-neutral-900 font-semibold md:text-base lg:text-lg">
                                        <li>
                                            <Link className="hover:text-black hover:font-bold " to="/store?category=orang">Orang</Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-black hover:font-bold " to="/store?category=euphy">Euphy</Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-black hover:font-bold " to="/store?category=mika">Mika</Link>
                                        </li>
                                        <li>
                                            <Link className="hover:text-black hover:font-bold " to="/store?category=haruna">Haruna</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex-1 flex flex-row bg-blue-500">
                                    as
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="-ml-4 cursor-pointer md:hidden hover:text-black" value="search" onClick={handleSearchOpen}>
                        <i className="bi bi-search"></i>
                    </button>
                    <i className="bi bi-search hidden -ml-4 md:block"></i>
                    <div className={`relative grid grid-cols-1`}>
                        <button onClick={handleSortMenu} className="relative flex gap-x-2 font-medium hover:text-black hover:font-semibold select-none">
                            Sort
                            <i className={`${isSortMenuOpen ? 'rotate-0' : 'rotate-180' } bi bi-chevron-up transition-rotate duration-300 text-lg`}></i>
                        </button>
                        <div className={`absolute top-[150%] w-[300%] -right-10 md:-right-2 shadow-md shadow-black/50 rounded-md bg-zinc-50 ${isSortMenuOpen ? 'h-32 z-10' : 'h-0 shadow-none z-0'} transition-height duration-[400ms] overflow-hidden`}>
                            <animated.div style={sortMenuAnimation} className={`grid grid-cols-1 h-full ${isSortMenuOpen ? 'visible duration-100' : 'invisible duration-0'} transition-visible `}>
                                <button className={`${sortState === 'featured' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `} disabled={sortState === 'featured'} onClick={()=>handleSort('featured')}>Featured</button>
                                <button className={`${sortState === 'ascending' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `} disabled={sortState === 'ascending'} onClick={()=>handleSort('ascending')}>Name A to Z</button>
                                <button className={`${sortState === 'descending' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `} disabled={sortState === 'descending'} onClick={()=>handleSort('descending')}>Name Z to A</button>
                                <button className={`${sortState === 'cheap' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `} disabled={sortState === 'cheap'} onClick={()=>handleSort('cheap')}>Price Low to High</button>
                                <button className={`${sortState === 'expensive' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `} disabled={sortState === 'expensive'} onClick={()=>handleSort('expensive')}>Price High to Low</button>
                            </animated.div>
                        </div>
                    </div>
                    <button value="filter" className={`text-lg ${utilityState.search ? 'cursor-no-drop' : 'cursor-pointer hover:text-black'}  md:hidden`} onClick={handleFilterOpen} disabled={utilityState.search}>
                        <i className="bi bi-funnel-fill"></i>
                    </button>
                </div>

            </div>

            <div className="flex flex-row relative h-[85vh]">
                <div className="basis-1/5 hidden md:block overflow-y-auto">
                    <div className="mt-5 mx-auto w-9/12 flex flex-col gap-y-5 text-base font-semibold text-zinc-800">
                        <ul className="flex flex-col gap-y-5">
                            <li className="text-2xl font-bold select-none">Series for You</li>
                            <Link className="hover:font-bold text-black" to="/" >Ahmad Roblok</Link>
                            <Link className="hover:font-bold text-black" to="/" >Java Spring Boot</Link>
                            <Link className="hover:font-bold text-black" to="/" >Sunda Autumn Sneakers</Link>
                            <Link className="hover:font-bold text-black" to="/" >Sepatu Rahmat</Link>
                        </ul>
                        <div className="w-full h-[1px] bg-black"></div>
                        <div className="flex flex-col gap-y-2">
                            <button className="text-left font-bold flex justify-between">
                                Categories <i className="bi bi-chevron-down text-lg text-black"></i>
                            </button>
                            <form className="flex flex-col gap-y-2">
                                <div className="flex justify-between mr-0.5">
                                    <label>Sepatu</label>
                                    <input type="checkbox" onChange={()=>handleSetSearchParams('shoes')}/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Topi</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Euphylia</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Orang</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Sepatu</label>
                                    <input type="checkbox"/>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <button className="text-left font-bold flex justify-between">
                                Genders <i className="bi bi-chevron-down text-lg text-black"></i>
                            </button>
                            <form className="flex flex-col gap-y-2">
                                <div className="flex justify-between mr-0.5">
                                    <label>All</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Men</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Women</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>Kid</label>
                                    <input type="checkbox"/>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col gap-y-2 pb-10">
                            <button className="text-left font-bold flex justify-between">
                                Shop By Price <i className="bi bi-chevron-down text-lg text-black"></i>
                            </button>
                            <form className="flex flex-col gap-y-2">
                                <div className="flex justify-between mr-0.5">
                                    <label>{`< 1.000.000`}</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>{`1.000K - 2.000K`}</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>{`2.001K - 4.000K`}</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>{`2.001K - 4.000K`}</label>
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex justify-between mr-0.5">
                                    <label>{`> 4.000.000`}</label>
                                    <input type="checkbox"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="basis-full md:basis-4/5 bg-gray-50 overflow-y-scroll">
                    <Suspense fallback={<LoadingView/>}>
                        <StoreContentCollage
                            sortState={sortState}
                            storeSearchParams={storeSearchParams}
                            setStoreSearchParams={setStoreSearchParams}
                        />
                    </Suspense>
                </div>
            </div>

        </>
    )
}