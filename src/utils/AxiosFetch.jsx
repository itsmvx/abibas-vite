import axios from "axios";

const fetchFeedsData = async () => {
    console.log(import.meta.env.VITE_API_URL)
    try {
        return await axios.get(import.meta.env.VITE_API_URL + '/api/latest-series')
    } catch (error){
        throw new Error('Error Fetching Feeds Data');
    }
}
const fetchFeedsUpdate = async () => {
    try {
        return await axios.get(import.meta.env.VITE_API_URL + '/api/store-update')

    } catch (error){
        throw new Error('Error Fetching Feeds Update');
    }
}
const fetchProductsData = async (searchParams = {}) => {
    try {
        return await axios.get(import.meta.env.VITE_API_URL + '/api/products', {
            params: searchParams
        })
    } catch (error) {
        throw new Error('Error Fetching Products Data');
    }
}
export {
    fetchFeedsData,
    fetchFeedsUpdate,
    fetchProductsData
}
