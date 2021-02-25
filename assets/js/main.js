import { addItems, useCart } from './functions/CartFunctions.js';
import { removeItem } from './functions/util.js';
import { Cart } from './model/Cart.js';
import { capitalizeFirstLetter } from './functions/util.js';


function main() {

    let carts = [];

    while (true) {
        let inputInicial = prompt("Opciones: listar carritos, crear carrito, ordenar carritos, eliminar carrito, total general, ingresar a carrito, limpiar carritos");

        switch (inputInicial.toLowerCase().trim()) {
            case "listar carritos":
            case "listar-carritos":
                alert("Carritos: " + carts.map(cart => cart.name));
                break;
            case "crear carrito":
            case "crear-carrito":
                carts.push(new Cart(capitalizeFirstLetter(prompt("Nombre: "))));
                break;
            case "ordenar carritos":
            case "ordenar-carritos":
                carts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                break;
            case "eliminar carrito":
            case "eliminar-carrito":
                carts = removeItem(carts, capitalizeFirstLetter(prompt("Nombre del carrito a eliminar: ")));
                break;
            case "total general":
            case "total-general":
                alert("Total en los carritos: " + carts.reduce((a, b) => a + (b["total"] || 0), 0));
                break;
            case "ingresar a carrito":
            case "ingresar-a-carrito":
                let name = capitalizeFirstLetter(prompt("Nombre: "));
                let selectedCart = carts.filter(obj => {
                    return obj.name === name
                });
                if (selectedCart.length < 1) {
                    alert("No se encontro el carrito: " + name);
                    break;
                }

                useCart(selectedCart[0]);
                break;
            case "limpiar carritos":
            case "limpiar-carritos":
                carts = [];
                break;
            default:
                alert("Por favor, elegir una de las opciones disponibles");
        }
    }
}

alert("Sistema de carrito de compras")
main();