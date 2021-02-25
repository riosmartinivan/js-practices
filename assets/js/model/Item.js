/**
 * The Item object.
 * 
 * @constructor
 * @param {string} name the item name.
 * @param {number} price the item price.
 * @param {boolean} withIVA if the item includes IVA.
 */
export class Item {
    constructor(name, price, withIVA) {
        this.name = name;
        this.price = price;
        this.withIVA = withIVA;
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