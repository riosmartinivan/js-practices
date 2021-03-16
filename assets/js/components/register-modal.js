import { User } from '../model/User.js';


$(document).ready(function() {

    /* Launch register modal */
    $(".launch-modal").on("click", function(e){
        e.preventDefault();
        $( '#' + $(this).data('modal-id') ).modal();
    });

    /* Register form validation */
    $(".registration-form input[type='text'], .registration-form input[type='password']").on("focus", function() {
        $(this).removeClass("input-error");
    });
    
    $('.registration-form').on('submit', function(e) {
        
        let valid = false;
        // Remove the input-error after focus
        $(this).find("input[type='text'], input[type='email'], input[type='password']").each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
                valid = true;
            }
        });

        let saved = false;
        if (valid) {
            let name = $("#register-name").val() + " " + $("#register-surname").val();
            let user = new User(null, name, $("#register-email").val(), $("#register-passwd").val());
            saved = user.save();
        }

        $( '#' + $(".launch-modal").data('modal-id') ).modal('hide');
        if (saved) {
            alert("El usuario fue registrado correctamente");
        } else {
            alert("El usuario no pudo ser registrado");
        }

        return false;
    });
});