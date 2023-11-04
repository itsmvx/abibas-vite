import {HomeSeriesBanner} from "./HomeFragments/HomeSeriesBanner.jsx";
import {HomeEventBanner} from "./HomeFragments/HomeEventBanner.jsx";
import {HomeWhatsHot} from "./HomeFragments/HomeWhatsHot.jsx";
import {HomeGendersBanner} from "./HomeFragments/HomeGendersBanner.jsx";
import {Suspense} from "react";
import {LoadingView} from "../lib/LoadingView.jsx";
export const HomeViewWeb = () => {

    return (
        <>
            <div className="flex flex-col gap-y-28 w-full h-full ">
                <HomeSeriesBanner/>
                <Suspense fallback={<LoadingView/>}>
                    <HomeEventBanner/>
                    <HomeWhatsHot/>
                    <HomeGendersBanner/>
                </Suspense>

                <div className="w-full h-auto mx-auto flex flex-col gap-y-6">
                    <h1 className="mx-auto font-bold font-sans text-3xl">
                        Match Your Style
                    </h1>
                    <div className="w-10/12 h-full mx-auto bg-fuchsia-400">
                        nsfjsnfjsf
                    </div>
                </div>
            </div>

        </>
    )
}