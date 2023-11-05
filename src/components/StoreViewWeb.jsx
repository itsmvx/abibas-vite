import { Suspense, useEffect, useRef, useState } from "react";
import { useSpring, useSprings } from "@react-spring/web";
import { useSearchParams } from "react-router-dom";
import { LoadingView } from "../lib/LoadingView.jsx";
import StudentData from "../lib/StudentData.jsx";
import StoreContext from "./StoreContext.jsx";
import { StoreNavbar } from "./StoreFragments/StoreNavbar.jsx";
import { StoreFilterbar } from "./StoreFragments/StoreFilterbar.jsx";
import { StoreContentCollage } from "./StoreFragments/StoreContentCollage.jsx";

export const StoreViewWeb = () => {
    // <--> STORE Universal <---> //
    const [utilityState, setUtilityState] = useState({
        filter: false,
        search: false,
    })
    let [storeSearchParams, setStoreSearchParams] = useSearchParams('')
    const [storeHeadingText, setStoreHeadingText] = useState('')
    useEffect(() => {
        let headingText
        storeSearchParams.get('series')
            ? storeSearchParams.get('category')
                ? headingText = storeSearchParams.get('series').concat(' ', storeSearchParams.get('category'))
                : headingText = storeSearchParams.get('series')
            : storeSearchParams.get('category')
                ? headingText = storeSearchParams.get('category')
                : headingText = 'ABIBAS STORE'

        setStoreHeadingText(headingText)
    }, [storeSearchParams]);
    // <--> END OF STORE Universal <---> //

    // <--> STORE NAVBAR <--> //
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [sortState, setSortState] = useState('featured')
    const [sortMenuAnimation, SortMenuAnimationApi]
        = useSpring(() => ({
            from: {y: 0},
            to: {y: 0},
            config: {duration: 300}
        })
    )
    const handleSort = sort => {
        setSortState(sort)
        setIsSortMenuOpen(false)
    }
    const handleSortMenu = () => {
        setIsSortMenuOpen(!isSortMenuOpen)
        SortMenuAnimationApi.start(() => ({
            from: {y: isSortMenuOpen ? 0 : -10},
            to: {y: isSortMenuOpen ? -30 : 0},
            config: {duration: 150}
        }))
    }
    const handleSearchOpen = () => {
        setUtilityState(prevState => ({
            ...prevState,
            search: true
        }))
    }
    const handleSearchClose = () => {
        setUtilityState(prevState => ({
            ...prevState,
            search: false,
        }))
    }
    const handleFilterOpen = () => {
        setUtilityState(prevState => ({
            ...prevState,
            filter: true
        }))
    }
    const handleFilterClose = () => {
        setUtilityState(prevState => ({
            ...prevState,
            filter: false,
        }))
    }


    //STORE SIDEBAR
    const sidebarRef = useRef(null)
    const sidebarAnimation = useSpring({
        from: {x: utilityState.filter || utilityState.search ? 1000 : 0},
        to: {x: utilityState.filter || utilityState.search ? 0 : 1000},
        config: {duration: 500},
    })


    // STORE COLLAGE
    const [data, setData] = useState(StudentData.slice(0, 20))
    const [indexCollageHover, setIndexCollageHover] = useState(-1)
    const collageElementRefs = useRef([])
    const [collageAnimation, collageAnimationApi] = useSprings(
        data.length,
        () => ({
            from: {filter: 'contrast(30%)'},
            to: {filter: 'contrast(100%)'},
            config: {duration: 550}
        }),
        [data, sortState]
    )
    const [collageDetailAnimation, collageDetailAnimationApi] = useSprings(
        data.length,
        () => ({
            from: {opacity: 0},
            to: {opacity: 1},
            config: {duration: 400}
        })
    )

    const handleCollageHoverIn = indexKey => {
        collageElementRefs.current[indexKey].current.classList.remove('hidden')
        collageDetailAnimationApi.start(i => i === indexKey && {
            from: {opacity: 0, y: 300},
            to: {opacity: 1, y: 0},
            config: {duration: 250}
        })
        setIndexCollageHover(indexKey);
    };
    const handleCollageHoverOut = () => {
        setTimeout(() => {
            collageElementRefs.current[indexCollageHover].current.classList.add('hidden')
        }, 180)

        collageDetailAnimationApi.start(i => i === indexCollageHover && {
            from: {y: 0},
            to: {y: 300},
            config: {duration: 200}
        })
        setIndexCollageHover(-1)
    }

    useEffect(() => {
        const sortData = () => {
            const newData = [...data]
            switch (sortState) {
                case 'ascending' :
                    newData.sort((a, b) => a.names.lastName < b.names.lastName ? -1 : 1)
                    break
                case 'descending' :
                    newData.sort((a, b) => a.names.lastName > b.names.lastName ? -1 : 1)
                    break
                case 'cheap' :
                    newData.sort((a, b) => a.birthday < b.birthday ? -1 : 1)
                    break
                case 'expensive' :
                    newData.sort((a, b) => a.age < b.age ? -1 : 1)
                    break
                default :
                    newData.sort((a, b) => a.school < b.school ? -1 : 1)
                    break
            }
            collageAnimationApi.start({
                from: {filter: 'contrast(30%)'},
                to: {filter: 'contrast(100%)'},
                config: {duration: 550}
            });
            setData(newData)
        }
        sortData()
    }, [sortState]);

    const contextValues = {
        utilityState,
        setUtilityState,
        storeSearchParams,
        setStoreSearchParams,
        storeHeadingText,
        setStoreHeadingText,
        isSortMenuOpen,
        setIsSortMenuOpen,
        sortState,
        setSortState,
        sortMenuAnimation,
        SortMenuAnimationApi,
        handleSort,
        handleSortMenu,
        handleSearchOpen,
        handleSearchClose,
        handleFilterOpen,
        handleFilterClose,
        sidebarRef,
        sidebarAnimation,
        data,
        setData,
        indexCollageHover,
        setIndexCollageHover,
        collageElementRefs,
        collageAnimation,
        collageAnimationApi,
        collageDetailAnimation,
        collageDetailAnimationApi,
        handleCollageHoverIn,
        handleCollageHoverOut,
    }


    return (
        <>
            <StoreContext.Provider value={contextValues}>
                <StoreNavbar/>
                <div className="flex flex-row relative h-[85vh]">
                    <StoreFilterbar/>
                    <div className="basis-full md:basis-4/5 bg-gray-50 overflow-y-scroll">
                        <Suspense fallback={<LoadingView/>}>
                            <StoreContentCollage/>
                        </Suspense>
                    </div>
                </div>
            </StoreContext.Provider>
        </>

    )
}