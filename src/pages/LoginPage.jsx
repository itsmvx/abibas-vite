import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate()
    const [formField, setFormField] = useState({
        username: '',
        password: '',
        isShowPassword: false,
    })
    const [submitState, setSubmitState] = useState({
        isSubmit: false,
        isError: false,
    })
    const handleUsernameInput = event => {
        setSubmitState(prevState => ({
            ...prevState,
            isError: false,
        }))
        setFormField(prevState => ({
            ...prevState,
            username: event.target.value,
        }))
    }
    const handlePasswordInput = event => {
        setSubmitState(prevState => ({
            ...prevState,
            isError: false,
        }))
        setFormField(prevState => ({
            ...prevState,
            password: event.target.value,
        }))
    }
    const handleShowPassword = () => setFormField(prevState => ({
        ...prevState,
        isShowPassword: !formField.isShowPassword,
    }))
    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitState(prevState => ({
            ...prevState,
            isSubmit: true,
        }))
        await axios.post('http://127.0.0.1:8000/api/admin-login',{
            username: formField.username,
            password: formField.password,
        })
            .then((response) => {
                const token = response.data.token
                document.cookie = `sessionToken=${token}; max-age=3600`
                navigate('/admin/dashboard', {replace: true})
            } )
            .catch(()=>{
                setSubmitState({
                    isSubmit: false,
                    isError: true,
                })
                setFormField(prevstate => ({
                    ...prevstate,
                    password: '',
                }))
            })
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col gap-y-4 items-center justify-center bg-zinc-100">
                <div className="w-auto h-auto flex items-center justify-center">
                    <img src="/assets/abibas-logo.webp" className="w-1/3 h-full object-cover object-center" alt=""/>
                </div>
                <h1 className="text-center text-2xl font-bold">Sign in to continue</h1>
                <div className="relative w-96 h-96 rounded-lg bg-white shadow-md shadow-zinc-400">
                    <form onSubmit={handleSubmit} className="relative w-full h-full flex flex-col justify-center items-center gap-y-6">
                        { submitState.isError ? (
                            <h1 className="absolute top-12 tracking-tight text-red-600 font-semibold text-base text-center">
                                Username atau Password salah!
                            </h1>
                        ): <></> }

                        <div className="flex flex-col w-72">
                            <label className="font-bold text-sm">Username</label>
                            <input
                                type="text" name="username"
                                value={formField.username}
                                className="w-full border-b-2 border-b-zinc-800 outline-none"
                                onChange={handleUsernameInput}
                            />
                        </div>
                        <div className="flex flex-col w-72 relative">
                            <label className="font-bold text-sm">Password</label>
                            <input
                                type={formField.isShowPassword ? 'text' : 'password'} name="password"
                                value={formField.password}
                                className="w-full border-b-2 border-b-zinc-800 outline-none"
                                onChange={handlePasswordInput}
                            />
                            <button type="button" onClick={handleShowPassword}
                                    className="absolute top-1/2 -translate-y-1/2 right-2">
                                <i className={`bi bi-eye-${formField.isShowPassword ? 'slash-fill' : 'fill'}`}></i>
                            </button>
                        </div>
                        <button type="submit" className="w-72 p-2 rounded-md text-white bg-black">
                            {submitState.isSubmit ? (
                                <div className="w-6 h-6 rounded-full mx-auto border-4 border-white border-r-transparent animate-spin">

                                </div>) : 'Login'}
                        </button>
                    </form>
                    <div className="absolute bottom-5 left-11 text-sm tracking-tighter font-medium">
                        Not an Admin?
                        <a href="/" className="ml-1 underline underline-offset-4">Take me to Home</a>
                    </div>
                </div>
            </div>
        </>
    )
}