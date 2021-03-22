/**
 * The Item object.
 * 
 * @constructor
 * @param {string} name the item name.
 * @param {number} price the item price.
 * @param {boolean} withIVA if the item includes IVA.
 */
export class Item {
    constructor(id, name, price, withIVA, data) {
        if (data === null || data === undefined) {
            this.id = id;
            this.name = name;
            this.price = parseFloat(price);
            this.withIVA = withIVA;
        } else {
            this.id = parseInt(data.id);
            this.name = data.name;
            this.price = parseFloat(data.price);
            this.withIVA = data.withIVA;
        }
    }

    /**
     * Add IVA to the Item if not already applied.
     * 
     * @returns {boolean} true if it was necessary to add iva, false otherwise.
     */
    addIVA = function() {
        if (this.withIVA === false) {
            this.price = this.price*1.21;
            this.withIVA = true;

            return true;
        }
        return false;
    }
};