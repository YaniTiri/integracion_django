//VALIDACION DEl MAIL EN FORMULARIO

function sendEmail() {
    // Get our input reference.
    var emailField = document.getElementById("email");
    // Define our regular expression.
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if (!validEmail.test(emailField.value)) {
        alert("El email ingresado no es válido. Por favor, verifica el formato.");
        return false;
    }
    // Envía el correo electrónico utilizando mailto
    var mailtoLink = "mailto:luciano.anselmino@gmail.com";
    location.href = mailtoLink;

    return false; // Evita que se envíe el formulario
}

function validateEmail(email) {
    // Retorna true si es válido, false si no lo es
}

  
  