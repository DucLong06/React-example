import axios from 'axios'
import queryString from 'query-string'
import { _IApiResponse } from '../interfaces/IApiResponse'
import { _IBodyError } from '../interfaces/IBodyError'

var headers: any
if (!localStorage.getItem('token')) {
    headers = { 'content-type': 'multipart/form-data' }
} else {
    headers = {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
}

const axiosUpload = axios.create({
    baseURL: process.env.REACT_APP_URL_BE || "/",
    headers,
    paramsSerializer: (params) => queryString.stringify(params)
})

axiosUpload.interceptors.request.use(async (config) => {
    return config
})

axiosUpload.interceptors.response.use(
    (response) => {
        const apiResponse: _IApiResponse = {
            status: response.status,
            body: response.data
        }
        return apiResponse
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.removeItem('token')
            localStorage.removeItem('storagePassword')
            window.location.href = '/auth'
        }

        // Handle errors
        let bodyError: _IBodyError
        try {
            bodyError = {
                errorCode: error.response.data.errorCode,
                message: error.response.data.message
            }
        } catch (e) {
            bodyError = {
                errorCode: 700,
                message: 'Unknow error, please try again later'
            }
        }

        const apiResponse: _IApiResponse = {
            status: error.response.status,
            body: bodyError
        }
        return apiResponse
    }
)
export default axiosUpload
