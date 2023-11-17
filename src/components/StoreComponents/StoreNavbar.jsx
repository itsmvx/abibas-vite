import {animated} from "@react-spring/web";
import {useContext, useRef} from "react";
import StoreContext from "./StoreContext.jsx";
import {StoreSearchModal} from "./StoreSearchModal.jsx";
import {Haruna1L} from "../../lib/ImageLib.jsx"
export const StoreNavbar = () => {
    const {
        storeHeadingText,
        searchingState,
        handleSearchOpen,
        handleSearchingStart,
        handleSearchingCancel,
        isSortMenuOpen,
        handleSortMenu,
        sortState,
        sortMenuAnimation,
        handleSort,
        handleFilterOpen,
        mobileUtilsState,
    } = useContext(StoreContext)

    let onTyping
    const inputSearchRef = useRef(null)
    return (
        <>
            <div
                className="w-[95%] h-[10vh] md:h-[15vh] mx-auto flex flex-row justify-between items-end border-b-2 border-zinc-400">
                <h1 className="text-2xl md:text-4xl mb-2 md:mb-5 font-semibold uppercase ">
                    {storeHeadingText}
                </h1>
                <div className="text-zinc-600 mb-2 flex justify-end gap-x-5">
                    <div className="relative hidden md:block w-4/5 h-4/5 z-20 bg-white">
                        <input
                            ref={inputSearchRef}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    handleSearchingStart(e)
                                } else {
                                    searchingState.isSearching && handleSearchingCancel()
                                    clearTimeout(onTyping)
                                    onTyping = setTimeout(() => {
                                        handleSearchingStart(e)
                                    }, 1500)
                                }
                            }}
                            type="text"
                            className="w-full indent-1 outline-none border-b-[1.5px] border-zinc-800 relative"
                            placeholder="Search.."
                        />
                        {
                            searchingState.isSearching && (
                                <button className="absolute left-[90%] animate-fade animate-duration-300 animate-ease-in-out"
                                        onClick={()=>{
                                            inputSearchRef.current.value = ''
                                            handleSearchingCancel()
                                        }}>
                                    <i className=" bi bi-x"></i>
                                </button>
                            )
                        }
                        {
                            (searchingState.isSearching || searchingState.isError) && !searchingState.isCanceled
                            && <StoreSearchModal/>
                        }
                    </div>
                    <button value="search" onClick={handleSearchOpen}
                            disabled={mobileUtilsState.search || mobileUtilsState.filter}
                            className={`${mobileUtilsState.search || mobileUtilsState.filter ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer'} 
                        -ml-4  md:hidden hover:text-black`}>
                        <i className="bi bi-search"></i>
                    </button>
                    <i className="bi bi-search hidden -ml-4 md:block"></i>
                    <div className={`relative grid grid-cols-1 ${mobileUtilsState.search || mobileUtilsState.filter
                        ? 'opacity-50'
                        : 'opacity-100'}`}>
                        <button onClick={handleSortMenu} disabled={mobileUtilsState.search || mobileUtilsState.filter}
                                className={`${mobileUtilsState.search || mobileUtilsState.filter ? 'cursor-no-drop' : 'cursor-pointer hover:text-black hover:font-semibold '} 
                                relative flex gap-x-2 font-medium select-none`}>
                            Sort
                            <i className={`${isSortMenuOpen ? 'rotate-0' : 'rotate-180'} bi bi-chevron-up transition-rotate duration-300 text-lg`}></i>
                        </button>
                        <div
                            className={`absolute top-[150%] w-[300%] -right-10 md:-right-2 shadow-md shadow-black/50 rounded-md bg-zinc-50 ${isSortMenuOpen ? 'h-32 z-10' : 'h-0 shadow-none z-0'} transition-height duration-[400ms] overflow-hidden`}>
                            <animated.div style={sortMenuAnimation}
                                          className={`grid grid-cols-1 h-full ${isSortMenuOpen ? 'visible duration-100' : 'invisible duration-0'} transition-visible `}>
                                <button
                                    className={`${sortState === 'featured' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `}
                                    disabled={sortState === 'featured'} onClick={() => handleSort('featured')}>Featured
                                </button>
                                <button
                                    className={`${sortState === 'ascending' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `}
                                    disabled={sortState === 'ascending'} onClick={() => handleSort('ascending')}>Name A
                                    to Z
                                </button>
                                <button
                                    className={`${sortState === 'descending' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `}
                                    disabled={sortState === 'descending'} onClick={() => handleSort('descending')}>Name
                                    Z to A
                                </button>
                                <button
                                    className={`${sortState === 'cheap' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `}
                                    disabled={sortState === 'cheap'} onClick={() => handleSort('cheap')}>Price Low to
                                    High
                                </button>
                                <button
                                    className={`${sortState === 'expensive' ? 'cursor-no-drop font-bold' : 'cursor-pointer hover:font-bold'} `}
                                    disabled={sortState === 'expensive'} onClick={() => handleSort('expensive')}>Price
                                    High to Low
                                </button>
                            </animated.div>
                        </div>
                    </div>
                    <button value="filter" disabled={mobileUtilsState.search || mobileUtilsState.filter}
                            className={`text-lg ${mobileUtilsState.search || mobileUtilsState.filter
                                ? 'opacity-50 cursor-no-drop'
                                : 'opacity-100 cursor-pointer hover:text-black'}  md:hidden`}
                            onClick={handleFilterOpen}>
                        <i className="bi bi-funnel-fill"></i>
                    </button>
                </div>
            </div>
        </>
    )
}