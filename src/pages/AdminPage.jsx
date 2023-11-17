import {useEffect, useState} from "react";
import axios from "axios";

export const AdminPage = () => {
    const [sidebarUtils, setSidebarUtils] = useState({
        product: false,
        category: false,
        event: false,
    })
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const handleLeft = () => setLeft(!left)
    const handleRight = () => setRight(!right)
    const handleSidebarClick = events => {
        events.target.ariaValueText === 'product'
            ? setSidebarUtils({
                product: true, category: false, event: false
            })
            : events.target.ariaValueText === 'category'
                ? setSidebarUtils({
                    product: false, category: true, event: false

                })
                : setSidebarUtils({
                    product: false, category: false, event: true

                })
    }
    const [formInput, setFormInput] = useState({
        username: '',
        password: ''
    })

    const handleUnameInput = haha => {
        setFormInput(prevState => ({
            ...prevState,
            username: haha.target.value
        }))
    }
    const handlePasswInput = haha => {
        setFormInput(prevState => ({
            ...prevState,
            password: haha.target.value
        }))
    }
    const formSubmit = async (hehe) => {
        const username = formInput.username
        const password = formInput.password
        hehe.preventDefault()
        await axios.post('http://127.0.0.1:8000/api/admin-login',{
            username: username,
            password: password
        })
            .then((response)=> console.log(response.status))
            .catch(response => {
                
            })
    }
    return (
        <>
            {/*{kataNime.map((item, index) => (*/}
            {/*    <div key={index}>*/}
            {/*        <p>*/}
            {/*            {item.character}*/}
            {/*        </p>*/}
            {/*        <p>*/}
            {/*            {item.anime}*/}
            {/*        </p>*/}
            {/*        <div className="border-2 border-black w-full"></div>*/}
            {/*    </div>*/}
            {/*))}*/}
            <form onSubmit={formSubmit} className="">
                <label>
                    Username
                    <input type="text" onChange={handleUnameInput} />
                </label>
                <input id="password-input" onChange={handlePasswInput}/>
                <label htmlFor="password-input">Password </label>
                <button type="submit">BUB</button>
            </form>


            {/*<div className="">*/}
            {/*    <nav className="sticky top-0 bg-green-500 w-full h-16 border-violet-900 flex items-center justify-center">*/}
            {/*        NAVBAR*/}
            {/*    </nav>*/}
            {/*    <ul className="shadow-sm shadow-zinc-900 fixed top-16 bottom-0 w-16 bg-zinc-50 flex flex-col gap-y-1 divide-y-2 divide-zinc-900 items-center">*/}
            {/*        <li className="mt-2 p-3">*/}
            {/*            <button value="product" onClick={handleSidebarClick}>*/}
            {/*                <i aria-valuetext="product"*/}
            {/*                   className={`${sidebarUtils.product ? 'bi bi-bag-fill' : 'bi bi-bag'} text-xl`}>*/}
            {/*                </i>*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*        <li className="p-3">*/}
            {/*            <button value="category" onClick={handleSidebarClick}>*/}
            {/*                <i aria-valuetext="category"*/}
            {/*                   className={`${sidebarUtils.category ? 'bi bi-hdd-rack-fill' : 'bi bi-hdd-rack'} text-xl`}>*/}
            {/*                </i>*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*        <li className="p-3">*/}
            {/*            <button value="event" onClick={handleSidebarClick}>*/}
            {/*                <i aria-valuetext="event"*/}
            {/*                   className={`${sidebarUtils.event ? 'bi bi-calendar2-event-fill' : 'bi bi-calendar2-event'} text-xl `}>*/}
            {/*                </i>*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*        <div className="w-12"></div>*/}
            {/*        <li className="absolute bottom-3 p-3 order-last">*/}
            {/*            <button value="event" onClick={handleSidebarClick}>*/}
            {/*                <i className="bi bi-box-arrow-left text-xl"></i>*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*    <div className="ml-16 w-[100%-4rem] min-h-full flex flex-row border-2 border-blue-800">*/}
            {/*        <div className={`${left ? 'basis-0 border-none' : 'basis-2/12'} flex items-center justify-center transition-basis ease-in-out duration-[400ms] overflow-hidden border-2 border-fuchsia-800`}>*/}
            {/*            DETAILS / FORM INPUT*/}
            {/*        </div>*/}
            {/*        <div className="basis-auto flex-1 flex justify-start items-center transition-basis ease-in-out duration-[400ms] border-2 border-blue-800">*/}
            {/*            <button onClick={handleLeft} className="border-2 border-black">*/}
            {/*                LEFT*/}
            {/*            </button>*/}
            {/*            <button onClick={handleRight} className="border-2 border-black">*/}
            {/*                RIGHT*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div className={`${right ? 'basis-0 border-none' : 'basis-3/12'} flex items-center justify-center transition-basis ease-in-out duration-[400ms] overflow-hidden border-2 border-fuchsia-800`}>*/}
            {/*            DETAILS / FORM INPUT*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}