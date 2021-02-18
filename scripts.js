var items = [];
var withIVA = false;

alert("Calculador de total de carrito de compras")
while(true) {
    let input = prompt("Ingrese una opcion: crear-carrito, sumar-iva, mas-caro, mas-barato, total, limpiar-carrito")

    switch(input) {
        case "crear-carrito":
            createCart();
            break;
        case "sumar-iva":
            addIVA();
            break;
        case "mas-caro":
            pricierItem();
            break;
        case "mas-barato":
            cheaperItem();
            break;
        case "total":
            totalSum();
            break;
        case "limpiar-carrito":
            resetItems();
            break;
        default:
            alert("Por favor, elegir una de las opciones disponibles");
    }
}

function createCart() {
    while(true) {
        let input = prompt("Ingrese el costo de un item (o cualquier letra para finalizar)");
        if (!isNumber(input)) {
            break;
        } else {
            items = [];
            withIVA = false;
            
            items.push(parseFloat(input));
        }
    }
}

function addIVA() {
    if (withIVA === true) {
        alert("IVA ya añadido");
        return;
    } else if (items.length > 0) {
        withIVA = true;
        for (var i in items) {
            items[i] = items[i]*1.21;
        }
    }
}

function pricierItem() {
    let pricier;
    for (var item of items) {
        if (pricier === undefined || item > pricier) {
            pricier = item;
        }
    }

    alert("El item mas caro sale: " + pricier);
}

function cheaperItem() {
    let cheaper;
    for (var item of items) {
        if (cheaper === undefined || item < cheaper) {
            cheaper = item;
        }
    }

    alert("El item mas barato sale: " + cheaper);
}

function totalSum() {
    let total = 0;
    for (var item of items) {
        total += item;
    }

    alert("El total es: " + total);
}

function resetItems() {
    items = [];
    withIVA = false;
}

function isNumber(str) {
    if (typeof str != "string") {
        return false;
    }
    return !isNaN(str) && !isNaN(parseFloat(str));
}