// Datos de ejemplo por zonas y códigos postales
const datosPostales = {
    "21035": {
        codigos: [
            "72538", "72500", "72501", "72533", "72505", "72380",
            "72530", "72550", "72510", "72567", "72565", "72540",
            "72520", "72564", "72560", "72570", "72592", "72580",
            "72477", "72589", "72595", "72587", "72584", "72594",
            "72583", "72593", "72523", "72353", "72574", "72575",
            "72573"

        ],
        precipPromedio: { min: 850, max: 950 }
    },
    "21065": {
        codigos: [
            "72020", "72023", "72030", "72070", "72050", "72089",
            "72290", "72377", "72340", "72010", "72260", "72280",
            "72370", "72350", "72390", "72360", "72365", "72359", 
            "72320", "72310", "72314", "72308", "72307", "72225",
            "72304", "72210", "72200", "72230", "72240", "72243",
            "72266", "72373"

        ],
        precipPromedio: { min: 700, max: 800 }
    },
    "21248": {
        codigos: [
            "72825", "72474", "72470", "72480", "72830", "72824",
            "72735", "72154", "72170", "72724", "72120", "72110",
            "72029", "72130", "72150", "72837", "72839", "72464",
            "72478", "72835", "72160", "72190", "72834", "72060",
            "72040", "72456", "72453", "72582", "72440", "72833",
            "72193", "72194", "72000", "72420", "72410", "72400",
            "72430", "72423", "72180", "72189", "72710", "72777"

        ],
        precipPromedio: { min: 750, max: 850 }
    }
};

// Función para obtener la zona según el código postal
function obtenerZonaPorCodigo(codigoPostal) {
    for (const [zona, datos] of Object.entries(datosPostales)) {
        if (datos.codigos.includes(codigoPostal)) {
            return zona;
        }
    }
    return "Zona no encontrada";
}

function siguiente() {
    const ubicacion = document.getElementById("ubicacion").value.trim();

    // Validar que el usuario haya ingresado un código postal válido de cinco dígitos
    if (!ubicacion || ubicacion.length !== 5 || isNaN(ubicacion)) {
        mostrarMensajeError("Por favor, ingrese un código postal válido de cinco dígitos.");
        return;
    }

    // Obtener la zona según el código postal ingresado
    const zona = obtenerZonaPorCodigo(ubicacion);

    // Verificar si la zona es válida
    if (zona === "Zona no encontrada") {
        mostrarMensajeError("El código postal ingresado no corresponde a ninguna zona registrada.");
        return;
    }

    // Obtener los datos de la zona según el código postal ingresado
    const datosZona = datosPostales[zona];

    // Extraer los datos obtenidos de la zona
    const precipPromedioAnual = `${datosZona.precipPromedio.min} mm - ${datosZona.precipPromedio.max} mm`;

    // Crear un objeto de resultados y almacenarlo en localStorage
    const resultados = {
        ubicacion,
        zona, // Agregar la zona aquí
        precipPromedioAnual
    };

    localStorage.setItem("resultados", JSON.stringify(resultados));

    // Redireccionar a la página de resultados (datos.html)
    window.location.href = "datos.html";
}

// Event listener para el botón de calcular resultados
document.getElementById("rainHarvestForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario para usar JavaScript
    siguiente();
});
