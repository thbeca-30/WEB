import React, {useContext} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

export const Navbar = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history("/", {replace: true})
    }
    return(
        <div>
            <div className="header">Fashion</div>
            <ul className="menu">
                <li className="elem"><NavLink to="/products">Список товаров</NavLink></li>
                <li className="elem"><a href="/catalog">Каталог товаров</a></li>
                <li className="elem"><a href="/cart">Корзина</a></li>
                <li className="elem"><a href="/order">Заказы</a></li>
                <li className="elem"><a href="/about">О нас</a></li>
                <li className="elem"><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    )
}