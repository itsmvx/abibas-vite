import {PropTypes} from "prop-types";
import {useRef, useContext} from "react";
import {animated} from "@react-spring/web";
import StoreContext from "./StoreContext.jsx";
export const StoreCollage = () => {
    
    const {
        collageAnimation,
        collageDetailAnimation,
        handleCollageHoverIn,
        handleCollageHoverOut,
        data,
        collageElementRefs,
    } = useContext(StoreContext)

    const defaultCollage = () => {
        return collageAnimation.map((props,index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            collageElementRefs.current[index] = useRef(null)
            return (
                <animated.div key={index} style={props} className="relative basis-[45%] md:basis-2/5 lg:basis-[32%] mx-auto md:mx-0 w-full bg-white aspect-[4/5] overflow-hidden hover:scale-105 transition-scale hover:duration-300 shadow-sm shadow-zinc-400"
                              onMouseEnter={()=> handleCollageHoverIn(index)}
                              onMouseLeave={handleCollageHoverOut}>
                    <div className="w-full aspect-[4/3] overflow-hidden">
                        <img src={data[index].photoUrl} className="w-full h-full object-cover" alt=".."/>
                    </div>
                    <animated.div
                        style={collageDetailAnimation[index]}
                        ref={collageElementRefs.current[index]}
                        className="absolute hidden top-[59.5%] bottom-0 w-full h-full z-10 overflow-hidden"
                    >
                        <div className="w-full h-full mx-auto bg-fuchsia-400 flex justify-center">

                        </div>
                    </animated.div>

                    <div className="absolute top-2/3 bottom-0 w-full flex flex-col">
                        <div className="basis-3/5 w-11/12 mx-auto">
                            <h1 className="my-auto text-black font-bold text-sm md:text-base tracking-tight">{data[index].names.lastName} {data[index].names.firstName}</h1>
                        </div>
                        <div className="basis-2/5 flex-none w-11/12 mx-auto text-xs md:text-sm">
                            Rp.69000
                        </div>
                    </div>
                </animated.div>
            )
        })
    }

    return (
        <>
            <div className="w-[97%] h-full mt-3.5 flex flex-row flex-wrap items-start justify-start md:justify-center lg:justify-start gap-y-6 gap-3 md:gap-y-6 md:gap-x-10 lg:gap-y-10 lg:gap-x-4 mx-auto">
                {defaultCollage()}
            </div>
        </>
    )
}

StoreCollage.propTypes = {
    sortState: PropTypes.string,
}