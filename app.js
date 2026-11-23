import { db } from "./firebase-config.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

let ubicacionCliente = null;

window.obtenerUbicacion = function() {

    if (!navigator.geolocation) {
        alert("GPS no disponible");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            ubicacionCliente = {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
            };

            document.getElementById("origen").value =
                "Ubicación GPS obtenida";

            alert("Ubicación obtenida correctamente");

        },
        () => alert("No se pudo obtener el GPS")
    );
};

window.solicitarViaje = async function() {

    const nombre = document.getElementById("nombre").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !destino || !telefono || !ubicacionCliente) {
        alert("Completa todos los datos y activa el GPS");
        return;
    }

    const boton = document.querySelector(
        'button[onclick="solicitarViaje()"]'
    );

    boton.disabled = true;

    try {

        const nuevoViaje = push(ref(db, "solicitudes"));

        await set(nuevoViaje, {

            nombre: nombre,
            telefono: telefono,
            destino: destino,

            ubicacion: ubicacionCliente,

            estado: "pendiente",

            fecha: new Date().toISOString(),

            metodoPago: "efectivo"

        });

        document.getElementById("estado").innerText =
            "¡Solicitud enviada correctamente!";

        alert("Tu solicitud de transporte fue enviada.");

    } catch (error) {

        console.error(error);

        alert("No se pudo enviar la solicitud. Revisaremos la conexión.");

    } finally {

        boton.disabled = false;

    }
};
