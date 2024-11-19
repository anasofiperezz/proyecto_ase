// Datos de ejemplo por zonas y códigos postales
const datosPostales = {
    "21035": {
        codigos: [
            "72610", "72600", "72595", "72594", "72593", "72592", "72590", 
            "72589", "72587", "72584", "72583", "72580", "72575", "72574", 
            "72573", "72570", "72570", "72567", "72565", "72564", "72560", 
            "72560", "72559", "72550", "72540", "72538", "72533", "72530", 
            "72523", "72520", "72510", "72505", "72501", "72500", "72477", 
            "72380", "72353", "72100"
        ],
        precipPromedio: { min: 850, max: 950 }
    },
    "21065": {
        codigos: [
            "72390", "72377", "72373", "72370", "72365", "72360", "72359", 
            "72350", "72340", "72320", "72314", "72310", "72308", "72307", 
            "72304", "72290", "72280", "72266", "72260", "72243", "72240", 
            "72230", "72225", "72210", "72200", "72089", "72070", "72050", 
            "72030", "72023", "72020", "72010"
        ],
        precipPromedio: { min: 700, max: 800 }
    },
    "21248": {
        codigos: [
            "73700", "72839", "72837", "72836", "72835", "72834", "72833", 
            "72825", "72824", "72820", "72810", "72777", "72735", "72724", 
            "72710", "72700", "72582", "72540", "72535", "72530", "72480", 
            "72478", "72474", "72470", "72464", "72456", "72453", "72440", 
            "72430", "72423", "72420", "72410", "72400", "72197", "72194", 
            "72193", "72190", "72189", "72180", "72170", "72160", "72154", 
            "72150", "72130", "72120", "72110", "72060", "72040", "72029", 
            "72000"
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
