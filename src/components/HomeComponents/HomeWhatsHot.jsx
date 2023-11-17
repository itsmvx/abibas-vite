import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {useEffect, useRef, useState} from "react";
import {ImagesAll, ImagesNoa} from "../../lib/ImageLib.jsx";
import {Link} from "react-router-dom";
export const HomeWhatsHot = () => {
    const [windowSize, setWindowSize] = useState(()=>{
        return window.innerWidth >= 1024 ? 'lg' :
            window.innerWidth < 1024 && window.innerWidth >=768 ? 'md' : 'sm'
    })
    const whatsHotSliderPrevBtn = useRef(null)
    const whatsHotSliderNextBtn = useRef(null)
    const [whatsHotIsHover, setWhatsHotIsHover] = useState(-1)
    const handleWhatsHotMouseIn = (indexKey) => setWhatsHotIsHover(indexKey)
    const handleWhatsHotMouseOut = () => setWhatsHotIsHover(-1)
    useEffect(() => {
        const handleResize = () => {
            window.innerWidth >= 1024 ? setWindowSize('lg') :
                window.innerWidth < 1024 && window.innerWidth >=768 ? setWindowSize('md')
                    : setWindowSize('sm')
        }
        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, []);
    return (
        <>
            <div className="flex flex-col w-full ">
                <div className="basis-1/6 py-2 flex-none relative flex justify-end gap-x-1.5 w-full h-full ">
                    <h1 className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0  lg:left-[8%] text-4xl font-bold tracking-tight">
                        What&apos;s Hot
                    </h1>
                    <button ref={whatsHotSliderPrevBtn}
                            className="w-10 h-10 rounded-full bg-black text-white text-2xl">
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button ref={whatsHotSliderNextBtn}
                            className="w-10 h-10 rounded-full bg-black text-white text-2xl mr-[8%]">
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
                <div className="basis-5/6 flex-none">
                    <Swiper
                        className="w-11/12 md:w-10/12 h-full mx-auto overflow-hidden select-none"
                        freeMode={true}
                        slidesPerView={windowSize === 'lg' ? 3 : windowSize === 'md' ? 2 : 2 }
                        spaceBetween={22}
                        navigation={{
                            prevEl: whatsHotSliderPrevBtn.current,
                            nextEl: whatsHotSliderNextBtn.current,
                            disabledClass: 'opacity-75'
                        }}
                        modules={[Navigation, FreeMode]}
                        onSwiper={(swiper)=>{
                            swiper.params.navigation.prevEl = whatsHotSliderPrevBtn.current
                            swiper.params.navigation.nextEl = whatsHotSliderNextBtn.current
                            swiper.navigation.destroy()
                            swiper.navigation.init()
                            swiper.navigation.update()
                        }}
                    >
                        {
                            ImagesAll.map((image, index) => ((
                                <SwiperSlide key={index}
                                             onMouseEnter={()=>handleWhatsHotMouseIn(index)}
                                             onMouseLeave={handleWhatsHotMouseOut}
                                             className="aspect-square relative">
                                    <div className={`${whatsHotIsHover === index ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                        <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                            <h1 className="mt-5 font-bold text-lg">Heading</h1>
                                            <p className="mx-5 font-semibold">Lorem ipsum scripta odio efficiantur potenti vel in mauris</p>
                                        </div>
                                        <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                            <Link to="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</Link>
                                            <p className="font-medium">Rp.69696969</p>
                                        </div>
                                    </div>
                                    <img src={image} className="w-full h-full object-cover" alt="" loading="lazy"/>
                                </SwiperSlide>
                            )))
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}
