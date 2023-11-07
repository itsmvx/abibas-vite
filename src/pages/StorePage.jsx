import {Suspense, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {useSpring, useSprings} from "@react-spring/web";
import StudentData from "../Utils/StudentData.jsx";
import StoreContext from "../components/StoreComponents/StoreContext.jsx";
import {StoreNavbar} from "../components/StoreComponents/StoreNavbar.jsx";
import {StoreFilterbar} from "../components/StoreComponents/StoreFilterbar.jsx";
import {StoreSearchbar} from "../components/StoreComponents/StoreSearchbar.jsx";
import {LoadingView} from "../Utils/LoadingView.jsx";
import {StoreCollage} from "../components/StoreComponents/StoreCollage.jsx";

export const StorePage = () => {

    let ubedzApi = 'http://192.168.0.150:8000'
    // <--> STORE Universal <---> //
    const [mobileUtilsState, setMobileUtilsState] = useState({
        filter: false,
        search: false,
    })

    const searchModalRef = useRef(null)
    let [storeSearchParams, setStoreSearchParams] = useSearchParams('')
    const [storeHeadingText, setStoreHeadingText] = useState('')
    const [searchingState, setSearchingState] = useState({
        isSearching: false,
        isNotFound: false,
        isError: false,
        searchData: [],
    })
    const handleSearchingStart = searchValue => {
        const searchVal = searchValue
        if (searchVal === '') {
            setSearchingState({
                isSearching: false,
                isNotFound: false,
                isError: false,
                searchData: [],
            })
        }
        else {
            setSearchingState({
                isSearching: true,
                isNotFound: false,
                isError: false,
                searchData: [],
            })
            axios
                .get(ubedzApi + '/api/search-products', {
                    params: {
                        search: searchVal,
                    },
                    timeout: 8000,
                })
                .then((response) => {
                    response.data.data.length === 0
                        ? setSearchingState(prevState => ({
                            ...prevState,
                            isNotFound: true
                        }))
                        : setSearchingState((prevState) => ({
                            ...prevState,
                            searchData: response.data.data,
                        }))
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setSearchingState({
                        isSearching: false,
                        isNotFound: false,
                        isError: true,
                        searchData: [],
                    })
                })
        }
    }

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
    // <--> END OF STORE Universal <--> //

    //STORE SEARCH
    const searchbarRef = useRef(null)
    const [searchbarAnimation, searchbarAnimationApi] = useSpring(()=>({
        from: {x: 0},
        to: {x: 0},
        config: {duration: 500},
    }))

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
        setMobileUtilsState(prevState => ({
            ...prevState,
            search: true
        }))
        searchbarAnimationApi.start({
            from: {x: 1000},
            to: {x: 0},
            config: {duration: 400},
            onStart: ()=>{
                searchbarRef.current.classList.remove('hidden')
                searchbarRef.current.classList.add('block')
            }
        })
    }
    const handleSearchClose = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            search: false,
        }))
        searchbarAnimationApi.start({
            from: {x: 0},
            to: {x: 1000},
            config: {duration: 400},
            onRest: ()=>{
                searchbarRef.current.classList.add('hidden')
                searchbarRef.current.classList.add('block')
            }
        })
    }
    const handleFilterOpen = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            filter: true
        }))
    }
    const handleFilterClose = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            filter: false,
        }))
    }

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
    }
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
    useEffect(() => {
        document.title = 'Abibas : Store'
    }, []);

    const contextValues = {
        mobileUtilsState,
        searchingState,
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
        handleSearchingStart,
        handleFilterOpen,
        handleFilterClose,
        searchModalRef,
        searchbarRef,
        searchbarAnimation,
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
                <div className="flex flex-row relative h-[90vh] md:h-[85vh]">
                    <StoreFilterbar />
                    <StoreSearchbar/>
                    <div className="basis-full md:basis-4/5 bg-gray-50 overflow-y-scroll">
                        <Suspense fallback={<LoadingView/>}>
                            <StoreCollage/>
                        </Suspense>
                    </div>
                </div>
            </StoreContext.Provider>
        </>
    )
}