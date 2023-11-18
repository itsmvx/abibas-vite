import {Link} from "react-router-dom";
import {useContext, useRef} from "react";
import storeContext from "./StoreContext.jsx";

export const StoreSearchModal = () => {
    const {ubedzApi, searchingState} = useContext(storeContext)
    const searchModalRef = useRef(null)
    const SearchModalResultElement = () => {
        return <>
            <div className="pb-10 basis-2/5 flex flex-col">
                <div className="w-11/12 h-8 mx-auto select-none">
                    <h1 className="font-bold md:text-lg lg:text-xl">
                        Series
                    </h1>
                </div>
                {
                    searchingState.searchData.series.length === 0
                        ? (
                            <div className="flex h-full items-center justify-center">
                                <p className="font-semibold text-base">NOT FOUND</p>
                            </div>
                        )
                        : (
                            <ul className="w-11/12 mx-auto flex flex-col gap-y-0.5 text-neutral-900 capitalize font-medium md:text-base lg:text-lg">
                                {
                                    searchingState.searchData.series.map((items, index)=>((
                                        <Link key={index} className="flex justify-start hover:text-neutral-950 hover:font-bold " to="/store?category=orang">
                                            {items.name} <span className="ml-auto">{items.productCount}</span>
                                        </Link>

                                    )))
                                }
                            </ul>
                        )
                }
            </div>

            <div className="flex-1 flex flex-col bg-white">
                <div className="w-11/12 h-8 mx-auto select-none">
                    <h1 className="font-bold md:text-lg lg:text-xl">
                        Product
                    </h1>
                </div>
                {
                    searchingState.searchData.products.length === 0
                    ? (
                        <div className="flex h-full items-center justify-center">
                            <p className="font-semibold text-base">NOT FOUND</p>
                        </div>
                        )
                    : (
                            <ul className="w-11/12 mx-auto flex flex-col pb-5 gap-y-8 text-neutral-900 font-semibold md:text-base lg:text-lg">
                                {searchingState.searchData.products.map((items, index) => ((
                                    <Link key={index} to={`/product/${items.name.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="grid grid-cols-6 gap-x-1 h-24 hover:bg-zinc-100 rounded-md">
                                        <div
                                            className="col-span-2 w-4/5 aspect-square flex items-center justify-center overflow-hidden">
                                            <img src={ubedzApi + '/assets/' + items.imgPath.img1}
                                                 onError={(e) => {
                                                     e.target.onerror = null
                                                     e.target.src = "assets/20230830_153932.webp"
                                                 }} className="w-auto h-full object-cover" alt={items.name}
                                            />
                                        </div>
                                        <div className="col-span-4 capitalize">
                                            <h1 className="text-sm tracking-tight">
                                                {items.gender} {items.subCategory}
                                            </h1>
                                            <h1 className="font-bold text-base text-blak tracking-wide">{items.name}</h1>
                                            <p className="text-sm tracking-tight">Rp.{items.price}</p>
                                        </div>
                                    </Link>
                                )))}
                            </ul>
                        )
                }

            </div>
        </>
    }
    const SearchModalNotFoundElement = () => {
        return <>
            <div className="py-5 w-full flex items-center justify-center">
                <div className="w-full h-7 flex items-center justify-center">
                    <p className="select-none text-base font-semibold">
                        Nothing Found...
                    </p>
                </div>
            </div>
        </>
    }
    const SearchModalErrorElement = () => {
        return <>
            <div className="py-5 w-full flex items-center justify-center">
                <div className="w-full h-7 flex items-center justify-center">
                    <p className="select-none text-base font-semibold">
                        Sorry, unexpected error occured while searching...
                    </p>
                </div>
            </div>
        </>
    }
    const SearchModalLoadingElement = () => {
        return <>
            <div className="py-5 w-full flex items-center justify-center">
                <div className="mx-auto w-7 h-7 border-[2.5px] border-black border-r-transparent rounded-full animate-spin">

                </div>
            </div>
        </>
    }
    return (
        <>
            <div ref={searchModalRef}
                 className="md:block absolute top-[150%] md:-left-[150%] lg:-left-[200%] -right-1/2 bg-white shadow-sm shadow-zinc-800 z-10 overflow-hidden">
                <div className="w-full h-full flex flex-row text-black">
                    {
                        searchingState.searchData.length === 0 && !searchingState.isNotFound && !searchingState.isError
                            ? <SearchModalLoadingElement/>
                            : !searchingState.isError && !searchingState.isNotFound
                                ? <SearchModalResultElement/>
                                : searchingState.isNotFound
                                    ? <SearchModalNotFoundElement/>
                                    : (searchingState.isError && !searchingState.isCanceled)
                                    && <SearchModalErrorElement/>
                    }
                </div>
            </div>
        </>
    )
}