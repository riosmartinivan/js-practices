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
    constructor(name, data) {
        if (data === null || data === undefined) {
            this.name = name;
            this.items = [];
            this.total = 0;
        } else {
            this.name = data.name;
            this.total = parseFloat(data.total);

            this.items = [];
            for (let dataItem of data.items) {
                this.items.push(new Item(null, null, null, null, dataItem));
            }

            if (data.pricier !== null && data.pricier !== undefined) {
                this.pricier = new Item(null, null, null, null, data.pricier);
            }
            if (data.cheaper !== null && data.cheaper !== undefined) {
                this.cheaper = new Item(null, null, null, null, data.cheaper);
            }
        }
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
        this.total = this.total + item.price;

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
     * Removes an item from the cart.
     * Updates the total.
     * Defines the priciest and chepear item.
     * 
     * @param {number} id the item id to be removed
     */
    removeItemById = function(id) {
        let itemPrice = this.items.filter(obj => obj.id == id)[0].price;
        this.total = this.total - itemPrice;

        this.items = this.items.filter(function(obj) {
            return obj.id !== id;
        });

        for (let i in this.items) {
            if (this.items[i].id === this.pricier.id) {
                this.pricier.id = i;
            }
            if (this.items[i].id === this.cheaper.id) {
                this.cheaper.id = i;
            }

            this.items[i].id = i;
        }

        if (this.pricier !== undefined && this.pricier.id === id) {
            let pricierItem;
            for (let item of this.items) {
                if (pricierItem === undefined) {
                    pricierItem = item;
                    continue;
                }
                
                let itemPriceWOIVA = (item.withIVA === true) ? item.price/1.21 : item.price;
                let pricierItemWOIVA = (pricierItem.withIVA === true) ? pricierItem.price/1.21 : pricierItem.price;
                if (itemPriceWOIVA > pricierItemWOIVA) {
                    pricierItem = item;
                }
            }

            this.pricier = pricierItem;
        }

        if (this.cheaper !== undefined && this.cheaper.id === id) {
            let cheaperItem;
            for (let item of this.items) {
                if (cheaperItem === undefined) {
                    cheaperItem = item;
                    continue;
                }
                
                let itemPriceWOIVA = (item.withIVA === true) ? item.price/1.21 : item.price;
                let cheaperItemWOIVA = (cheaperItem.withIVA === true) ? cheaperItem.price/1.21 : cheaperItem.price;
                if (itemPriceWOIVA < cheaperItemWOIVA) {
                    cheaperItem = item;
                }
            }

            this.cheaper = cheaperItem;
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
        for (let i in this.items) {
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
        for (let item of this.items) {
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