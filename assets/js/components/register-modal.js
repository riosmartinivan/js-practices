import { User } from '../model/User.js';


$(document).ready(function() {

    /* Register form validation */
    $(".registration-form input[type='text'], .registration-form input[type='password']").on("focus", function() {
        $(this).removeClass("input-error");
    });
    
    $('.registration-form').on('submit', function(e) {
        
        let valid = true;
        // Remove the input-error after focus
        $(this).find("input[type='text'], input[type='email'], input[type='password']").each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
                valid = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });

        let saved = false;
        if (valid) {
            let name = $("#register-name").val() + " " + $("#register-surname").val();
            let user = new User(null, name, $("#register-email").val(), $("#register-passwd").val(), null);
            saved = user.save();
        }

        
        if (saved) {
            alert("El usuario fue registrado correctamente");
        } else {
            alert("El usuario no pudo ser registrado");
        }

        $("#modal-register").modal('hide');
        return false;
    });
});