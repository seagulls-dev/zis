import {CustomerServiceDetails} from 'pages/billing/customerservice/models'
import {ProductDetails} from 'pages/billing/product/models'

export const arrayFromCount = (count: number): number[] => {
	return count ? [...Array.from(Array(count).keys(), (_, i) => i + 1)] : []
}

export const recursiveReturn = (obj: any, whatToReturn: string, newArr: number[] = []) => {
	newArr.unshift(obj[whatToReturn])
	if (obj.children !== null) {
		obj.children.forEach((v) => {
			recursiveReturn(v, whatToReturn) && newArr.unshift(v[whatToReturn])
		})
	}
	return newArr
}

const sortByPrevious = (arr: any[] | undefined) => {
	let parents = arr?.filter((x) => x.previous_id === null)
	let children = arr?.filter((x) => x.previous_id !== null)
	if (children && parents)
		for (let x of children) {
			let index = parents.findIndex((obj) => obj.id === x.previous_id)
      if (index === 0 || index) parents.splice(index + 1, 0, x)
		}
	return parents
}

export const convertToTree = (items: any[] | undefined, id = null, link = 'parent_id') =>
	sortByPrevious(items)
		?.filter((item) => item[link] === id)
		.map((item) => ({
			...item,
			children: convertToTree(items, item.id),
			key: item.id,
			value: item.id,
			title: item.name,
		}))
		.map((item) => (item.children.length ? {...item} : {...item, children: null}))

export function treeSearch(array: any[] | undefined, id: number, disableParent = false, disableChilds = false) {
	if (array) {
		for (let i = 0; i < array.length; i++) {
			if (disableParent && array[i].parent_id === null) {
				array[i].disabled = true
			}
			if (disableChilds) {
				array[i].children.map((v) => (v.disabled = true))
			}
			if (array[i].id === id) {
				return Array(array[i])
			} else if (array[i].children && array[i].children.length) {
				const result = treeSearch(array[i].children, id)
				if (result) {
					return Array(array[i])
				}
			}
		}
	}
}

export const disableProductsParents = (products) =>
	products.map((product) => ({
		...product,
		disabled: product.parent_id === null,
	}))

export const disableProductsChilds = (products) =>
	products.map((product) => ({
		...product,
		disabled: product.parent_id !== null,
	}))

//eslint-disable-next-line
export const combineToObject = (names: string[] | number[], values: string[] | number[]) => {
	let result = {}
	names.forEach((v: string | number, i: string | number) => {
		if (values[i]) result[names[i]] = values[i]
	})
	return result
}
//eslint-disable-next-line
const recursiveSearch = (
	arr: any,
	whatToSearch: string,
	searchValue: string | number,
	whatToReturn: string,
	newArr: any[] = [],
) => {
	arr[whatToSearch] === searchValue
		? newArr.push(arr[whatToReturn])
		: arr.children && arr.children.length && recursiveSearch(arr.children, whatToSearch, searchValue, whatToReturn)
	return newArr
}

export const sum = (array: any[], whatToSum: string) =>
	array && array.reduce((sum, current) => Number(sum) + Number(current[whatToSum]), 0)

interface NestedCustomerServiceDetails {
	customer_id: number
	title: number
	key: string | number
	children?: CustomerServiceDetails[]
	description?: string
	internal_note?: string
}

export const makeUniqToTree = (array: CustomerServiceDetails[] | undefined, products: ProductDetails[] | undefined) => {
	let arr: NestedCustomerServiceDetails[] = []
	let index: number | undefined = undefined
	array?.map((val) => {
		index = arr.findIndex((v) => val.customer_id === v.customer_id)
		if (arr.length && index > -1)
			arr[index].children?.push({
				...val,
				key: val.id,
			})
		else
			arr.push({
				customer_id: val.customer_id,
				title: val.customer_id,
				key: val.name,
				children: [
					{
						...val,
						key: val.id,
					},
				],
			})
	})
	return arr
}

export const makeArrayUniq = (array: any[] | undefined, uniqueBy: string) =>
	array?.reduce((unique, o) => {
		if (!unique.some((obj) => obj[uniqueBy] === o[uniqueBy])) {
			unique.push(o)
		}
		return unique
	}, [])

export const disableExistedValues = (firstArray: any[] | undefined, secondArray: any[] | undefined) => {
	const result: any[] = []
	firstArray?.map((val, ind) => {
		secondArray?.find((v, i) => val.id === v.product_id) ? result.push({...val, disabled: true}) : result.push(val)
	})
	return result
}

export const findMissedNumbers = (arr: number[]) => {
	const [min, max] = [Math.min(...arr), Math.max(...arr)]
	return Array.from(Array(max - min), (v, i) => i + min).filter((i) => !arr.includes(i))
}

export const shallowEqual = (object1: {}, object2: {}) => {
	const keys1 = Object.keys(object1)
	const keys2 = Object.keys(object2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false
		}
	}

	return true
}
