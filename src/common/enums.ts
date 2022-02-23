export enum PROTOCOL_ENUM {
	VHOST_HTTP_1 = 'http/1',
	VHOST_HTTP_2 = 'http/2',
	VHOST_HTTP_3 = 'http/3',
}

export enum WEBSERVER_ENUM {
	APACHE_2_2 = 'apache2-2',
	APACHE_2_4_PREFORK = 'apache2-4-prefork',
	APACHE_2_4_EVENT = 'apache2-4-event',
	NGINX_1 = 'nginx1',
}

export enum BACKEND_ENUM {
	STATIC = 'static',
	PHP_PREFORK = 'php_prefork',
	PHP_FPM_5_6 = 'php_fpm_5-6',
	PHP_FPM_7_0 = 'php_fpm_7-0',
	PHP_FPM_7_2 = 'php_fpm_7-2',
	PHP_FPM_7_3 = 'php_fpm_7-3',
	PHP_FPM_7_4 = 'php_fpm_7-4',
	PHP_FPM_8_0 = 'php_fpm_8-0',
	RUBY_PUMA = 'ruby_puma',
}

export enum VALIDATE_STATUS_ENUM {
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error',
	VALIDATION = 'validating',
}

export enum FILTER_PERIOD_ENUM {
	'ACT_HALF',
	'ACT_MONTH',
	'ACT_QUARTER',
	'ACT_YEAR',
	'FIRST_HALF_AGO',
	'PREV_MONTH',
	'PREV_QUARTER',
	'PREV_YEAR',
	'SECOND_HALF_AGO',
	'TWO_MONTH_AGO',
	'TWO_QUARTER_AGO',
	'TWO_YEAR_AGO',
	'THIRD_HALF_AGO',
	'THREE_MONTH_AGO',
	'THREE_QUARTER_AGO',
	'THREE_YEAR_AGO',
	'MONTH_BEFORE_YEAR',
	'QUARTER_BEFORE_YEAR',
}

export const CZECH_VAT_ENUM = Object.freeze({
	21: '21%',
	15: '15%',
	5: '5%',
	0: '0%',
})

export enum CURRENCY_ENUM {
	CZK = 'CZK',
	EUR = 'EUR',
	USD = 'USD',
	BAM = 'BAM',
	HRK = 'HRK',
	HUF = 'HUF',
}

export enum UNIT_ENUM {
	MB = 'MB',
	GB = 'GB',
	TB = 'USTBD',
	MHZ = 'MHz',
	KS = 'KS',
}
