import {useContext} from "react";
import {animated} from "@react-spring/web";
import StoreContext from "./StoreContext.jsx";
export const StoreCollage = () => {
    const {
        collageAnimation,
        collageDetailAnimation,
        handleCollageHoverIn,
        handleCollageHoverOut,
        storeState,
    } = useContext(StoreContext)
    const DefaultCollage = () => {
        return <>
            {
                collageAnimation.map((props,index) => {
                    return (
                        <animated.div key={index} style={props}
                                      className={`${storeState.isFiltering ? 'contrast-50' : 'contrast-100'} relative basis-[45%] md:basis-2/5 lg:basis-[32%] mx-auto md:mx-0 w-full bg-white aspect-[4/5] overflow-hidden shadow-sm shadow-zinc-400`}
                                      onMouseEnter={()=> handleCollageHoverIn(index)}
                                      onMouseLeave={()=> handleCollageHoverOut(index)}>
                            <div className="w-full aspect-[4/3] overflow-hidden">
                                <img src={storeState.productsData[index].photoUrl}
                                     className="w-full h-full object-cover" alt=".." loading="lazy"/>
                            </div>
                            <animated.div
                                style={collageDetailAnimation[index]}
                                className="absolute top-full bottom-0 w-full h-full z-10 overflow-hidden"
                            >
                                <div className="w-full h-full mx-auto bg-fuchsia-400 flex justify-center">

                                </div>
                            </animated.div>

                            <div className="absolute top-2/3 bottom-0 w-full flex flex-col">
                                <div className="basis-3/5 w-11/12 mx-auto">
                                    <h1 className="uppercase my-auto text-black font-bold text-sm md:text-base tracking-tight">
                                        {storeState.productsData[index].names.lastName} {storeState.productsData[index].names.firstName}
                                    </h1>
                                </div>
                                <div className="basis-2/5 flex-none w-11/12 mx-auto text-xs md:text-sm">
                                    Rp.69000
                                </div>
                            </div>
                        </animated.div>
                    )
             })}
        </>
    }
    const FetchedCollage = () => {
        return <>
            {
                collageAnimation.map((props,index) => {
                    return (
                        <animated.div key={index} style={props}
                                      className={`${storeState.isFiltering | storeState.isSearching ? 'contrast-50' : 'contrast-100'} relative basis-[45%] md:basis-2/5 lg:basis-[32%] mx-auto md:mx-0 w-full bg-white aspect-[3/4] overflow-hidden shadow-sm shadow-zinc-400`}
                                      onMouseEnter={()=> handleCollageHoverIn(index)}
                                      onMouseLeave={()=> handleCollageHoverOut(index)}
                        >
                            <div className="w-full aspect-square overflow-hidden">
                               <img src={import.meta.env.REST_API_URL + '/assets/' + storeState.productsData[index].imgPath.img1}
                                     className="w-full h-full object-cover" alt=".." loading="lazy"/>
                            </div>
                            <animated.div
                                style={collageDetailAnimation[index]}
                                className="absolute top-full bottom-0 w-full h-full z-10 overflow-hidden"
                            >
                                <div className="w-full h-full bg-zinc-50">
                                    <div className="mx-auto w-11/12 flex flex-col gap-y-3">
                                        <div className="mt-2 basis-1/2">
                                            <h1 className="text-sm font-semibold">Size Available</h1>
                                            <div className="flex flex-row gap-x-2">
                                                {
                                                    storeState.productsData[index].specs.size.split(',').map((items, index) => ((
                                                        <div key={index} className="min-w-[2.5rem] w-auto p-1 mt-0.5 capitalize text-sm flex items-center justify-center rounded-md border-[1px] border-black">
                                                            {items}
                                                        </div>
                                                    )))
                                                }
                                            </div>
                                        </div>
                                        <div className="basis-1/2">
                                            <h1 className="text-sm font-semibold">Colors</h1>
                                            <div className="flex flex-row gap-x-1.5">
                                                {
                                                    storeState.productsData[index].specs.color.split(',').map((items, index) => ((
                                                        <div key={index} className="w-auto p-1 mt-0.5 capitalize text-sm flex items-center justify-center rounded-md border-[1px] border-black">
                                                            {items}
                                                        </div>
                                                    )))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </animated.div>

                            <div className="absolute top-[80%] bottom-0 w-full flex flex-col">
                                <div className="basis-1/5 w-11/12 mx-auto">
                                    <p className="text-[11px] capitalize font-medium text-zinc-600">
                                        {storeState.productsData[index].gender} {storeState.productsData[index].subCategory}
                                    </p>
                                </div>
                                <div className="basis-2/5 w-11/12 mx-auto">
                                    <h1 className="uppercase my-auto text-black font-semibold text-sm md:text-base tracking-tight">
                                        {storeState.productsData[index].name}
                                    </h1>
                                </div>
                                <div className="basis-2/5 flex-none w-11/12 mx-auto text-xs md:text-sm">
                                    Rp.{storeState.productsData[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </div>
                            </div>
                        </animated.div>
                    )
             })}
        </>
    }
    const LoadingCollage = () => {
        return (
            <>
                {
                    Array(6).fill().map((_, index) => ((
                        <div key={index}
                             className="relative basis-[45%] md:basis-2/5 lg:basis-[32%] mx-auto md:mx-0 w-full bg-white aspect-[4/5] overflow-hidden shadow-sm shadow-zinc-400"
                        >
                            <div className="w-full aspect-[4/3] overflow-hidden">
                                <div className="w-full h-full object-cover bg-zinc-300">
                                </div>
                            </div>
                            <div className="absolute top-2/3 bottom-0 w-full flex flex-col">
                                <div className="basis-3/5 w-11/12 mx-auto">
                                    <div className="w-3/4 bg-zinc-300 p-3.5">

                                    </div>
                                </div>
                                <div className="basis-2/5 w-11/12 mx-auto">
                                    <div className="w-28 bg-zinc-300 p-3">

                                    </div>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </>
        )
    }
    const NotFoundCollage = () => {
        return(
            <>
                <div className="w-full h-full flex items-center justify-center">
                    <p className="animate-fade animate-duration-500 ease-in-out">{`It's Look like products you're looking is Not Found`}</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-[97%] h-full mt-3.5 flex flex-row flex-wrap items-start justify-start md:justify-center lg:justify-start gap-y-6 gap-3 md:gap-y-6 md:gap-x-10 lg:gap-y-10 lg:gap-x-4 mx-auto">
                {
                    storeState.isLoading
                        ? <LoadingCollage />
                        : storeState.isError && !storeState.isLoading
                                ? <DefaultCollage/>
                                : storeState.isNotFound && !storeState.isError &&  !storeState.isLoading
                                ? <NotFoundCollage />
                                : !storeState.isNotFound && !storeState.isError &&  !storeState.isLoading
                                ? <FetchedCollage />
                                : <DefaultCollage />
                }

            </div>
        </>
    )
}
StoreCollage.displayName = 'StoreCollage';