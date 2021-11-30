import React, {useEffect} from "react"
import {useMessage} from "../hooks/message.hook"
import {useHttp} from "../hooks/http.hook"
import {Slider} from "../components/slide"
import {Footer} from "../components/Footer"

export const HomePage = () => {
    const message = useMessage()
    const {error, clearError} = useHttp()
    useEffect(() => {
        message(error)
        clearError()
    }, [message, error, clearError])
    return(
        <div>
            <Slider />

        </div>
    )
}