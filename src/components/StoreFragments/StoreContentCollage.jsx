import {PropTypes} from "prop-types";
import {useState, useEffect, useRef} from "react";
import {useSprings, animated} from "@react-spring/web";
import StudentData from "../../lib/StudentData.jsx";
export const StoreContentCollage = ({sortState, storeSearchParams, setStoreSearchParams}) => {
    const [data, setData] = useState(StudentData.slice(0,20))
    const [indexCollageHover, setIndexCollageHover] = useState(-1)
    const elementRefs = useRef([])
    const [collageAnimation, collageAnimationApi] = useSprings(
        data.length,
        () => ({
            from: { filter: 'contrast(30%)' },
            to: { filter: 'contrast(100%)' },
            config: { duration: 550 }
        }),
        [data, sortState]
    )
    const [collageDetailAnimation, collageDetailAnimationApi] = useSprings(
        data.length,
        () => ({
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: { duration: 400 }
        })
    )

    const handleCollageHoverIn = indexKey => {
        elementRefs.current[indexKey].current.classList.remove('hidden')
        collageDetailAnimationApi.start(i => i === indexKey && {
            from: { opacity: 0, y : 300 },
            to: { opacity: 1, y : 0 },
            config: { duration: 250 }
        })
        setIndexCollageHover(indexKey);
    };
    const handleCollageHoverOut = () => {
        setTimeout(()=>{
            elementRefs.current[indexCollageHover].current.classList.add('hidden')
        },180)

        collageDetailAnimationApi.start(i => i === indexCollageHover && {
            from: { y : 0 },
            to: { y : 300 },
            config: { duration: 200 }
        })
        setIndexCollageHover(-1)
    }

    useEffect(() => {
        const sortData = () => {
            const newData = [...data]
            switch (sortState){
                case 'ascending' :
                    newData.sort((a,b)=> a.names.lastName < b.names.lastName ? -1 : 1)
                    break
                case 'descending' :
                    newData.sort((a,b) => a.names.lastName > b.names.lastName ? -1 : 1 )
                    break
                case 'cheap' :
                    newData.sort((a,b) => a.birthday < b.birthday ? -1 : 1 )
                    break
                case 'expensive' :
                    newData.sort((a,b) => a.age < b.age ? -1 : 1 )
                    break
                default :
                    newData.sort((a,b) => a.school < b.school ? -1 : 1 )
                    break
            }
            collageAnimationApi.start({
                from: { filter: 'contrast(30%)' },
                to: { filter: 'contrast(100%)' },
                config: { duration: 550 }
            });
            setData(newData)
        }
        sortData()
    }, [sortState]);

    const defaultCollage = () => {
        return collageAnimation.map((props,index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            elementRefs.current[index] = useRef(null)
            return (
                <animated.div key={index} style={props} className="relative basis-2/5 lg:basis-[32%] mx-auto md:mx-0 my-auto bg-white aspect-[4/5] overflow-hidden hover:border-[1.5px] hover:border-black hover:scale-105 transition-scale hover:duration-300"
                              onMouseEnter={()=> handleCollageHoverIn(index)}
                              onMouseLeave={handleCollageHoverOut}>
                    <div className="w-full aspect-[4/3] overflow-hidden">
                        <img src={data[index].photoUrl} className="w-full h-full object-cover" alt=".."/>
                    </div>
                    <animated.div
                        style={collageDetailAnimation[index]}
                        ref={elementRefs.current[index]}
                        className="absolute hidden top-[59.5%] bottom-0 w-full h-full z-10 overflow-hidden"
                    >
                        <div className="w-full h-full mx-auto bg-fuchsia-400 flex justify-center">

                        </div>
                    </animated.div>

                    <div className="absolute top-2/3 bottom-0 w-full flex flex-col">
                        <div className="basis-3/5 w-11/12 mx-auto">
                            <h1 className="my-auto text-black font-bold">{data[index].names.lastName} {data[index].names.firstName}</h1>
                        </div>
                        <div className="basis-2/5 flex-none w-11/12 mx-auto">
                            nsnfsn
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

StoreContentCollage.propTypes = {
    sortState: PropTypes.string,
    storeSearchParams: PropTypes.object,
    setStoreSearchParams: PropTypes.func,
}