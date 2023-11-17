import {animated, useSpring} from "@react-spring/web";
import {useRef} from "react";
import {Link} from "react-router-dom";
import {Haruna1L, Mari1L, Noa2L} from "../../lib/ImageLib.jsx";

export const HomeGendersBanner = () => {
    const genderHelpBtn = useRef(null)
    const [genderHelpAnimation, genderAnimationApi] = useSpring(()=>({
        from: { opacity : 0 },
        to: { opacity: 0 },
        config: { duration: 170 }
    }))
    const handleGenderHelpMouseIn = () => {
        genderHelpBtn.current.classList.remove('hidden')
        genderAnimationApi.start({
            from: { opacity : 0 },
            to: { opacity: 1 },
            config: { duration: 170 }
        })
    }
    const handleGenderMouseOut = () => {
        setTimeout(()=>{
            genderHelpBtn.current.classList.add('hidden')
        },170)
        genderAnimationApi.start({
            from: { opacity : 1 },
            to: { opacity: 0 },
            config: { duration: 170 }
        })
    }
    return (
        <>
            <div className="flex flex-col w-full relative">
                <div className="basis-1/6 py-2 flex-none relative flex justify-end gap-x-1.5 w-full h-full ">
                    <h1 className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[8%] text-4xl font-bold tracking-tight">
                        FOR EVERYONE!
                    </h1>
                    <div className="w-8 h-8 mb-2 rounded-full text-white text-xl mr-[7%] cursor-pointer"
                         onMouseEnter={handleGenderHelpMouseIn} onMouseLeave={handleGenderMouseOut}>
                        <i className="bi bi-question-circle invert"></i>
                    </div>
                </div>
                <animated.div style={genderHelpAnimation} ref={genderHelpBtn} className="z-20 absolute top-10 right-28 pb-2 w-1/4 rounded-md bg-zinc-50 border-[1.5px] border-black overflow-hidden">
                    <div className="flex flex-col gap-y-1 ml-7 mr-6 font-sans font-medium text-sm">
                        <h1 className="mt-2 text-center font-bold text-base">Tentang Produk ABIBAS</h1>
                        <p><span className="-ml-5 mr-1"><i className="bi bi-check2-circle"></i></span>ABIBAS hanya menyediakan produk untuk dua <span className="font-bold">gender</span> yang diakui.</p>
                        <p><span className="-ml-5 mr-1"><i className="bi bi-check2-circle"></i></span>ABIBAS sangat mendukung kasih sayang kepada si buah hati, oleh karena itu ABIBAS menyediakan produk ekslusif untuk si buah hati tercinta.</p>
                        <p><span className="-ml-5 mr-1"><i className="bi bi-check2-circle"></i></span>Anda tidak termasuk ke dalam kategori produk kami? Talk to Joe.</p>
                    </div>
                </animated.div>

                <div className="basis-5/6 flex-none">
                    <div className="w-2/3 sm:w-10/12 h-full mx-auto overflow-hidden select-none grid grid-cols-1 md:grid-cols-7 lg:grid-cols-3 gap-x-6 md:gap-y-10">
                        <div className="aspect-square relative md:col-start-1 md:col-span-3 lg:col-start-1 lg:col-span-1">
                            <img src={Haruna1L} className="w-full h-full object-cover object-top" alt="" loading="lazy"/>
                            <Link to="/"
                               className="absolute top-[80%] left-1/2 -translate-x-1/2 w-28 h-10 flex items-center justify-center gap-x-1 border-black border-[1px] ring-[0.5px] ring-inset ring-white bg-black font-bold text-base text-white">
                                MEN <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                        <div className="aspect-square relative md:col-start-5 md:col-span-3 lg:col-start-2 lg:col-span-1">
                            <img src={Noa2L} className="w-full h-full object-cover object-top" alt="" loading="lazy"/>
                            <Link to="/"
                               className="absolute top-[80%] left-1/2 -translate-x-1/2 w-28 h-10 flex items-center justify-center gap-x-1 border-black border-[1px] ring-[0.5px] ring-inset ring-white bg-black font-bold text-base text-white">
                                WOMEN <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                        <div className="aspect-square relative md:col-start-3 md:col-span-3 lg:col-start-3 lg:col-span-1">
                            <img src={Mari1L} className="w-full h-full object-cover object-top" alt="" loading="lazy"/>
                            <Link to="/"
                               className="absolute top-[80%] left-1/2 -translate-x-1/2 w-28 h-10 flex items-center justify-center gap-x-1 border-black border-[1px] ring-[0.5px] ring-inset ring-white bg-black font-bold text-base text-white">
                                KID <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}