import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export const NotFoundPage = () => {
    const [notFoundTimeout, setNotFoundTimeout] = useState(10)
    useEffect(() => {
        const currentTimeout = notFoundTimeout
        const timeout = setTimeout(()=>{
            setNotFoundTimeout(currentTimeout - 1)
        },1000)
        return ()=> clearTimeout(timeout)
    }, [notFoundTimeout]);

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setNotFoundTimeout(notFoundTimeout - 1)
        },1000)
        return ()=> clearTimeout(timeout)
    }, []);
    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-10">
                <h1 className="text-3xl font-bold select-none">
                    404 Not Found
                </h1>
                <p className="text-lg font-semibold select-none">
                    {`Sorry.. content you're looking is not found`}
                </p>
                <button className="bg-black text-white p-2 select-none">
                    Back To Home
                </button>
                <p className="text-sm -ml-5 select-none">{`You'll be redirected to Home after ${notFoundTimeout} second`}</p>
                {
                    notFoundTimeout === 0 && (<Navigate to="/"/>)
                }
            </div>
        </>
    )
}