import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {useEffect, useRef, useState} from "react";
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
                        <SwiperSlide key={0}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(0)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 0 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Kak Rio sayang</h1>
                                    <p className="mx-5 font-semibold">Kak Rio kesayangan ewe ewe gass ewe brutal </p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/20230830_153932.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={1}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(1)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 1 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Kak Rio sayang</h1>
                                    <p className="mx-5 font-semibold">Uhuuu :P</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/20231002_105450.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={2}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(2)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 2 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Haruna si Buntut</h1>
                                    <p className="mx-5 font-semibold">Aaaaa buntuuuuut</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/illust_111858013_20230921_082744.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={3}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(3)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 3 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Haruna si Buntut</h1>
                                    <p className="mx-5 font-semibold">Sini buntut lo Haruna, Sini gwe en</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/haruna-buntut1.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={4}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(4)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 4 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Kak Rio sayang</h1>
                                    <p className="mx-5 font-semibold">Wah ini mah jelas kerink, or cringe ( maybe? )</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/illust_108613753_20230615_070606.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={5}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(5)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 5 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Noaaaa</h1>
                                    <p className="mx-5 font-semibold">Udah ga perlu ditanya lagi..</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/20230702_185119.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={6}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(6)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 6 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Noa & Yuuka</h1>
                                    <p className="mx-5 font-semibold">Senyuman Noa, Senyuman penguras</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/20230522_194233.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={7}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(7)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 7 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Tante Shiroko</h1>
                                    <p className="mx-5 font-semibold">Jelas kerink, aseli</p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/20230905_150623.webp" className="w-full h-full object-cover" alt="" loading="lazy"/>
                        </SwiperSlide>
                        <SwiperSlide key={8}
                                     onMouseEnter={()=>handleWhatsHotMouseIn(8)}
                                     onMouseLeave={handleWhatsHotMouseOut}
                                     className="aspect-square relative">
                            <div className={`${whatsHotIsHover === 8 ? 'opacity-100' : 'opacity-0'} whatsHotDesc`}>
                                <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                    <h1 className="mt-5 font-bold text-lg">Kak Rio sayang</h1>
                                    <p className="mx-5 font-semibold">Tahukah kamu, 70% tubuh manusia adalah Air, namun sama kak Rio jelas dihabiskan langsung kerink </p>
                                </div>
                                <div className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                    <a href="/" className="font-bold text-sm bg-black p-1.5 text-white">See details</a>
                                    <p className="font-medium">Rp.69696969</p>
                                </div>
                            </div>
                            <img src="/assets/1a02ee73cea842d9fe6c3c2c0d39d597.webp" className="w-full h-full object-cover object-right" alt="" loading="lazy"/>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
