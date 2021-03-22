/**
 * Removes an item from an array of objects by object id.
 * 
 * @param {Array.<Object>} array the array.
 * @param {string} id the id of the object to be removed.
 */
export function removeItem(array, id) {
    console.log(JSON.stringify(array));
    array = array.filter(function(obj) {
        return obj.id !== id;
    });

    console.log(JSON.stringify(array));

    for (let i in array) {
        array[i].id = i;
    }

    console.log(JSON.stringify(array));

    return array;
}