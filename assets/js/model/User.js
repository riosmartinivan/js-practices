import { Cart } from './Cart.js';

// TODO: Es posible mejorar la funcionalidad para que user tambien guarde un token aleatorio generado y guardado en cada login,
//  y que el currentUserId pase a ser currentTokenId, y de esa forma con un metodo getUserByToken se podria tomar al usuario y seria un poco mas seguro

/**
 * User object.
 * 
 * @constructor
 * @param {name} name the user name.
 * @param {email} email the user email.
 * @param {passwd} passwd the user passwd.
 * @param {Object} data the user data.
 */
export class User {
    constructor(id, name, email, passwd, data) {
        if (data === null || data === undefined) {
            if (id === undefined || id === null) {
                this.id = (sessionStorage.getItem("users") !== null)
                    ? sessionStorage.getItem("users").length : 0;
            } else {
                this.id = parseInt(id);
            }
            this.name = name;
            this.email = email.toLowerCase();
            this.cart = new Cart("Mi carrito", null);

            let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
            hashObj.update(passwd);
            let hash = hashObj.getHash("HEX");
            
            this.passwd = hash;
        } else {
            this.id = parseInt(data.id);
            this.name = data.name;
            this.email = data.email;
            this.cart = new Cart(null, data.cart);
        }
    }

    /**
     * Save user.
     * 
     * @returns {boolean} true if the user was saved successfully.
     */
    save = function() {
        let users = JSON.parse(sessionStorage.getItem("users"));
        if (users === null) users = [];
        users[this.id] = this;

        console.log("Saving users: " + JSON.stringify(users));

        sessionStorage.setItem("users", JSON.stringify(users));
        console.log("User saved correctly");

        return true;
    }

    /**
     * Get user by id.
     * 
     * @param {number} id the user id.
     * @returns {User} the user.
     */
     static getUser = function(id) {
        let users = JSON.parse(sessionStorage.getItem("users"));
        if (users !== null) {
            let user = new User(null, null, null, null, users[id]);
            user.valid = true;
            return user;
        }

        console.log("User not found with id: " + id);
        return null;
    }


    /**
     * Validate user/pass.
     * 
     * @returns {boolean} true if the validation succeds, false otherwise.
     */
    validate = function() {
        let users = JSON.parse(sessionStorage.getItem("users"));
        console.log(sessionStorage.getItem("users"));
        if (users !== null) {
            for (let user of users) {
                if (user.email === this.email && user.passwd === this.passwd) {
                    this.valid = true;
                    this.id = user.id;
                    this.name = user.name;
                    break;
                }
            }
            return this.valid;
        } else {
            this.valid = false;
            return false;
        }
    }
};