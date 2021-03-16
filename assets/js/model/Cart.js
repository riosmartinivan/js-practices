import { Item } from './Item.js';

/**
 * Cart object.
 * 
 * @constructor
 * @param {string} name the cart name.
 * @param {Array.<Item>} items the items.
 * @param {number} total the total of the cart.
 */
export class Cart {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.total = 0;
    }

    /**
     * Adds an item to the cart.
     * Updates the total.
     * Defines if the item is the priciest or the chepear.
     * 
     * @param {Item} item the item to be added
     */
    addItem = function(item) {
        this.items.push(item);

        // We add the value to the total to try to avoid that the total of all items has to be calculated
        //  every time by recursively iterating over the array items (+ efficiency).
        this.total += item.price;

        let itemWOIVA = (item.withIVA === true) ? item.price/1.21 : item.price;
        if (this.pricier === undefined) {
            this.pricier = item;
        } else {
            let pricierWOIVA = (this.pricier.withIVA === true) ? this.pricier.price/1.21 : this.pricier.price;
            if (itemWOIVA > pricierWOIVA) {
                this.pricier = item;
            }
        }
        if (this.cheaper === undefined) {
            this.cheaper = item;
        } else {
            let cheaperWOIVA = (this.cheaper.withIVA === true) ? this.cheaper.price/1.21 : this.cheaper.price;
            if (itemWOIVA < cheaperWOIVA) {
                this.cheaper = item;
            }
        }
    }

    /**
     * Returns the pricier item cost without IVA.
     */
    getPricierCostWOIVA = function() {
        if (this.pricier == undefined) return undefined;
        return (this.pricier.withIVA === true) ? this.pricier.price/1.21 : this.pricier.price;
    }

    /**
     * Returns the cheaper item cost without IVA.
     */
    getCheaperCostWOIVA = function() {
        if (this.cheaper == undefined) return undefined;
        return (this.cheaper.withIVA === true) ? this.cheaper.price/1.21 : this.cheaper.price;
    }

    /**
     * Adds IVA to all the items.
     * Recalculates the total if needed.
     */
    addIVA = function() {
        let needsRecalc = false;
        for (var i in this.items) {
            needsRecalc = this.items[i].addIVA();
        }

        // We need to recalculate the total if one or more items were updated.
        if (needsRecalc) {
            this.recalcTotal();
        }
    }

    /**
     * Recalculates the total.
     */
    recalcTotal = function() {
        this.total = 0;
        for (var item of this.items) {
            this.total += item.price;
        }
    }

    /**
     * Resets the items.
     * Resets the total.
     * Resets the pricier/chepear.
     */
    resetItems = function() {
        this.items = [];
        this.total = 0;
        this.pricier = undefined;
        this.cheaper = undefined;
    }
};