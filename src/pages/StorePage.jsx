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
import {fetchFeedsUpdate, fetchFeedsData, fetchProductsData} from "../utils/AxiosFetch.jsx";

export const StorePage = () => {
    const [mobileUtilsState, setMobileUtilsState] = useState({
        filterbar: false,
        searchbar: false,
    })
    const searchbarRef = useRef(null)
    const [searchbarAnimation, searchbarAnimationApi]
        = useSpring(()=>({
        from: {x: 0},
        to: {x: 0},
        config: {duration: 500},
    }))
    const handleSearchbarOpen = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            searchbar: true
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
    const handleSearchbarClose = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            searchbar: false,
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
    const handleFilterbarOpen = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            filterbar: true
        }))
    }
    const handleFilterbarClose = () => {
        setMobileUtilsState(prevState => ({
            ...prevState,
            filterbar: false,
        }))
    }
    const [sortState, setSortState] = useState({
        isVisible: false,
        value: 'featured'
    })
    const handleSortValue = payload => {
        setSortState({
            isVisible: false,
            value: payload
        })
    }
    const handleSortVisibility = () => {
        setSortState((prevState) => ({
            ...prevState,
            isVisible: !sortState.isVisible
        }))
    }

    useEffect(() => {
        const sortData = () => {
            storeDispatch({ type: storeAction.productsSortStart })
            const newData = [...storeState.productsData]
            switch (sortState.value) {
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
            setTimeout(() => {
                collageAnimationApi.start({
                    from: { opacity: 0, transform: 'scale(0.96)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                    config: {duration: 300}
                })
                storeDispatch({ type: storeAction.productsSortEnd, payload: newData})
            }, 600)
        }
        sortData()
    }, [sortState.value]);
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
    useEffect(() => {
        const axiosAbortController = new AbortController();
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
        search: 'search',
        categories: 'categories',
        gender: 'gender',
        price: 'price'
    }
    let [storeSearchParams, setStoreSearchParams] = useSearchParams({})
    const handleChangeSearchParams = (action) => {
        switch (action.type) {
            case searchParamsAction.search:
                storeSearchParams.set('search', action.payload)
                break
            case searchParamsAction.categories:
                storeSearchParams.set('categories', action.payload)
                break
            case searchParamsAction.gender:
                storeSearchParams.set('gender', action.payload)
                break
            case searchParamsAction.price:
                storeSearchParams.set('min', action.payload.min)
                storeSearchParams.set('max', action.payload.max)
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
        const fetchProducts = async () => {
            const searchParams = {}
            storeSearchParams.forEach((value, key) => {
                searchParams[key] = value
            })
            await fetchProductsData(searchParams)
                .then((response) => {
                    response.data.data.length === 0
                        ? storeDispatch({
                            type: storeAction.productsFetchNotFound
                        })
                        : storeDispatch({
                            type: storeAction.productsFetchSuccess,
                            payload: response.data.data
                        })
                })
                .catch(() => {
                    storeDispatch({ type: storeAction.productsFetchError })
                })
        }
        if (storeState.wasLoaded){
            storeDispatch({ type: storeAction.productsFetchStart })
            fetchProducts()
        }
    }, [storeSearchParams])

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
    }, [storeSearchParams])

    const storeAction = {
        wasLoaded: 'was-loaded',
        productsFetchStart: 'products-fetch-start',
        productsFetchNotFound: 'products-fetch-not-found',
        productsFetchError: 'products-fetch-error',
        productsFetchSuccess: 'products-fetch-success',
        productsSortStart:'products-sort-start',
        productsSortEnd:'products-sort-end',
        productsFilterStart: 'products-search-start',
        productsFilterResult: 'products-search-result',
        productsFilterEnd: 'products-search-end',
        feedsFetchError: 'feeds-fetch-error',
        feedsFetchSuccess: 'feeds-fetch-success',
    }
    const storeReducer = (state, action) => {
        switch (action.type){
            case storeAction.wasLoaded:
                return {
                    ...state,
                    wasLoaded: true
                }
            case storeAction.productsFetchStart:
                return {
                    ...state,
                    isLoading: true,
                    isNotFound: false,
                    productsData: []
                }
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
            case storeAction.productsFetchError:
                return {
                    ...state,
                    productsData: StudentData.slice(0,40),
                    isError: true,
                    isLoading: false
                }
            case storeAction.productsFetchNotFound:
                return {
                    ...state,
                    productsData: [],
                    isNotFound: true,
                    isLoading: false
                }
            case storeAction.productsFetchSuccess:
                return {
                    ...state,
                    productsData: action.payload,
                    isLoading: false,
                }
            case storeAction.productsSortStart:
                return {
                    ...state,
                    isLoading: true
                }
            case storeAction.productsSortEnd:
                return {
                    ...state,
                    productsData: action.payload,
                    isLoading: false
                }
            default:
                return state
        }
    }
    const [storeState, storeDispatch] = useReducer(storeReducer, {
        wasLoaded: false,
        isLoading: true,
        isError: false,
        isNotFound: false,
        feedsLastUpdate: localStorage.getItem('storeFeedsUpdate')
            ? JSON.parse(localStorage.getItem('storeFeedsUpdate'))
            : '1970-01-01 00:00:00',
        feedsData: localStorage.getItem('storeFeedsData')
            ? JSON.parse(localStorage.getItem('storeFeedsData'))
            : [],
        productsData: []
    })
    useEffect(() => {
        document.title = 'Abibas | Store'
        let newLastUpdate = ''
        const handleFeedsError = (error) => {
            console.error(error)
            storeDispatch({ type: storeAction.feedsFetchError })
            localStorage.removeItem('storeFeedsData')
            localStorage.removeItem('storeFeedsUpdate')
        }
        const fetchStoreData = async () => {
            await fetchFeedsUpdate()
                .then((response) => newLastUpdate = response.data.data)
                .catch((error) => handleFeedsError(error))
            if (newLastUpdate !== storeState.feedsLastUpdate){
                await fetchFeedsData()
                    .then((response) => {
                        localStorage.setItem('storeFeedsUpdate', JSON.stringify(newLastUpdate))
                        localStorage.setItem('storeFeedsData', JSON.stringify(response.data.data))
                        storeDispatch({
                            type: storeAction.feedsFetchSuccess,
                            payload: {
                                lastUpdate: newLastUpdate,
                                feedsData: response.data.data
                            }
                        })
                    })
                    .catch((error) => handleFeedsError(error))
            }
            await fetchProductsData()
                .then((response) => {
                    storeDispatch({
                        type: storeAction.productsFetchSuccess,
                        payload: response.data.data
                    })
                })
                .catch(() => storeDispatch({ type: storeAction.productsFetchError }))
        }
        fetchStoreData()
        storeDispatch({ type: storeAction.wasLoaded })
    }, [])
    const [collageAnimation, collageAnimationApi] = useSprings(
        storeState.productsData.length,
        () => ({
            from: { opacity: 0, transform: 'scale(0.95)' },
            to: { opacity: 1, transform: 'scale(1)' },
            config: {duration: 300}
        }),
        [storeState.productsData]
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
    const contextValues = {
        mobileUtilsState,
        searchbarRef,
        searchbarAnimation,
        handleSearchbarOpen,
        handleSearchbarClose,
        handleFilterbarOpen,
        handleFilterbarClose,
        sortState,
        handleSortValue,
        handleSortVisibility,
        storeSearchParams,
        searchParamsAction,
        handleChangeSearchParams,
        handleDeleteSearchParams,
        storeHeadingText,
        searchingState,
        handleSearchingStart,
        handleSearchingCancel,
        storeState,
        collageAnimation,
        collageDetailAnimation,
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
                        <Suspense fallback={<LoadingView />}>
                            <StoreCollage/>
                        </Suspense>
                    </div>
                </div>
            </StoreContext.Provider>
        </>
    )
}