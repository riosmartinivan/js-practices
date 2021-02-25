/**
 * Checks if a string can be a valid number.
 * 
 * @param {string} str the string to be checked.
 */
export function isNumber(str) {
    if (typeof str != "string") {
        return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Returns a capitalized string.
 * 
 * @param {String} string the string to capitalize.
 * @returns {String} the capitalized string.
 */
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Removes an item from an array of objects by object name.
 * 
 * @param {Array.<Object>} array the array.
 * @param {string} name the name of the object to be removed.
 */
export function removeItem(carts, name) {
    return carts.filter(function(obj) {
        return obj.name !== name;
    });
}