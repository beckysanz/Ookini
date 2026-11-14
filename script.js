
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. RESERVAS DE CAFÉ
    // =====================================

    const precios = {
        "V60": 7,
        "Kyoto Drip": 8,
        "Siphon": 10
    };

    const formularioReserva = document.querySelector("#formulario-reserva");
    const nombreCliente = document.querySelector("#nombre-cliente");
    const correoCliente = document.querySelector("#correo-cliente");
    const telefonoCliente = document.querySelector("#telefono-cliente");

    const selectorMetodo = document.querySelector("#metodo");
    const selectorCantidad = document.querySelector("#cantidad");
    const fechaReserva = document.querySelector("#fecha");
    const horaReserva = document.querySelector("#hora");

    const totalReserva = document.querySelector("#total-reserva");
    const contadorTazas = document.querySelector("#contador-tazas");
    const mensajeReserva = document.querySelector("#reserva-registrada");
    const botonReserva = document.querySelector("#reservar-taza");

    let tazasDisponibles = 50;

    function calcularPrecio(precioUnitario, cantidad) {
        return precioUnitario * cantidad;
    }

    function puedeReservar(disponibles, cantidad) {
        return cantidad >= 1 &&
               cantidad <= 2 &&
               cantidad <= disponibles;
    }

    function actualizarTotal() {
        const metodo = selectorMetodo.value;
        const cantidad = Number(selectorCantidad.value);
        const precio = precios[metodo] || 0;

        const total = calcularPrecio(precio, cantidad);

        totalReserva.textContent = `$${total.toFixed(2)} USD`;
    }

    function actualizarContadorTazas() {
        contadorTazas.textContent = tazasDisponibles;
        botonReserva.disabled = tazasDisponibles <= 0;
    }

    // Fecha mínima: hoy.
    const hoy = new Date();

    const fechaLocal = new Date(
        hoy.getTime() - hoy.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    fechaReserva.min = fechaLocal;

    // Actualizar precio al cambiar la selección.
    selectorMetodo.addEventListener("change", actualizarTotal);
    selectorCantidad.addEventListener("change", actualizarTotal);

    // Seleccionar método desde las tarjetas.
    document.querySelectorAll(".boton-metodo").forEach(function (boton) {
        boton.addEventListener("click", function () {
            selectorMetodo.value = boton.dataset.metodo;
            actualizarTotal();

            document.querySelector("#reservas").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Confirmar reserva de café.
    formularioReserva.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = nombreCliente.value.trim();
        const correo = correoCliente.value.trim();
        const telefono = telefonoCliente.value.trim();

        const metodo = selectorMetodo.value;
        const cantidad = Number(selectorCantidad.value);
        const fecha = fechaReserva.value;
        const hora = horaReserva.value;

        if (!nombre || !correo || !telefono) {
            mensajeReserva.textContent =
                "Completa tus datos de contacto.";
            return;
        }

        if (!precios[metodo]) {
            mensajeReserva.textContent =
                "Selecciona un método de preparación.";
            return;
        }

        if (!puedeReservar(tazasDisponibles, cantidad)) {
            mensajeReserva.textContent =
                "Puedes reservar hasta 2 tazas y debes respetar la disponibilidad.";
            return;
        }

        if (!fecha || fecha < fechaLocal) {
            mensajeReserva.textContent =
                "Selecciona una fecha válida.";
            return;
        }

        if (!hora || hora < "08:00" || hora > "19:00") {
            mensajeReserva.textContent =
                "Selecciona una hora entre 8:00 a.m. y 7:00 p.m.";
            return;
        }

        const total = calcularPrecio(precios[metodo], cantidad);

        // Descontar las tazas reservadas.
        tazasDisponibles -= cantidad;

        actualizarContadorTazas();

        mensajeReserva.textContent =
            `¡Reserva registrada! Cliente: ${nombre}. Correo: ${correo}. Teléfono: ${telefono}. Método: ${metodo}. Cantidad: ${cantidad} taza(s). Fecha: ${fecha}. Hora: ${hora}. Total: $${total.toFixed(2)} USD.`;

        // Conservamos los datos y el total visibles.
    });

    actualizarTotal();
    actualizarContadorTazas();


    // =====================================
    // 2. CATA SEMANAL
    // =====================================

    const formularioCata = document.querySelector("#formulario-cata");
    const nombreCata = document.querySelector("#nombre-cata");
    const correoCata = document.querySelector("#correo-cata");
    const contadorCata = document.querySelector("#contador-cata");
    const mensajeCata = document.querySelector("#mensaje-cata");
    const botonCata = document.querySelector("#reservar-cata");

    let cuposDisponiblesCata = 8;

    formularioCata.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = nombreCata.value.trim();
        const correo = correoCata.value.trim();

        if (!nombre || !correo) {
            mensajeCata.textContent =
                "Completa tu nombre y correo electrónico.";
            return;
        }

        if (cuposDisponiblesCata <= 0) {
            mensajeCata.textContent =
                "Lo sentimos, ya no quedan cupos disponibles.";
            return;
        }

        // Descontar un cupo de la Cata.
        cuposDisponiblesCata--;

        contadorCata.textContent = cuposDisponiblesCata;

        mensajeCata.textContent =
            `¡Gracias, ${nombre}! Tu inscripción a la Cata ha sido registrada. Total: $25.00 USD.`;

        if (cuposDisponiblesCata === 0) {
            botonCata.disabled = true;

            mensajeCata.textContent +=
                " ¡Los 8 cupos están completos!";
        }
    });

});
