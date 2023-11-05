import {Link} from "react-router-dom";
import {animated} from "@react-spring/web";
import {useContext} from "react";
import StoreContext from "../StoreContext.jsx";

export const StoreNavbar = () => {
    const {
        storeHeadingText,
        handleSearchOpen,
        isSortMenuOpen,
        handleSortMenu,
        sortState,
        sortMenuAnimation,
        handleSort,
        handleFilterOpen,
        utilityState
    } = useContext(StoreContext)
    return (
        <>
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
                        {/*<div className="absolute top-[160%] md:w-[250%] lg:w-[300%] h-auto md:-translate-x-[60%] lg:-translate-x-2/3 bg-white shadow-sm shadow-zinc-800 z-10 overflow-hidden transition-width ease-in-out duration-[400ms]">*/}
                        {/*    <div className="w-full h-full flex flex-row text-black">*/}
                        {/*        <div className="basis-2/5 flex flex-col">*/}
                        {/*            <div className="w-11/12 h-8 mx-auto select-none">*/}
                        {/*                <h1 className="font-bold md:text-lg lg:text-xl">*/}
                        {/*                    Categories*/}
                        {/*                </h1>*/}
                        {/*            </div>*/}
                        {/*            <ul className="w-11/12 mx-auto flex flex-col gap-y-0.5 text-neutral-900 font-semibold md:text-base lg:text-lg">*/}
                        {/*                <li>*/}
                        {/*                    <Link className="hover:text-black hover:font-bold " to="/store?category=orang">Orang</Link>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link className="hover:text-black hover:font-bold " to="/store?category=euphy">Euphy</Link>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link className="hover:text-black hover:font-bold " to="/store?category=mika">Mika</Link>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <Link className="hover:text-black hover:font-bold " to="/store?category=haruna">Haruna</Link>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex-1 flex flex-row bg-blue-500">*/}
                        {/*            as*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
        </>
    )
}