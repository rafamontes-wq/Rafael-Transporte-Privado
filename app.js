import { app, db } from "./firebase-config.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const auth = getAuth(app);

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

    try {

        const usuario = auth.currentUser || 
            (await signInAnonymously(auth)).user;

        const nuevoViaje = push(ref(db, "solicitudes"));

        await set(nuevoViaje, {

            nombre,
            telefono,
            destino,

            ubicacion: ubicacionCliente,

            estado: "pendiente",

            fecha: new Date().toISOString(),

            metodoPago: "efectivo"

        });

        document.getElementById("estado").innerText =
            "¡Tu solicitud fue enviada correctamente!";

        alert("¡Solicitud enviada! Pronto recibirás respuesta.");

    } catch (error) {

        console.error(error);

        alert("Error al enviar la solicitud: " + error.message);

    }

};
