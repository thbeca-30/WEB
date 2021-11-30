import React, {useContext, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useState} from "react"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    useEffect(() =>{
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHanlder = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {}
    }
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e) {}

    }
    return(
        <div className="ts1">
            <div>
                <h2 className="txt3">Fashion</h2>
                        <span className="txt2">Авторизация</span>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="vvod"
                                    value={form.email}
                                    onChange={changeHanlder}
                                />
                                <label htmlFor="email" className="txt2">Email</label>
                            <div className="input-field2">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="vvod"
                                    value={form.password}
                                    onChange={changeHanlder}
                                />
                                <label htmlFor="email" className="txt2">Пароль</label>
                            </div>


                    <div className="card-action">
                        <button
                            className="buttonAuth"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="buttonAuth"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}