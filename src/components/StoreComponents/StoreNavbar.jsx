import {Link} from "react-router-dom";
import {animated} from "@react-spring/web";
import {useContext,useState} from "react";
import StoreContext from "./StoreContext.jsx";

export const StoreNavbar = () => {
    const {
        storeHeadingText,
        handleSearchOpen,
        handleSearchingStart,
        isSortMenuOpen,
        handleSortMenu,
        sortState,
        sortMenuAnimation,
        handleSort,
        handleFilterOpen,
        mobileUtilsState,
        searchModalRef,
        searchingState,
    } = useContext(StoreContext)
    let onTyping
    const handleInput = event => {
        console.log(event.target.value)
        if (event.target.value === ''){
            handleSearchingStart(event.target.value)
        }
        else{
            handleSearchingStart(event.target.value)
        }
    }

    const SearchModalElement = () => {
        return (
            <>
                {/*SEARCH RESULT MODAL*/}
                <div ref={searchModalRef}
                     className="hidden md:block absolute top-[150%] md:-left-[150%] lg:-left-[200%] -right-1/2 bg-white shadow-sm shadow-zinc-800 z-10 overflow-hidden">
                    <div className="w-full h-full flex flex-row text-black">
                        { searchingState.isError
                            ? <h1 className="py-8 text-base font-medium">Sorry..unexpected error occured</h1>
                            :
                            <>
                                <div className="basis-2/5 flex flex-col">
                                    <div className="w-11/12 h-8 mx-auto select-none">
                                        <h1 className="font-bold md:text-lg lg:text-xl">
                                            Categories
                                        </h1>
                                    </div>
                                    <ul className="w-11/12 mx-auto flex flex-col gap-y-0.5 text-neutral-900 font-semibold md:text-base lg:text-lg">
                                        <Link className="hover:text-black hover:font-bold " to="/store?category=orang">Orang</Link>
                                    </ul>
                                </div>
                                <div className="flex-1 flex flex-col bg-white">
                                    <div className="w-11/12 h-8 mx-auto select-none">
                                        <h1 className="font-bold md:text-lg lg:text-xl">
                                            Product
                                        </h1>
                                    </div>
                                    <ul className="w-11/12 mx-auto flex flex-col pb-5 gap-y-8 text-neutral-900 font-semibold md:text-base lg:text-lg">
                                        {searchingState.searchData.map((items, index) => ((
                                            <Link key={index} to="/"
                                                  className="grid grid-cols-6 gap-x-1 h-24 hover:bg-zinc-100 rounded-md">
                                                <div
                                                    className="col-span-2 w-4/5 aspect-square flex items-center justify-center overflow-hidden">
                                                    <img src={`http://192.168.0.150:8000/api/assets/${items.imgPath.img1}`}
                                                         onError={(e) => {
                                                             e.target.onerror = null
                                                             e.target.src = "assets/20230830_153932.webp"
                                                         }} className="w-auto h-full object-cover" alt=""/>
                                                </div>
                                                <div className="col-span-4">
                                                    <h1 className="text-sm tracking-tight">Gender + Orang</h1>
                                                    <h1 className="font-bold text-base text-blak tracking-wide">{items.name}</h1>
                                                    <p className="text-sm tracking-tight">{items.price}</p>
                                                </div>
                                            </Link>
                                        )))}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {/*SEARCH RESULT BOX*/}
            </>
        )
    }
    return (
        <>
            <div className="w-[95%] h-[10vh] md:h-[15vh] mx-auto flex flex-row justify-between items-end border-b-2 border-zinc-400">
                <h1 className="text-4xl mb-5 font-semibold uppercase ">{storeHeadingText}</h1>
                <div className="text-zinc-600 mb-2 flex justify-end gap-x-5">
                    <div className="relative hidden md:block w-4/5 h-4/5 z-20 bg-white">
                        <input
                            onChange={(e)=>{
                                if( e.target.value === '') {
                                    handleInput(e)
                                }else {
                                    clearTimeout(onTyping)
                                    onTyping = setTimeout(()=>{
                                        handleInput(e)
                                    },1500)
                                }
                            }}
                            type="text"
                            className="w-full indent-1 outline-none border-b-[1.5px] border-zinc-800 relative"
                            placeholder="Search.."
                        />
                        <button className="absolute left-[90%]">
                            <i className=" bi bi-x"></i>
                        </button>
                        {searchingState.isSearching ? <SearchModalElement/>  : <></>}
                    </div>
                    <button value="search" onClick={handleSearchOpen} disabled={mobileUtilsState.search || mobileUtilsState.filter}
                        className={`${mobileUtilsState.search || mobileUtilsState.filter ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer'} 
                        -ml-4  md:hidden hover:text-black`}>
                        <i className="bi bi-search"></i>
                    </button>
                    <i className="bi bi-search hidden -ml-4 md:block"></i>
                    <div className={`relative grid grid-cols-1 ${mobileUtilsState.search || mobileUtilsState.filter ? 'opacity-50' : 'opacity-100'}`}>
                        <button onClick={handleSortMenu} disabled={mobileUtilsState.search || mobileUtilsState.filter}
                                className={`${mobileUtilsState.search || mobileUtilsState.filter ? 'cursor-no-drop' : 'cursor-pointer hover:text-black hover:font-semibold '} 
                                relative flex gap-x-2 font-medium select-none`}>
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
                    <button value="filter" disabled={mobileUtilsState.search || mobileUtilsState.filter}
                            className={`text-lg ${mobileUtilsState.search || mobileUtilsState.filter ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer hover:text-black'}  md:hidden`}
                            onClick={handleFilterOpen}>
                        <i className="bi bi-funnel-fill"></i>
                    </button>
                </div>
            </div>
        </>
    )
}