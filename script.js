function calcularPrecio(precioUnitario, cantidad) {
    const total = precioUnitario * cantidad;
    return total;
}

function puedeReservar(cantidad) {
    return cantidad <= 2;
}

function puedeReservar(tazasDisponibles, cantidad) {
    return tazasDisponibles > 0;
}



const botonReservar = document.querySelector("#reservar-taza");
const contadorTazas = document.querySelector("#contador-tazas");
const reservaRegistrada = document.querySelector("#reserva-registrada");

botonReservar.addEventListener("click", function() {
    const tazasActuales = Number(contadorTazas.textContent);

    if (puedeReservar(tazasActuales)) {
        contadorTazas.textContent = tazasActuales - 1;
        reservaRegistrada.textContent = "¡Compra registrada!";
    } else {
        reservaRegistrada.textContent = "No hay cupos disponibles";
        botonReservar.disabled = true;
    }
});

