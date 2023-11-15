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

    let ubedzApi = 'http://127.0.0.1:8000'
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
        isCanceled: false,
        isNotFound: false,
        isError: false,
        searchValue: '',
        searchData: [],
    })
    const handleSearchingStart = async (searchValue) => {
        const searchVal = searchValue.target.value
        if (searchVal === '') {
            setSearchingState({
                isSearching: false,
                isCanceled: false,
                isNotFound: false,
                isError: false,
                searchValue: '',
                searchData: [],
            })
        } else {
            setSearchingState({
                isSearching: true,
                isCanceled: false,
                isNotFound: false,
                isError: false,
                searchValue: searchVal,
                searchData: [],
            })
        }
    }
    const handleSearchingCancel = () => {
        setSearchingState({
            isSearching: false,
            isCanceled: true,
            isNotFound: false,
            isError: false,
            searchValue: '',
            searchData: [],
        })
    }
    useEffect(() => {
        const axiosAbortController = new AbortController();
        const fetchSearchRequest = async searchVal => {
            try {
                const response
                    = await axios.get(ubedzApi + '/api/search-products', {
                    params: {
                        search: searchVal,
                    },
                    signal: axiosAbortController.signal,
                    timeout: 6000,
                });
                const resSeriesIsEmpty = response.data.data.series.length === 0
                const resProductsIsEmpty = response.data.data.products.length === 0
                if (resSeriesIsEmpty && resProductsIsEmpty) {
                    setSearchingState((prevState) => ({
                        ...prevState,
                        isNotFound: true,
                    }));
                } else {
                    setSearchingState((prevState) => ({
                        ...prevState,
                        searchData: response.data.data,
                    }));
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching data', error);
                    setSearchingState((prevState) => ({
                        ...prevState,
                        isSearching: false,
                        isNotFound: false,
                        isError: true,
                        searchValue: '',
                        searchData: [],
                    }));
                }
            }
        };

        if (searchingState.isSearching && !searchingState.isCanceled) {
            fetchSearchRequest(searchingState.searchValue);
        }

        return () => {
            axiosAbortController.abort()
        }
    }, [searchingState.isSearching, searchingState.isCanceled, searchingState.searchValue]);


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

    // <--> STORE SEARCH <--> //
    const searchbarRef = useRef(null)
    const [searchbarAnimation, searchbarAnimationApi] = useSpring(()=>({
        from: {x: 0},
        to: {x: 0},
        config: {duration: 500},
    }))
    // <--> END OF STORE SEARCH <--> //

    // <--> STORE NAVBAR <--> //
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [sortState, setSortState] = useState('featured')
    const [sortMenuAnimation, SortMenuAnimationApi]
        = useSpring(() => ({
            from: {y: 0},
            to: {y: 0},
            config: {duration: 300}
        })
    ,[isSortMenuOpen])
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
    useEffect(() => {
        const sortData = () => {
            const newData = [...collageData]
            switch (sortState) {
                case 'ascending' :
                    newData.sort((a, b) => a.name < b.name ? -1 : 1)
                    break
                case 'descending' :
                    newData.sort((a, b) => a.name > b.name ? -1 : 1)
                    break
                case 'cheap' :
                    newData.sort((a, b) => a.price < b.price ? -1 : 1)
                    break
                case 'expensive' :
                    newData.sort((a, b) => a.price > b.price ? -1 : 1)
                    break
                default :
                    newData.sort((a, b) => a.idProduk > b.idProduk ? -1 : 1)
                    break
            }
            collageAnimationApi.start({
                from: {opacity: 0, filter: 'contrast(50%)'},
                to: {opacity: 1, filter: 'contrast(100%)'},
                config: {duration: 700},
            });
            setCollageData(newData)
        }
        sortData()
    }, [sortState]);
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

    // <--> FILTER SERIES FEED -->
    const [seriesFeedState, setSeriesFeedState] = useState({
        isLoading: true,
        isError: false
    })
    const [seriesFeedData, setSeriesFeedData] = useState(
        localStorage.getItem('storeSeriesFeed')
            ? JSON.parse(localStorage.getItem('storeSeriesFeed'))
            : []
    )
    // <--> END OF FILTER SERIES FEED -->

    // <--> STORE COLLAGE <--> //
    const [collageState, setCollageState] = useState({
        isLoading: true,
        isError: false,
        lastUpdate: localStorage.getItem('storeLastUpdate')
            ? JSON.parse(localStorage.getItem('storeLastUpdate'))
            : ''
    })
    const [collageData, setCollageData] = useState(
        localStorage.getItem('storeProductsData')
            ? JSON.parse(localStorage.getItem('storeProductsData'))
            : []
    )
    const [collageAnimation, collageAnimationApi]
        = useSprings(
        collageData.length,
        () => ({
            from: { opacity: 0, transform: 'scale(0.95)' },
            to: { opacity: 1, transform: 'scale(1)' },
            config: {duration: 300}
        }),
        [collageData]
    )
    const [collageDetailAnimation, collageDetailAnimationApi]
        = useSprings(
        collageAnimation.length,
        () => ({
            transform: 'translateY(0%)',
            config: {duration: 210},
        }),
        [collageAnimation]
    )
    const handleCollageHoverIn = indexKey => {
        collageDetailAnimationApi.start(i => i === indexKey && {
            transform: 'translateY(-40.5%)',
            config: {duration: 210},
        })
    }
    const handleCollageHoverOut = indexKey => {
        collageDetailAnimationApi.start(i => i === indexKey && {
            transform: 'translateY(100%)',
            config: {duration: 210},
        })
    }
    useEffect(() => {
        document.title = 'Abibas : Store';
        const fetchStoreUpdate = async () => {
            try {
                const response
                = await  axios.get(ubedzApi + '/api/store-update')

                setCollageState({
                    isLoading: false,
                    isError: false,
                    lastUpdate: response
                })
                localStorage.setItem('storeLastUpdate', JSON.stringify(response))
            }
            catch (error){
                setCollageState({
                    isLoading: true,
                    isError: true,
                    lastUpdate: '1970-01-01 00:00:00'
                })
                localStorage.removeItem('storeLastUpdate')
            }
        }
        const fetchSeriesFeed = async () => {
            try {
                const response
                = await axios.get(ubedzApi + '/api/latest-series')

                setSeriesFeedState({
                    isLoading: false,
                    isError: false,
                })
                setSeriesFeedData(response.data.data)
                localStorage.setItem('storeSeriesFeed', JSON.stringify(response.data.data))
            }catch (error){
                setSeriesFeedState({
                    isLoading: true,
                    isError: true,
                })
            }
        }
        const fetchCollageData = async () => {
            try {
                const response
                    = await axios.get(ubedzApi + '/api/products', {
                    timeout: 6000,
                })
                setCollageState({
                    isLoading: false,
                    isError: false,
                })
                setCollageData(response.data.data)
                localStorage.setItem('storeProductsData', JSON.stringify(response.data.data))
            } catch (error) {
                setCollageState({
                    isLoading: false,
                    isError: true,
                })
                setCollageData(StudentData.slice(0, 20))
                localStorage.removeItem('storeProductsData')
            }
        }
        fetchStoreUpdate().catch(()=>console.log)
        collageData.length === 0 && fetchCollageData()
        seriesFeedData.length === 0 && fetchSeriesFeed()
    }, []);

    // <--> END OF STORE COLLAGE <--> //

    const contextValues = {
        ubedzApi,
        mobileUtilsState,
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
        handleSearchingCancel,
        handleFilterOpen,
        handleFilterClose,
        searchingState,
        setSearchingState,
        searchModalRef,
        searchbarRef,
        searchbarAnimation,
        seriesFeedState,
        seriesFeedData,
        collageState,
        setCollageState,
        collageData,
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