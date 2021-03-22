import { User } from '../model/User.js';

$(document).ready(function() {

    /* Register form validation */
    $(".login-form input[type='password']").on("focus", function() {
        $(this).removeClass("input-error");
    });
    
    $('.login-form').on('submit', function(e) {
        
        let valid = false;
        // Remove the input-error after focus
        $(this).find("input[type='email'], input[type='password']").each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
                valid = true;
            }
        });

        if (valid) {
            let user = new User(null, null, $("#login-email").val(), $("#login-passwd").val());
            let loggedUser = user.validate();

            if (loggedUser) {
                sessionStorage.setItem("currentUserId", user.id);
                console.log("User logged successfully");

                alert("Bienvenido " + user.name);
                alert("Puede utilizar la plataforma con normalidad");
            }
        }

        location.reload();
        return false;
    });
});