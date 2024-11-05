// Datos fijos basados en los datos proporcionados
const datosFijos = {
    precipAnual: "850 mm",
};

// Función para obtener el material del tanque según capacidad
function obtenerMaterialRecomendado(capacidad) {
    capacidad = Math.round(capacidad); // Redondear para evitar decimales en comparación
    if (capacidad === 500) return "Polietileno de alta densidad";
    if (capacidad === 750 || capacidad === 5000) return "Polietileno reforzado";
    if (capacidad === 1100 || capacidad === 1200) return "Polietileno de alta densidad";
    return "Consultar material";
}

// Función para obtener el precio del tanque según su capacidad
function obtenerPrecioTanque(capacidad) {
    capacidad = Math.round(capacidad); // Redondear para evitar decimales en comparación
    let precio;
    if (capacidad === 500) precio = 2300;
    else if (capacidad === 750) precio = 3000;
    else if (capacidad === 1100) precio = 3600;
    else if (capacidad === 1200) precio = 3500;
    else if (capacidad === 5000) precio = 13000;
    else return "Precio a consultar";
    
    return precio.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

// Función para obtener la tubería recomendada según capacidad del tanque
function obtenerTuberiaRecomendada(capacidad) {
    capacidad = Math.round(capacidad); // Redondear para evitar decimales en comparación
    if (capacidad === 500) return "1/2 Pulgada";
    if (capacidad === 750) return "3/4 Pulgada";
    if (capacidad === 1100 || capacidad === 1200) return "1 Pulgada";
    if (capacidad === 5000) return "2 Pulgadas";
    return "Medida a consultar";
}

// Función para obtener el precio total de la tubería según la capacidad del tanque y la cantidad
function obtenerPrecioTuberia(capacidad, cantidad) {
    capacidad = Math.round(capacidad); // Redondear para evitar decimales en comparación
    let precioPorUnidad;
    if (capacidad === 500) precioPorUnidad = 15;
    else if (capacidad === 750) precioPorUnidad = 22;
    else if (capacidad === 1100 || capacidad === 1200) precioPorUnidad = 32.67;
    else if (capacidad === 5000) precioPorUnidad = 87.67;
    else return "Precio no disponible";
    
    const total = precioPorUnidad * cantidad;
    return total.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

// Función para obtener la altura del tinaco según la capacidad
function obtenerAlturaTinaco(capacidad) {
    capacidad = Math.round(capacidad);
    if (capacidad === 500) return 1.1;
    if (capacidad === 750) return 1.2;
    if (capacidad === 1100) return 1.4;
    if (capacidad === 1200) return 1.5;
    if (capacidad === 5000) return 2.5;
    return "Altura del tinaco no disponible";
}

// Función para obtener la altura promedio según el número de niveles
function obtenerAlturaPromedio(niveles) {
    return niveles > 0 && niveles <= 12 ? niveles * 2.5 : "Altura promedio no disponible";
}

// Función para calcular la cantidad de tubería
function calcularCantidadTuberia(niveles, capacidadTanque, metrosDistribucion, soporteTinaco, desperdicio) {
    const alturaPromedio = obtenerAlturaPromedio(niveles);
    const alturaTinaco = obtenerAlturaTinaco(capacidadTanque);

    if (typeof alturaPromedio === 'string' || typeof alturaTinaco === 'string') {
        return "Datos no disponibles para realizar el cálculo";
    }

    const cantidadTuberia = alturaPromedio - alturaTinaco - soporteTinaco + (metrosDistribucion * desperdicio);
    return cantidadTuberia.toFixed(2);
}

// Función para obtener los codos necesarios
function obtenerCodos(niveles) {
    if (niveles > 0 && niveles <= 12) {
        return 5 + (niveles - 1);
    }
    return "Número de niveles fuera del rango permitido";
}

// Obtener los resultados almacenados en localStorage
const resultados = JSON.parse(localStorage.getItem("resultados"));

if (resultados) {
    document.getElementById("codigoPostal").innerText = resultados.ubicacion;
    document.getElementById("zona").innerText = resultados.zona; // Mostrar la zona en los resultados
    document.getElementById("areaCaptacion").innerText = resultados.areaCaptacion;
    document.getElementById("niveles").innerText = resultados.niveles;

    const capacidadTanque = 750;
    const metrosDistribucion = 1.5;
    const soporteTinaco = 0.5;
    const desperdicio = 1.05;
    const cantidadFiltro = 1;
    const reductor = 1;

    const cantidadTuberia = calcularCantidadTuberia(resultados.niveles, capacidadTanque, metrosDistribucion, soporteTinaco, desperdicio);

    document.getElementById("precipAnual").innerText = datosFijos.precipAnual;
    document.getElementById("capacidadTanque").innerText = `${capacidadTanque} L`;
    document.getElementById("materialTanque").innerText = obtenerMaterialRecomendado(capacidadTanque);
    document.getElementById("precioTanque").innerText = obtenerPrecioTanque(capacidadTanque);
    document.getElementById("tuberiaRecomendada").innerText = obtenerTuberiaRecomendada(capacidadTanque);
    document.getElementById("cantidadTuberia").innerText = cantidadTuberia !== null ? `${cantidadTuberia} m` : "Cantidad no disponible";
    document.getElementById("cantidadFiltro").innerText = `${cantidadFiltro} `;
    document.getElementById("reductor").innerText = `${reductor} `;
    document.getElementById("obtenerCodos").innerText = obtenerCodos(resultados.niveles);

    if (cantidadTuberia !== null) {
        document.getElementById("precioTuberia").innerText = obtenerPrecioTuberia(capacidadTanque, cantidadTuberia);
    } else {
        document.getElementById("precioTuberia").innerText = "Cantidad de tubería no disponible";
    }
} else {
    alert("No se encontraron datos de resultados. Por favor, complete el formulario de captación.");
    window.location.href = "index.html";
}
