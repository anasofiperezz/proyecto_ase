function mostrarMensajeError(mensaje) {
    // Muestra un mensaje de error dentro de un elemento HTML específico
    const mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
    } else {
        console.error("Elemento de mensaje de error no encontrado.");
    }
}

function ocultarMensajeError() {
    const mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.style.display = "none";
    }
}

function calcularResultados() {
    const areaCaptacion = parseFloat(document.getElementById("areaCaptacion").value);
    const niveles = parseInt(document.getElementById("niveles").value, 10);
    const ubicacion = JSON.parse(localStorage.getItem("resultados")).ubicacion;
    const zona = JSON.parse(localStorage.getItem("resultados")).zona; // Obtener la zona

    // Validación de campos
    if (isNaN(areaCaptacion) || areaCaptacion <= 0) {
        mostrarMensajeError("Por favor, ingrese un valor válido para el área de captación.");
        return;
    }
    if (isNaN(niveles) || niveles <= 0) {
        mostrarMensajeError("Por favor, ingrese un valor válido para el número de niveles.");
        return;
    }

    const capacidadTanque = (areaCaptacion * 0.9).toFixed(2);

    // Crear un objeto de resultados y almacenarlo en localStorage
    const resultados = {
        areaCaptacion,
        niveles,
        capacidadTanque,
        ubicacion,
        zona
    };

    localStorage.setItem("resultados", JSON.stringify(resultados));

    // Redireccionar a la página de resultados (resultados.html)
    window.location.href = "resultados.html";
}


function mostrarMensajeError(mensaje) {
    const mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
    }
}

function ocultarMensajeError() {
    const mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.style.display = "none";
    }
}
