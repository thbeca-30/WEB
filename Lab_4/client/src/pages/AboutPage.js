import React from "react"
import image from '../img/au5.jpg'

export const AboutPage = () => {
    return(
        <div>
            <div className="vvod">
                <ul className="contacts">
                    <li>Г. Нижний Новгород, Ленинский район, река Ржавка</li>
                    <li>Телефон: 8-800-555-35-35</li>
                    <li>Почта: blablabla@gmail.com</li>
                    <li><a href="https://vk.com/thbeca_30">Наш ВК</a></li>
                </ul>
                <img src={image} alt="" />
            </div>
            <a href="/home" className="home">Вернуться на главную</a>
        </div>
    )
}