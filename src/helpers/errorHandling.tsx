import store from '../redux/store'
import {tokenExpired} from 'pages/login/actions/expired'

import i18n from 'i18next'
import {protectedApiClient} from './api'
import {errorPopup} from "../components/SwalPopup/swalPopup";

export const getApiErrorCode = (error: any) => {
    let errorCode = 'Errors_Unknown'

    if (error && error.message === 'Network Error') {
        return 'Errors_Network'
    }

    if (!error || !error.response) {
        return 'Errors_Unknown'
    }

    if (error.response.status === 401) {
        return '' // no error message
    }

    errorCode = 'Errors_ServerUnknown'

    if (error.response.status === 403) {
        errorCode = 'Errors_NoPermission'
    }

    return errorCode
}

export const handleApiError = (error: any) => {
    if (error.response) {
        // Server errors
        if (error.response.status !== 403 || error.response.status !== 401) {
            console.log(error.response.data)
        }
    } else {
        // Local errors
        if (error.message !== 'Network Error') {
            console.log('err:', error)
        }
    }
}

export const handleApiErrorWithNotification = (error: any) => {
    if (error.response) {
        const response = error.response.data
        if (error.response.status === 400) {
            errorFunc(response)
        }
        if (error.response.status === 401) {
            let message = {
                name: 'Auth Error',
                message: 'expired'
            }
            errorFunc(message)
            return store.dispatch(tokenExpired())
        }
        if (error.response.status === 403) {
            let message = {
                name: 'Forbidden',
                message: 'cord_vpn_error'
            }
            errorFunc(message)
            protectedApiClient.get('/user/get-self')
                .then(response => {
                    if (response.status !== 200) {
                        let message1 = {
                            name: 'Forbidden',
                            message: 'Server is not reachable!'
                        }
                        errorFunc(message1)
                        return store.dispatch(tokenExpired())
                    } else {
                        errorFunc(response)
                    }
                })
                .catch(error => {
                    console.log('error', error.message)
                    return
                })
        }
        if (error.response.status === 404) {
            errorFunc(response)
        }
        if (error.response.status === 422) {
            errorFunc(response)
        }
        if (error.response.status === 500) {
            errorFunc(response)
        }
    }
}

const errorFunc = (response) => {
    if (Array.isArray(response)) {
        response.map((val: { field?: string; message: string }, i: number) => {
            return setTimeout(
                () =>
                    errorPopup(val.field, val.message),
                i * 2000,
            )
        })
    } else {
        errorPopup(response.name, response.message)
    }
}
