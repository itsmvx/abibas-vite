import {Link} from "react-router-dom";

export const StoreFilterbar = () => {

    return (
        <>
            <div className="basis-1/5 hidden md:block overflow-y-auto">
                <div className="mt-5 mx-auto w-9/12 flex flex-col gap-y-5 text-base font-semibold text-zinc-800">
                    <ul className="flex flex-col gap-y-5">
                        <li className="text-2xl font-bold select-none">Series for You</li>
                        <Link className="hover:font-bold text-black" to="/" >Ahmad Roblok</Link>
                        <Link className="hover:font-bold text-black" to="/" >Java Spring Boot</Link>
                        <Link className="hover:font-bold text-black" to="/" >Sunda Autumn Sneakers</Link>
                        <Link className="hover:font-bold text-black" to="/" >Sepatu Rahmat</Link>
                    </ul>
                    <div className="w-full h-[1px] bg-black"></div>
                    <div className="flex flex-col gap-y-2">
                        <button className="text-left font-bold flex justify-between">
                            Categories <i className="bi bi-chevron-down text-lg text-black"></i>
                        </button>
                        <form className="flex flex-col gap-y-2">
                            <div className="flex justify-between mr-0.5">
                                <label>Sepatu</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Topi</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Euphylia</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Orang</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Sepatu</label>
                                <input type="checkbox"/>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <button className="text-left font-bold flex justify-between">
                            Genders <i className="bi bi-chevron-down text-lg text-black"></i>
                        </button>
                        <form className="flex flex-col gap-y-2">
                            <div className="flex justify-between mr-0.5">
                                <label>All</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Men</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Women</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>Kid</label>
                                <input type="checkbox"/>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-y-2 pb-10">
                        <button className="text-left font-bold flex justify-between">
                            Shop By Price <i className="bi bi-chevron-down text-lg text-black"></i>
                        </button>
                        <form className="flex flex-col gap-y-2">
                            <div className="flex justify-between mr-0.5">
                                <label>{`< 1.000.000`}</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>{`1.000K - 2.000K`}</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>{`2.001K - 4.000K`}</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>{`2.001K - 4.000K`}</label>
                                <input type="checkbox"/>
                            </div>
                            <div className="flex justify-between mr-0.5">
                                <label>{`> 4.000.000`}</label>
                                <input type="checkbox"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}