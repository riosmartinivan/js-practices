import { addItems, useCart } from '../functions/CartFunctions.js';
import { removeItem } from '../functions/util.js';
import { Cart } from '../model/Cart.js';
import { User } from '../model/User.js';
import { Item } from '../model/Item.js';

$(document).ready(function() {
    
    let user;
    let logged = true;
    let userId = sessionStorage.getItem("currentUserId");
    if (userId === undefined || userId === null) {
        console.log("User not logged in yet");
        logged = false;
    } else {
        user = User.getUser(userId);
        if (user === null) {
            console.log("User not found with id: " + userId);
            logged = false;
        }
    }

    /* Add the items list to the page */
    if (logged) {

        $("#cart-name").html(user.cart.name);

        for (let item of user.cart.items) {

            let htmlItem = document.createElement("a");
            htmlItem.classList.add("list-group-item", "list-group-item-action");
            htmlItem.setAttribute("href", "#");
            htmlItem.setAttribute("role", "tab");
            htmlItem.setAttribute("data-toggle", "list");

            let htmlDiv = document.createElement("div");
            htmlDiv.classList.add("col-12");

            let htmlItemId = document.createElement("div");
            htmlItemId.classList.add("col-2", "float-left", "item-id");
            htmlItemId.innerHTML = item.id;

            let htmlItemName = document.createElement("div");
            htmlItemName.classList.add("col-5", "float-left");
            htmlItemName.innerHTML = item.name;

            let htmlItemPrice = document.createElement("div");
            htmlItemPrice.classList.add("col-3", "float-left");
            htmlItemPrice.innerHTML = "$" + item.price;

            let htmlItemIva = document.createElement("div");
            htmlItemIva.classList.add("col-2", "float-left");
            htmlItemIva.innerHTML = item.withIVA ? "Si" : "No";

            htmlDiv.append(htmlItemId);
            htmlDiv.append(htmlItemName);
            htmlDiv.append(htmlItemPrice);
            htmlDiv.append(htmlItemIva);

            htmlItem.append(htmlDiv);

            $('#items-list').append(htmlItem);
        }
    }


    /* Add item form validation */
    $(".add-item-form input[type='text'], .add-item-form input[type='number']").on("focus", function() {
        $(this).removeClass("input-error");
    });

    /* Add item form functionality */
    $('.add-item-form').on('submit', function(e) {

        if (!logged) {
            alert("Por favor, inicie sesion primero");
            return false;
        }
        
        let valid = true;
        // Remove the input-error after focus
        $(this).find("input[type='text'], input[type='number']").each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
                valid = false;
                console.log("no valido");
            }
            else {
                $(this).removeClass('input-error');
                console.log("valido");
            }
        });

        let saved = false;
        if (valid) {
            let itemId = user.cart.items.length;
            let item = new Item(itemId, $("#add-item-name").val(),
                $("#add-item-price").val(), $("#add-item-iva").is(":checked") ? true : false, null);
            user.cart.addItem(item);

            saved = user.save();
        }

        
        if (saved) {
            alert("El usuario fue actualizado correctamente");
        } else {
            alert("El usuario no pudo ser actualizado");
        }

        $("#modal-add-item").modal('hide');
        location.reload();
        return false;
    });


    /* Check if one of the child elements of the list is selected, and enable the delete button */
    $('.list-group-item').on('click', function(){
        if ($(this).attr('aria-selected') === "false" || $(this).attr('aria-selected') === undefined) {
            $("#delete-item-btn").removeClass("disabled");
        }
    });

    /* Delete item button functionality */
    $('#delete-item-btn').on('click', function(){
        $('#items-list').children().each(function () {
            if ($(this).attr('aria-selected') === "true") {
                console.log("Selected id " + parseInt($(this).children().children(".item-id").html()));
                user.cart.removeItemById(parseInt($(this).children().children(".item-id").html()));

                console.log(JSON.stringify(user.cart.items));
                user.save();
                location.reload();
            }
        });
    });

});


/*
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

*/