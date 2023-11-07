import {HomeSeriesBanner} from "./HomeComponents/HomeSeriesBanner.jsx";
import {HomeEventBanner} from "./HomeComponents/HomeEventBanner.jsx";
import {HomeWhatsHot} from "./HomeComponents/HomeWhatsHot.jsx";
import {HomeGendersBanner} from "./HomeComponents/HomeGendersBanner.jsx";
import {Suspense} from "react";
import {LoadingView} from "../Utils/LoadingView.jsx";
export const HomeViewWeb = () => {

    return (
        <>
            <div className="flex flex-col gap-y-28 w-full h-full ">
                <HomeSeriesBanner/>
                <HomeEventBanner/>
                <HomeWhatsHot/>
                <HomeGendersBanner/>
                {/*<Suspense fallback={<LoadingView/>}>*/}
                {/*   */}
                {/*</Suspense>*/}
                {/*<Suspense fallback={<LoadingView/>}>*/}
                {/*    */}
                {/*</Suspense>*/}
                {/*<Suspense fallback={<LoadingView/>}>*/}
                {/*    */}
                {/*</Suspense>*/}

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