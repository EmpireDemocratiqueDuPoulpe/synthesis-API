/* TEMPORARY FILE */
/**
 * isDefined
 * @ignore
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
	return value !== undefined && value !== null;
}

/**
 * isArray
 * @ignore
 * @param {*} value
 * @return {Array}
 */
function isArray(value) {
	return Array.isArray(value);
}
/**
 * isString
 * @ignore
 * @param {*} value
 * @return {Object}
 */
function isString(value) {
	return Object.prototype.toString.call(value) === "[object String]";
}

/**
 * isNumber
 * @ignore
 * @param {*} value
 * @param {false} parse
 * @return {boolean}
 */
function isNumber(value, parse = false) {
	const val = parse ? (isString(value) ? parseInt(value, 10) : value) : value;
	return typeof val === "number" && !isNaN(val);
}

/**
 * dateToString
 * @ignore
 * @param {*} date
 * @param {*} withTime
 * @param {*} locale
 * @return {String}
 */
function dateToString(date, withTime = true, locale = "fr-FR") {
	return withTime ? date.toLocaleString(locale) : date.toLocaleDateString(locale);
}

export default {
	isDefined, isArray, isString, isNumber,
	dateToString,
};

/*  TEMPORARY FILE  */
