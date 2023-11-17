import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import {useRef} from "react";
import {Link} from "react-router-dom";
import {DefaultHomeSeries} from "../../lib/StaticDataLib.jsx";
import {ImagesNoa} from "../../lib/ImageLib.jsx";

export const HomeSeriesBanner = () => {
    const seriesSliderNavBtn = useRef(null)
    return (
        <>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row w-full h-full md:h-96 gap-y-5 gap-x-2">
                <div className="basis-1/2 flex flex-col order-last md:order-first min-h-full gap-y-2">
                    <div className="basis-1/3 flex flex-col gap-y-1 items-start justify-center md:justify-end flex-none indent-10">
                        <h1 className="mx-auto md:mx-0 text-3xl md:text-4xl text-black font-bold tracking-tighter">
                            {DefaultHomeSeries.noa.tittle}
                        </h1>
                        <p className="mx-auto md:mx-0 font-medium md:ml-0.5 text-xl">
                            {DefaultHomeSeries.noa.slug}
                        </p>
                    </div>
                    <p className="basis-auto flex-1 mx-10 mb-1 text-ellipsis overflow-hidden text-sm md:text-base tracking-tighter">
                        {DefaultHomeSeries.noa.description}
                    </p>
                    <Link to="/" className="order-last basis-10 ml-10 w-32 md:w-36 text-center p-3 md:p-0 md:px-2.5 md:py-2 bg-black text-sm md:text-base text-white">
                        SEE GALLERY <i className="bi bi-caret-right"></i>
                    </Link>
                </div>

                <div className="basis-1/2 flex items-center justify-center overflow-hidden">
                    <div className="w-96 md:w-[27rem] lg:w-[30rem] aspect-[4/3]">
                        <Swiper
                            className="relative w-full h-full"
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
                            {
                                ImagesNoa.map((image, index) => ((
                                    <SwiperSlide key={index} className="">
                                        <img src={image}
                                             alt=".."
                                             className="w-full h-full object-cover object-center"
                                        />
                                    </SwiperSlide>
                                )))
                            }
                            <button ref={seriesSliderNavBtn} className="z-10 absolute w-full h-full left-0 top-0 bg-transparent"></button>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}
