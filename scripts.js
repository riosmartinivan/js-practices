var cart = new Cart();

alert("Calculador de total de carrito de compras")
while(true) {
    let input = prompt("Ingrese una opcion: añadir-items, sumar-iva, mas-caro, mas-barato, total, limpiar-carrito")

    switch(input) {
        case "añadir-items":
            addItems();
            break;
        case "sumar-iva":
            cart.addIVA();
            break;
        case "mas-caro":
            alert("El item mas caro sale (sin IVA): " + cart.getPricierCostWOIVA());
            break;
        case "mas-barato":
            alert("El item mas caro sale (sin IVA): " + cart.getCheaperCostWOIVA());
            break;
        case "total":
            alert("Total: " + cart.total);
            break;
        case "limpiar-carrito":
            cart.resetItems();
            break;
        default:
            alert("Por favor, elegir una de las opciones disponibles");
    }
}

/**
 * Calls the cart.addItem function until interrupted.
 */
function addItems() {
    while(true) {
        let input = prompt("Ingrese el costo de un item (o cualquier letra para finalizar)");
        if (!isNumber(input)) {
            break;
        }

        let iva;
        while (true) {
            let ivaInput = prompt("IVA incluido? (si / no)");
            if (ivaInput === "si") {
                iva = true;
                break;
            } else if (ivaInput === "no") {
                iva = false;
                break;
            }
        }

        cart.addItem(new Item(parseFloat(input), iva));
    }
}

/**
 * Cart object.
 */
function Cart() {
    this.items = [];
    this.total = 0;

    /**
     * Adds an item to the cart.
     * Updates the total.
     * Defines if the item is the priciest or the chepear.
     * 
     * @param {Item} item to be added
     */
    this.addItem = function(item) {
        this.items.push(item);

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
    this.getPricierCostWOIVA = function() {
        if (this.pricier == undefined) return undefined;
        return (this.pricier.withIVA === true) ? this.pricier.price/1.21 : this.pricier.price;
    }

    /**
     * Returns the cheaper item cost without IVA.
     */
    this.getCheaperCostWOIVA = function() {
        if (this.cheaper == undefined) return undefined;
        return (this.cheaper.withIVA === true) ? this.cheaper.price/1.21 : this.cheaper.price;
    }

    /**
     * Adds IVA to all the items.
     * Recalculates the total.
     */
    this.addIVA = function() {
        for (var i in this.items) {
            this.items[i].addIVA();
        }

        this.recalcTotal();
    }

    /**
     * Recalculates the total.
     */
    this.recalcTotal = function() {
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
    this.resetItems = function() {
        this.items = [];
        this.total = 0;
        this.pricier = undefined;
        this.cheaper = undefined;
    }
}

/**
 * The Item object.
 * 
 * @param {number} price the item price.
 * @param {boolean} withIVA if the item includes IVA.
 */
function Item(price, withIVA) {
    this.price = price;
    this.withIVA = withIVA;

    /**
     * Add IVA to the Item if not already applied.
     */
    this.addIVA = function() {
        if (this.withIVA === false) {
            this.price = this.price*1.21;
            this.withIVA = true;
        }
    }
}

/**
 * Checks if a string can be a valid number.
 * 
 * @param {string} str the string to be checked.
 */
function isNumber(str) {
    if (typeof str != "string") {
        return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
}