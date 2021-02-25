import { isNumber, removeItem, capitalizeFirstLetter } from './util.js';
import { Item } from '../model/Item.js';
import { Cart } from '../model/Cart.js';

/**
 * Calls the cart.addItem function until interrupted.
 * 
 * @param {Cart} cart the cart to add items.
 */
export function addItems(cart) {
    while (true) {
        let input = prompt("Ingrese el costo de un item (o cualquier letra para finalizar)");
        if (!isNumber(input)) {
            break;
        }

        let name = capitalizeFirstLetter(prompt("Ingrese el nombre del item"));

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

        cart.addItem(new Item(name, parseFloat(input), iva));
    }
}

/**
 * Operates inside a specific cart.
 * 
 * @param {Cart} cart the cart to be used.
 * @returns {Cart} the modified cart.
 */
export function useCart(cart) {
    while (true) {
        let input = prompt("Opciones: ver nombre, cambiar nombre, añadir items, listar items, ordenar items, ver item, eliminar item, sumar iva, mas caro, mas barato, total, limpiar items, volver")
    
        switch (input.toLowerCase().trim()) {
            case "ver nombre":
            case "ver-nombre":
                alert("Nombre de carrito actual: " + cart.name);
                break;
            case "cambiar nombre":
            case "cambiar-nombre":
                cart.name = capitalizeFirstLetter(prompt("Nuevo nombre: "));
                break;
            case "añadir items":
            case "añadir-items":
                addItems(cart);
                break;
            case "listar items":
            case "listar-items":
                alert("Items: " + cart.items.map(item => item.name));
                break;
            case "ordenar items":
            case "ordenar-items":
                cart.items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                break;
            case "ver item":
            case "ver-item":
                let name = capitalizeFirstLetter(prompt("Nombre: "));
                let selectedItem = cart.items.filter(obj => {
                    return obj.name === name
                });
                console.log(selectedItem);
                if (selectedItem.length < 1) {
                    alert("No se encontro el item: " + name);
                    break;
                }

                alert("Nombre: " + name + ", costo: " + selectedItem[0].price + ", con IVA: " + selectedItem[0].withIVA);
                break;
            case "eliminar item":
            case "eliminar-item":
                cart.items = removeItem(cart.items, capitalizeFirstLetter(prompt("Nombre del item a eliminar: ")));
                break;
            case "sumar iva":
            case "sumar-iva":
                cart.addIVA();
                break;
            case "mas caro":
            case "mas-caro":
                alert("El item mas caro sale (sin IVA): " + cart.getPricierCostWOIVA());
                break;
            case "mas barato":
            case "mas-barato":
                alert("El item mas caro sale (sin IVA): " + cart.getCheaperCostWOIVA());
                break;
            case "total":
                alert("Total: " + cart.total);
                break;
            case "limpiar items":
            case "limpiar-items":
                cart.resetItems();
                break;
            case "volver":
                return cart;
            default:
                alert("Por favor, elegir una de las opciones disponibles");
        }
    }
}