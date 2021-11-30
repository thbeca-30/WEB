import React, {useState, useEffect} from "react"
import slide1 from "../img/au1.jpg"
import slide2 from "../img/au2.jpg"
import slide3 from "../img/au3.jpg"
import slide4 from "../img/au4.jpg"

const img = [
    <img key={slide1} src={slide1} height="600" width="1300" alt=""/>,
    <img key={slide2} src={slide2} height="600" width="1300" alt=""/>,
    <img key={slide3} src={slide3} height="600" width="1300" alt=""/>,
    <img key={slide4} src={slide4} height="600" width="1300" alt=""/>,
]

export function Slider() {
// Индекс текущего слайда
    const [activeIndex, setActiveIndex] = useState(0);

// Хук Effect
    useEffect(() => {
        // Запускаем интервал
        const interval = setInterval(() => {
            // Меняем состояние
            setActiveIndex((current) => {
                // Вычисляем индекс следующего слайда, который должен вывестись
                const res = current === img.length - 1 ? 0 : current + 1
                // Возвращаем индекс
                return res
            })
        }, 3000)
        // Выключаем интервал
        return () => clearInterval()
    }, [])

// Вычисляем индекс предыдущего слайда
    const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
// Вычисляем индекс следующего слайда
    const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1
    return (
        <div className="slider">
            <div className="slider-img slider-img-prev"
                 key={prevImgIndex}>
                {img[prevImgIndex]}
            </div>
            <div className="slider-img"
                 key={activeIndex}>
                {img[activeIndex]}
            </div>
            <div className="slider-img slider-img-next"
                 key={nextImgIndex}>
                {img[nextImgIndex]}
            </div>
        </div>
    )
}