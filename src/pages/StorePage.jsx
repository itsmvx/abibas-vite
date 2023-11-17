import {Suspense, useEffect, useReducer, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {useSpring, useSprings} from "@react-spring/web";
import StudentData from "../lib/StudentDataLib.jsx";
import StoreContext from "../components/StoreComponents/StoreContext.jsx";
import {StoreNavbar} from "../components/StoreComponents/StoreNavbar.jsx";
import {StoreFilterbar} from "../components/StoreComponents/StoreFilterbar.jsx";
import {StoreSearchbar} from "../components/StoreComponents/StoreSearchbar.jsx";
import {LoadingView} from "../utils/LoadingView.jsx";
import {StoreCollage} from "../components/StoreComponents/StoreCollage.jsx";
import {DefaultStoreFeeds} from "../lib/StaticDataLib.jsx";

export const StorePage = () => {
    // <--> STORE Universal <---> //
    const searchModalRef = useRef(null)
    const [mobileUtilsState, setMobileUtilsState] = useState({
        filter: false,
        search: false,
    })

    const searchingAction = {
        start: 'start',
        cancel: 'cancel',
        reset: 'reset',
        success: 'success',
        error: 'error',
        notFound: 'not-found'
    }
    const searchingReducer = (state, action) => {
        switch (action.type){
            case searchingAction.start:
                return {
                    isSearching: true,
                    isCanceled: false,
                    isNotFound: false,
                    isError: false,
                    searchValue: action.payload,
                    searchData: [],
                }
            case searchingAction.cancel:
                return {
                    isSearching: false,
                    isCanceled: true,
                    isNotFound: false,
                    isError: false,
                    searchValue: '',
                    searchData: [],
                }
            case searchingAction.reset:
                return {
                    isSearching: false,
                    isCanceled: false,
                    isNotFound: false,
                    isError: false,
                    searchValue: '',
                    searchData: [],
                }
            case searchingAction.success:
                return {
                    ...state,
                    searchData: action.payload
                }
            case searchingAction.error:
                return {
                    ...state,
                    isError: true
                }
            case searchingAction.notFound:
                return {
                    ...state,
                    isNotFound: true
                }
            default:
                return state;
        }
    }
    const [searchingState, searchingDispatch ] = useReducer(searchingReducer, {
        isSearching: false,
        isCanceled: false,
        isNotFound: false,
        isError: false,
        searchValue: '',
        searchData: [],
    })
    const handleSearchingStart = event => {
        event.target.value === ''
            ? searchingDispatch({type: searchingAction.reset})
            : searchingDispatch({type: searchingAction.start, payload: event.target.value})
    }
    const handleSearchingCancel = () => searchingDispatch({ type: searchingAction.cancel })

    const axiosAbortController = new AbortController();
    useEffect(() => {
        const fetchSearchRequest = async searchVal => {
            try {
                const response
                    = await axios.get(import.meta.env.VITE_API_URL + '/api/search-products', {
                    params: {
                        search: searchVal,
                    },
                    signal: axiosAbortController.signal,
                    timeout: 6000,
                });
                const resultNotFound = response.data.data.series.length === 0 && response.data.data.products.length === 0
                if (resultNotFound) {
                    searchingDispatch({ type: searchingAction.notFound })
                } else {
                    searchingDispatch({ type: searchingAction.success, payload: response.data.data })
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching data', error);
                    searchingDispatch({ type: searchingAction.error })
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

    const searchParamsAction = {
        categories: "categories",
        gender: "gender",
        price: "price"
    }
    let [storeSearchParams, setStoreSearchParams] = useSearchParams({})
    const handleChangeSearchParams = (action) => {
        switch (action.type) {
            case searchParamsAction.categories:
                storeSearchParams.set("categories", action.payload)
                break
            case searchParamsAction.gender:
                storeSearchParams.set("gender", action.payload)
                break
            case searchParamsAction.price:
                storeSearchParams.set("min", action.payload.min)
                storeSearchParams.set("max", action.payload.max)
                break
        }
        setStoreSearchParams(storeSearchParams)
    }
    const handleDeleteSearchParams = (action) => {
        switch (action.type) {
            case searchParamsAction.categories:
                storeSearchParams.delete("categories")
                break
            case searchParamsAction.gender:
                storeSearchParams.delete("gender")
                break
            case searchParamsAction.price:
                storeSearchParams.delete("min")
                storeSearchParams.delete("max")
                break
        }
        setStoreSearchParams(storeSearchParams)
    }
    useEffect(() => {
        setStoreSearchParams(storeSearchParams)
    }, [storeSearchParams]);
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

        setStoreHeadingText(`Search of "${headingText}"`)
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
            const newData = [...storeState.productsData]
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
            storeDispatch({ type: storeAction.productsSortUpdate, payload: newData})
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

    // <--> STORE STATE <--> //
    const storeAction = {
        productsFetchStart: 'products-fetch-start',
        productsFetchError: 'products-fetch-error',
        productsFetchSuccess: 'products-fetch-success',
        productsSortUpdate: 'products-sort-update',
        productsFilterStart: 'products-search-start',
        productsFilterResult: 'products-search-result',
        productsFilterEnd: 'products-search-end',
        feedsFetchError: 'feeds-fetch-error',
        feedsFetchSuccess: 'feeds-fetch-success',
    }
    const storeReducer = (state, action) => {
        switch (action.type){
            case storeAction.feedsFetchError:
                return {
                    ...state,
                    feedsData: [...DefaultStoreFeeds],
                }
            case storeAction.feedsFetchSuccess:
                return {
                    ...state,
                    feedsLastUpdate: action.payload.lastUpdate,
                    feedsData: action.payload.feedsData
                }
            case storeAction.productsFetchStart:
                return {
                    ...state,
                    isLoading: true
                }
            case storeAction.productsFetchError:
                return {
                    ...state,
                    productsData: StudentData.slice(0,40),
                    isLoading: false
                }
            case storeAction.productsFetchSuccess:
                return {
                    ...state,
                    productsData: action.payload,
                    isLoading: false,
                }
            case storeAction.productsSortUpdate:
                return {
                    ...state,
                    productsData: action.payload
                }
            case storeAction.productsFilterStart:
                return {
                    ...state,
                    isFiltering: true,
                }
            case storeAction.productsFilterResult:
                return {
                    ...state,
                    isFiltering: false,
                    productsData: action.payload
                }
            case storeAction.productsFilterEnd:
                return {
                    ...state,
                    isFiltering: false,
                }
            default:
                return state
        }
    }
    const [storeState, storeDispatch] = useReducer(storeReducer, {
        isLoading: true,
        isError: false,
        isFiltering: false,
        feedsLastUpdate: localStorage.getItem('storeFeedsUpdate')
            ? JSON.parse(localStorage.getItem('storeFeedsUpdate'))
            : '1970-01-01 00:00:00',
        feedsData: localStorage.getItem('storeFeedsData')
            ? JSON.parse(localStorage.getItem('storeFeedsData'))
            : [],
        productsData: StudentData.slice(0,40)
    })
    useEffect(() => {
        document.title = 'Abibas | Store';
        const fetchFeedsData = async newLastUpdate => {
            try {
                const response
                    = await axios.get(import.meta.env.VITE_API_URL + '/api/latest-seriess')
                storeDispatch({
                    type: storeAction.feedsFetchSuccess,
                    payload: {
                        lastUpdate: newLastUpdate,
                        feedsData: response.data.data
                    }
                })
                localStorage.setItem('storeFeedsUpdate', JSON.stringify(newLastUpdate))
            } catch (error){
                storeDispatch({ type: storeAction.feedsFetchError })
                localStorage.removeItem('storeFeedsData')
                localStorage.removeItem('storeFeedsUpdate')
            }
        }
        const fetchProductsData = async () => {
            try {
                const response
                    = await axios.get(import.meta.env.VITE_API_URL + '/api/products', {
                    timeout: 6000,
                })
                storeDispatch({
                    type: storeAction.productsFetchSuccess,
                    payload: response.data.data
                })
            } catch (error) {
                storeDispatch({ type: storeAction.productsFetchError })
            }
        }
        const fetchStoreData = () => {
            axios.get(import.meta.env.VITE_API_URL + '/api/store-update')
                .then((response)=>{
                    const newLastUpdate = response.data.data
                    if (newLastUpdate > storeState.lastUpdate){
                        fetchFeedsData(newLastUpdate)
                    }
                })
                .catch(()=>{
                    storeDispatch({ type: storeAction.feedsFetchError })
                    localStorage.removeItem('storeFeedsUpdate')
                })
            fetchProductsData()
        }
        storeDispatch({ type: storeAction.productsFetchStart })
        fetchStoreData()
    }, [])

    useEffect(() => {
        const fetchSearchProducts = async (searchParams) => {
            try {
                const response
                    = await axios.get(import.meta.env.VITE_API_URL, '/products', {
                    params: searchParams
                })
                storeDispatch({
                    type: storeAction.productsFilterResult,
                    payload: response.data.data
                })
            } catch (error) {
                storeDispatch({type: storeAction.productsFilterEnd})
            }
            storeDispatch({type: storeAction.productsFilterEnd})
        }
        storeDispatch({type: storeAction.productsFilterStart})
        const searchParams = {}
        storeSearchParams.forEach((value, key) => {
            searchParams[key] = value
        })
        fetchSearchProducts(searchParams)
    }, [storeSearchParams])

    const [collageAnimation, collageAnimationApi]
        = useSprings(
        storeState.productsData.length,
        () => ({
            from: { opacity: 0, transform: 'scale(0.95)' },
            to: { opacity: 1, transform: 'scale(1)' },
            config: {duration: 300}
        }),
        [storeState.collageData]
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
    // <--> END OF STORE PAGE STATE <--> //

    const contextValues = {
        mobileUtilsState,
        storeSearchParams,
        setStoreSearchParams,
        searchParamsAction,
        handleChangeSearchParams,
        handleDeleteSearchParams,
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
        searchModalRef,
        searchbarRef,
        searchbarAnimation,
        storeState,
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