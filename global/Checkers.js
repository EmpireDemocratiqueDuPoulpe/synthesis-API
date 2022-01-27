/* TEMPORARY FILE */

function isDefined(value) {
	return value !== undefined && value !== null;
}

function isArray(value) {
	return Array.isArray(value);
}

function isString(value) {
	return Object.prototype.toString.call(value) === "[object String]";
}

function isNumber(value, parse = false) {
	const val = parse ? (isString(value) ? parseInt(value, 10) : value) : value;
	return typeof val === "number" && !isNaN(val);
}

function dateToString(date, withTime = true, locale = "fr-FR") {
	return withTime ? date.toLocaleString(locale) : date.toLocaleDateString(locale);
}

export default {
	isDefined, isArray, isString, isNumber,
	dateToString,
};

/* TEMPORARY FILE */
