export const makeSlug = (str: string) => {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
}

export const getInitial = (name: string) => {
	return name
		.toUpperCase()
		.replace(/[^a-zA-Z- ]/g, '')
		.match(/\b\w/g)
}

export const capitalize = (str: string): string => {
	return str.toLowerCase().replace(/\b\w/g, function (m: string) {
		return m.toUpperCase()
	})
}

// password regex
export const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')

// password regex
export const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))')

export const IPv4RegexWithSubnet =
	'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(/([0-9]|[0-2][0-9]|3[0-2]))$'
export const IPv4Regex =
	'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'

export const IPv6RegexWithSubnet =
	'^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))(%.+)?s*(/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))$'
export const IPv6Regex =
	'^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$'

export const serializeParams = (params: {}) =>
	Object.keys(params)
		.map((key) => `${key}=${params[key]}`)
		.join('&')

export const IsJsonString = (str: string) => {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}