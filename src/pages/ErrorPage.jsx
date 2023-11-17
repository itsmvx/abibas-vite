import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export const ErrorPage = () => {
    const [errorTimeout, setErrorTimeout] = useState(11)
    useEffect(() => {
        const currentTimeout = errorTimeout
        const timeout = setTimeout(()=>{
            setErrorTimeout(currentTimeout - 1)
        },1000)
        return ()=> clearTimeout(timeout)
    }, [errorTimeout]);

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setErrorTimeout(errorTimeout - 1)
        },1000)
        localStorage.removeItem('storeProductsData')
        localStorage.removeItem('storeSeriesFeed')
        return ()=> clearTimeout(timeout)
    }, []);
    return (
        <>
            <main className="w-screen h-screen flex flex-col items-center justify-end gap-y-10 bg-[url('/assets/haruna-banner.webp')] bg-center bg-fixed bg-cover">
                <h1 className="-ml-5 text-3xl font-bold select-none">
                    An Error Occured
                </h1>
                <p className="text-lg font-semibold select-none">
                    Sorry.. Unexpected error occured
                </p>
                <button className="bg-black text-white p-2 select-none">
                    Back To Home
                </button>
                <p className="text-sm mb-8 select-none">{`You'll be redirected to Home after ${errorTimeout} second`}</p>
                {
                    errorTimeout === 0 && (<Navigate to="/"/>)
                }
            </main>
        </>
    )
}