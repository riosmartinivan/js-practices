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
                this.id = id;
            }
            this.name = name;
            this.email = email.toLowerCase();

            let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
            hashObj.update(passwd);
            let hash = hashObj.getHash("HEX");
            
            this.passwd = hash;
        } else {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
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
     getUser = function(id) {
        let users = JSON.parse(sessionStorage.getItem("users"));
        if (users !== null) {
            let user = new User(null, null, null, null, JSON.parse(users[id]));
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

    /**
     * Gets the user's cart.
     * 
     * @returns {Cart} the user's cart.
     */
    getCart = function() {
        if (this.valid === undefined) {
            this.validate();
        }
        if (this.valid === false) {
            console.error("User not valid");
            return undefined;
        }

        let users = JSON.parse(sessionStorage.getItem("users"));
        return users[this.id].cart;
    }

    /**
     * Saves a cart.
     * 
     * @param {Cart} cart the cart to be saved.
     */
    saveCart = function(cart) {
        if (this.valid === undefined) {
            this.validate();
        }
        if (this.valid === false) {
            console.error("User not valid");
            return undefined;
        }

        let users = JSON.parse(sessionStorage.getItem("users"));
        users[this.id].cart = cart;

        sessionStorage.setItem("users", JSON.stringify(users));
    }
};