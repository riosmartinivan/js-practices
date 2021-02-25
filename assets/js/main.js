import { addItems, useCart, removeCart } from './functions/CartFunctions.js';
import { Cart } from './model/Cart.js';


function main() {

    let carts = [];

    while (true) {
        let inputInicial = prompt("Opciones: listar carritos, crear carrito, eliminar carrito, total general, ingresar a carrito, limpiar carritos");

        switch (inputInicial.toLowerCase().trim()) {
            case "listar carritos":
            case "listar-carritos":
                alert("Carritos: " + carts.map(cart => cart.name));

                break;
            case "crear carrito":
            case "crear-carrito":
                carts.push(new Cart(prompt("Nombre: ")));

                break;
            case "eliminar carrito":
            case "eliminar-carrito":
                carts = removeCart(carts, prompt("Carrito a eliminar: "));

                break;
            case "total general":
            case "total-general":
                alert("Total en los carritos: " + carts.reduce((a, b) => a + (b["total"] || 0), 0));
                break;
            case "ingresar a carrito":
            case "ingresar-a-carrito":
                let name = prompt("Nombre: ");
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