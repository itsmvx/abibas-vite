import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
export const HomeViewMobile = () => {
    return (
        <>
            <div className="flex flex-col mt-[10vh] w-full h-[90vh]">
                <div className="order-last basis-1/2 w-full h-full bg-white flex flex-col">
                    <div className="basis-1/6 mx-6 flex-none flex items-center">
                        <h1 className="text-4xl text-black font-bold tracking-tighter">
                            Kurodate Haruna Series
                        </h1>
                    </div>
                    <div className="basis-5/6 flex-none flex flex-col mx-6 gap-y-2 overflow-hidden text-ellipsis">
                        <h1 className="mt-2 font-semibold text-xl">READY, SET GO!</h1>
                        <p className="text-ellipsis overflow-hidden text-sm">
                            She buntut looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.

                            She buntut looks at the atmosphere of her meals, how they are prepared, what ingredients and tools are used, where she eats. The idea is that through all of this, her food will taste even better.
                        </p>
                        <a href="/"
                           className="w-fit text-center mx-auto px-3 py-2 my-auto bg-black text-white">
                            SEE GALLERY <i className="bi bi-caret-right"></i>
                        </a>
                    </div>
                </div>
                <div className="flex-1 w-full h-full bg-white">
                    <div className="mx-auto my-10 aspect-[4/3] w-[90%] rounded-md overflow-hidden">
                        <Swiper
                            style={{
                                "--swiper-navigation-color" : "#A0029"
                            }}
                            className="mySwiper w-full h-full"
                            loop={true}
                            modules={[EffectFade, Navigation, Autoplay]}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            effect={'fade'}
                            navigation={true}
                        >
                            <SwiperSlide className="overflow-hidden">
                                <img src="/assets/haruna-banner.webp" className="w-full h-full object-cover object-center" alt="" loading="lazy"/>
                            </SwiperSlide>
                            <SwiperSlide className="overflow-hidden">
                                <img src="/assets/haruna-buntut3.webp" className="w-full h-full object-cover object-top" alt="" loading="lazy"/>
                            </SwiperSlide>
                            <SwiperSlide className="overflow-hidden">
                                <img src="/assets/haruna-buntut2.webp" className="w-full h-full object-cover object-center" alt="" loading="lazy"/>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center w-full h-auto bg-white">
                <div className="relative aspect-[1.85/1] w-full h-full overflow-hidden text-white font-sans">
                    <img src="/assets/haloFest-run.jpg" alt="..." className="w-full h-full object-cover brightness-[60%]"/>
                    <h1 className="absolute top-1/2 mx-5 text-xl font-extrabold italic">RUN YOUR RUN</h1>
                    <p className="absolute top-[62%] mx-5 text-[12px] font-semibold tracking-tighter ">
                        Get exclusive Kivotos Halo Festival Series for your amazing steps
                    </p>
                    <a href="/" className="absolute top-44 mx-5 text-sm text-black font-medium bg-white px-1.5 py-1.5 ring-[0.5px] ring-inset ring-black ">
                        SHOP NOW <i className="bi bi-arrow-right font-bold"></i>
                    </a>
                </div>
            </div>
        </>
    )
}