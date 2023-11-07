import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import {useRef} from "react";

export const HomeSeriesBanner = () => {
    const seriesSliderNavBtn = useRef(null)
    return (
        <>
            <div className="flex flex-col md:flex-row mt-[15vh] w-full h-[125vh] md:h-[85vh]">
                <div className="bg-white order-last md:order-first basis-3/5 md:basis-[45%] flex flex-col w-full h-full">
                    <div className="basis-1/4 mx-10 flex-none flex items-center justify-center md:justify-start">
                        <h1 className="text-4xl sm:text-5xl text-black font-bold tracking-tighter ">
                            Kurodate Haruna Series
                        </h1>
                    </div>
                    <div className="basis-3/4 flex-none flex flex-col mx-6 md:mx-10 gap-y-2 md:gap-y-4 overflow-hidden text-ellipsis">
                        <h1 className="mt-2 md:mt-10 font-semibold text-xl">READY, SET GO!</h1>
                        <p className="text-ellipsis overflow-hidden text-sm lg:text-base">
                            She buntut looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.

                            She buntut looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.
                        </p>
                        <a href="/"
                           className="w-fit text-center mx-auto md:mx-0 my-auto px-3 py-2 md:py-3 bg-black text-white">
                            SEE GALLERY <i className="bi bi-caret-right"></i>
                        </a>
                    </div>
                </div>

                <div className="basis-2/5 flex justify-center flex-none md:basis-[55%]">
                    <div className="relative w-3/4 md:w-full">
                        <div className="absolute  w-96 md:w-10/12 md:min-w-[26rem] h-auto top-1/2 -translate-y-1/2  md:top-10 left-1/2 -translate-x-1/2 md:translate-y-0 aspect-[4/3] rounded-xl overflow-hidden">
                            <Swiper
                                className="mySwiper w-full h-full"
                                loop={true}
                                modules={[EffectFade, Navigation, Autoplay]}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: true
                                }}
                                effect={'fade'}
                                onSwiper={(swiper)=>{
                                    swiper.params.navigation.nextEl = seriesSliderNavBtn.current
                                    swiper.navigation.destroy()
                                    swiper.navigation.init()
                                    swiper.navigation.update()
                                }}
                                navigation={{
                                    nextEl: seriesSliderNavBtn.current
                                }}
                            >
                                <SwiperSlide className="overflow-hidden">
                                    <img src="/assets/haruna-banner.webp" className="w-full h-full object-cover object-center" alt="" />
                                </SwiperSlide>
                                <SwiperSlide className="overflow-hidden">
                                    <img src="/assets/haruna-buntut3.webp" className="w-full h-full object-cover object-top" alt="" />
                                </SwiperSlide>
                                <SwiperSlide className="overflow-hidden">
                                    <img src="/assets/haruna-buntut2.webp" className="w-full h-full object-cover object-center" alt="" />
                                </SwiperSlide>
                                <button ref={seriesSliderNavBtn} className="z-10 absolute w-full h-full left-0 top-0 bg-transparent"></button>
                            </Swiper>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
