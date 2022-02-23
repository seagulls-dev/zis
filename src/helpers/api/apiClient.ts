import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_ROOT,
})

axiosInstance.interceptors.request.use(async (config) => {
	try {
		config.headers = {
			// language: `${getLanguage()}`,
			...config.headers,
		}
	} catch (e) {
		console.log(e)
	}

	return config
})

export default {
	get<T>(url: string, config?: object) {
		return axiosInstance.get<T>(url, config)
	},
	post<T>(url: string, data: any) {
		return axiosInstance.post<T>(url, data)
	},
	put<T>(url: string, data: any) {
		return axiosInstance.put<T>(url, data)
	},
	patch<T>(url: string, data: any) {
		return axiosInstance.patch<T>(url, data)
	},
	delete(url: string) {
		return axiosInstance.delete(url)
	},
}
