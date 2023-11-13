import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import StoreContext from "./StoreContext.jsx";

export const StoreFilterbar = () => {
    const {
        seriesFeedState,
        seriesFeedData,
        ubedzApi,
    } = useContext(StoreContext)
    const [filterOption, setFilterOption] = useState({
        categories: false,
        genders: false,
        prices: false,
    })
    const [categoryFilterOption, setCategoryFilterOption] = useState('all')
    const [gendersFilterOption, setGendersFilterOption] = useState('all')
    const [pricesFilterOption, setPricesFilterOption] = useState({
        value: 'price-all',
        isValid: true,
        min: 0,
        max: 99999999999,
    })

    const handleFilter = event => {
        setFilterOption(prevState => ({
            ...prevState,

        }))
        event.target.value === 'categories-option'
            ? setFilterOption(prevState=> ({
                ...prevState,
                categories: !filterOption.categories,
            }))
            : event.target.value === 'genders-option'
                ? setFilterOption(prevState => ({
                    ...prevState,
                    genders: !filterOption.genders,

                }))
                : setFilterOption(prevState => ({
                    ...prevState,
                    prices: !filterOption.prices,
                }))
    }
    const handleCategoryFilter = event => {
        event.target.value === categoryFilterOption
            ? setCategoryFilterOption('all')
            : setCategoryFilterOption(event.target.value)
    }
    const handleGendersFilter = event => {
        event.target.value === gendersFilterOption
            ? setGendersFilterOption('all')
            : setGendersFilterOption(event.target.value)
    }
    const handlePricesFilter = event => {
        event.target.value === pricesFilterOption.value
            ? setPricesFilterOption({
                value: 'price-all',
                isValid: true,
                min: 0,
                max: 99999999999
            })
            : event.target.value === 'price-sm'
                ? setPricesFilterOption({
                    value: 'price-sm',
                    isValid: true,
                    min: 0,
                    max: 999999
                })
                : event.target.value === 'price-md'
                    ? setPricesFilterOption({
                        value: 'price-md',
                        isValid: true,
                        min: 1000000,
                        max: 1999999
                    })
                    : event.target.value === 'price-lg'
                        ? setPricesFilterOption({
                            value: 'price-lg',
                            isValid: true,
                            min: 2000000,
                            max: 3999999
                        })
                        : setPricesFilterOption({
                            value: 'price-specify',
                            isValid: false,
                            min:0,
                            max:0
                        })
    }
    const handleMinPriceSpecifyInput = event => {
        setPricesFilterOption(prevState => ({
            ...prevState,
            min: event.target.valueAsNumber
        }))
    }
    const handleMaxPriceSpecifyInput = event => {
        setPricesFilterOption(prevState => ({
            ...prevState,
            max: event.target.valueAsNumber ,
            isValid: (event.target.valueAsNumber  > pricesFilterOption.min),
        }))
    }
    return (
        <>
            <div className="basis-1/5 hidden md:block overflow-y-auto pb-5">
                <div className="mt-5 mx-auto w-9/12 flex flex-col gap-y-5 text-base font-semibold text-zinc-800">
                    <ul className="flex flex-col gap-y-5">
                        <li className="text-2xl font-bold select-none">Series for You</li>
                        {
                            seriesFeedState.isError
                                ? <>
                                    <Link className="hover:font-bold text-black" to="/" >Ahmad Roblok</Link>
                                    <Link className="hover:font-bold text-black" to="/" >Java Spring Boot</Link>
                                    <Link className="hover:font-bold text-black" to="/" >Sunda Autumn Sneakers</Link>
                                    <Link className="hover:font-bold text-black" to="/" >Sepatu Rahmat</Link>
                                </>
                                : seriesFeedData.map((items, index) => ((
                                    <Link key={index} className="hover:font-bold text-black uppercase"
                                          to={`/series/${items.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                        {items.name}
                                    </Link>
                                )))
                        }

                    </ul>
                    <div className="w-full h-[1px] bg-black"></div>
                    <div className="flex flex-col gap-y-2">
                        <button value="categories-option" onClick={handleFilter}
                            className="text-left font-bold flex justify-between">
                            Categories<i className={`bi ${filterOption.categories ? 'bi-chevron-up' : 'bi-chevron-down'} text-lg text-black`}></i>
                        </button>
                        <form className={`flex flex-col gap-y-2 ${filterOption.categories? 'max-h-96' : 'max-h-0'} overflow-hidden transition-max-h duration-500 ease-in-out`}>
                            <label className="flex justify-start">
                                All
                                <input type="checkbox" value="all"
                                       onChange={handleCategoryFilter}
                                       checked={categoryFilterOption === "all"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                Euphy
                                <input type="checkbox" value="euphy"
                                       onChange={handleCategoryFilter}
                                       checked={categoryFilterOption === "euphy"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                Sakurako
                                <input type="checkbox" value="sakurako"
                                       onChange={handleCategoryFilter}
                                       checked={categoryFilterOption === "sakurako"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label> <label className="flex justify-start">
                                Mika
                                <input type="checkbox" value="mika"
                                       onChange={handleCategoryFilter}
                                       checked={categoryFilterOption === "mika"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label> <label className="flex justify-start">
                                Mari
                                <input type="checkbox" value="mari"
                                       onChange={handleCategoryFilter}
                                       checked={categoryFilterOption === "mari"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>

                        </form>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <button value="genders-option" onClick={handleFilter}
                            className="text-left font-bold flex justify-between hover:font-extrabold">
                            Gender<i className={`bi ${filterOption.genders ? 'bi-chevron-up' : 'bi-chevron-down'} text-lg text-black`}></i>
                        </button>
                        <form className={`flex flex-col gap-y-2 ${filterOption.genders? 'max-h-96' : 'max-h-0'} overflow-hidden transition-max-h duration-500 ease-in-out`}>
                            <label className="flex justify-start">
                                All
                                <input type="checkbox" value="all"
                                       onChange={handleGendersFilter}
                                       checked={gendersFilterOption === "all"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                Men
                                <input type="checkbox" value="men"
                                       onChange={handleGendersFilter}
                                       checked={gendersFilterOption === "men"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                Women
                                <input type="checkbox" value="women"
                                       onChange={handleGendersFilter}
                                       checked={gendersFilterOption === "women"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label> <label className="flex justify-start">
                                Kid
                                <input type="checkbox" value="kid"
                                       onChange={handleGendersFilter}
                                       checked={gendersFilterOption === "kid"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label>
                        </form>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <button value="prices-option" onClick={handleFilter}
                            className="text-left font-bold flex justify-between hover:font-extrabold">
                            Shop by Price<i className={`bi ${filterOption.prices ? 'bi-chevron-up' : 'bi-chevron-down'} text-lg text-black`}></i>
                        </button>
                        <form className={`flex flex-col gap-y-2 ${filterOption.prices? 'max-h-96' : 'max-h-0'} overflow-hidden transition-max-h duration-500 ease-in-out`}>
                            <label className="flex justify-start">
                                {`All`}
                                <input type="checkbox" value="price-all"
                                       onChange={handlePricesFilter}
                                       checked={pricesFilterOption.value === "price-all"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                {`< 1.000.000`}
                                <input type="checkbox" value="price-sm"
                                       onChange={handlePricesFilter}
                                       checked={pricesFilterOption.value === "price-sm"}
                                       className="ml-auto w-3.5  accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                {`1.000K - 1.999K`}
                                <input type="checkbox" value="price-md"
                                       onChange={handlePricesFilter}
                                       checked={pricesFilterOption.value === "price-md"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                {`2.000K - 3.999K`}
                                <input type="checkbox" value="price-lg"
                                       onChange={handlePricesFilter}
                                       checked={pricesFilterOption.value === "price-lg"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label>
                            <label className="flex justify-start">
                                Specify on my own
                                <input type="checkbox" value="price-specify"
                                       onChange={handlePricesFilter}
                                       checked={pricesFilterOption.value === "price-specify"}
                                       className="ml-auto w-3.5 accent-black"
                                />
                            </label>
                            <div className={`${pricesFilterOption.value === 'price-specify' ? 'max-h-96' : 'max-h-0'} flex flex-col md:gap-y-4 lg:gap-y-2 overflow-hidden transition-max-h ease-in-out duration-300`}>
                                <div className="relative text-sm col-span-full flex flex-col lg:flex-row items-center justify-between">
                                    <label htmlFor="min-specifyPriceInput">From</label>
                                    <input id="min-specifyPriceInput" type= "number"
                                           inputMode="numeric" maxLength={5} placeholder="e.g: 1000"
                                           onChange={handleMinPriceSpecifyInput}
                                           className="md:w-4/5 lg:w-3/5 border-b-[1px] border-black indent-1 text-base py-0.5 focus:outline-none"
                                    />
                                </div>
                                <div className="relative text-sm col-span-full flex flex-col lg:flex-row items-center justify-between">
                                    <label htmlFor="max-specifyPriceInput">To</label>
                                    <input id="max-specifyPriceInput" type= "number"
                                           inputMode="numeric" maxLength={5} placeholder="e.g: 1200"
                                           onChange={handleMaxPriceSpecifyInput}
                                           className="md:w-4/5 lg:w-3/5 border-b-[1px] border-black indent-1 text-base py-0.5 focus:outline-none"
                                    />
                                </div>
                                <div className="col-span-2 flex items-end justify-center">
                                    <button className="opacity-100 scale-125 cursor-pointer disabled:opacity-60 disabled:scale-100 disabled:cursor-auto transition-scale ease-in-out duration-300"
                                            disabled={!pricesFilterOption.isValid}>
                                        <i className="bi bi-check2-circle text-2xl"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}