// Datos de hospitales y clínicas
const datosHospitales = {
    publica: ["EsSalud", "Hospital Carrión", "Hospital El Carmen"],
    privada: ["Clínica Ortega", "Clínica Cayetano Heredia", "Clínica de la Solidaridad", "Clínica Santo Domingo", "Clínica San Pablo"]
};

// Datos de doctores por hospital o clínica
const datosDoctores = {
    "EsSalud": ["Dr. Juan Pérez", "Dr. María Gómez", "Dr. Carlos Rodríguez"],
    "Hospital Carrión": ["Dr. José Martínez", "Dr. Ana López", "Dr. Luis González"],
    "Hospital El Carmen": ["Dr. Pedro Sánchez", "Dr. Laura Díaz", "Dr. Manuel Ruiz"],
    "Clínica Ortega": ["Dr. Rafael García", "Dr. Patricia Martínez", "Dr. Miguel Rodríguez"],
    "Clínica Cayetano Heredia": ["Dr. Andrés López", "Dr. Sofía Ramírez", "Dr. Javier Pérez"],
    "Clínica de la Solidaridad": ["Dr. Marcos Soto", "Dr. Julia Torres", "Dr. Diego Vargas"],
    "Clínica Santo Domingo": ["Dr. Juan Castillo", "Dr. Carolina Herrera", "Dr. José Ramírez"],
    "Clínica San Pablo": ["Dr. Pablo Rodríguez", "Dr. Diana Gutiérrez", "Dr. Ricardo Fernández"]
};

// Datos de fechas y horas reservadas (simulado)
const fechasReservadas = {
    "EsSalud": ["2024-05-18T08:00", "2024-05-20T10:00", "2024-05-25T14:00"],
    "Hospital Carrión": ["2024-05-19T09:00", "2024-05-21T11:00", "2024-05-25T15:00"],
    "Hospital El Carmen": ["2024-05-20T08:30", "2024-05-22T10:30", "2024-05-25T16:00"],
    "Clínica Ortega": ["2024-05-21T09:30", "2024-05-23T11:30", "2024-05-25T17:00"],
    "Clínica Cayetano Heredia": ["2024-05-22T10:00", "2024-05-24T12:00", "2024-05-25T18:00"],
    "Clínica de la Solidaridad": ["2024-05-23T11:00", "2024-05-25T13:00"],
    "Clínica Santo Domingo": ["2024-05-24T12:30", "2024-05-25T14:30"],
    "Clínica San Pablo": ["2024-05-25T13:30"]
};

let reservaAceptada = false;

// Función para cargar las opciones de hospitales o clínicas
function cargarHospitales() {
    const tipoEntidad = document.getElementById("tipoEntidad").value;
    const selectHospital = document.getElementById("hospital");
    selectHospital.innerHTML = "<option value=''>Seleccione una opción</option>";
    datosHospitales[tipoEntidad].forEach(hospital => {
        const option = document.createElement("option");
        option.text = hospital;
        option.value = hospital;
        selectHospital.add(option);
    });
}

// Función para cargar los doctores según el hospital o clínica seleccionado
function cargarDoctores() {
    const hospitalSeleccionado = document.getElementById("hospital").value;
    const selectDoctor = document.getElementById("doctor");
    selectDoctor.innerHTML = "<option value=''>Seleccione un doctor</option>";
    datosDoctores[hospitalSeleccionado].forEach(doctor => {
        const option = document.createElement("option");
        option.text = doctor;
        option.value = doctor;
        selectDoctor.add(option);
    });
}

// Función para verificar si una fecha y hora están disponibles
function verificarDisponibilidad(fechaHora) {
    const hospitalSeleccionado = document.getElementById("hospital").value;
    return !fechasReservadas[hospitalSeleccionado].includes(fechaHora);
}

// Función para calcular el tiempo restante hasta la cita
function calcularTiempoRestante() {
    const fechaSeleccionada = new Date(document.getElementById("fecha").value);
    const ahora = new Date();
    const diferencia = fechaSeleccionada - ahora;
    if (diferencia <= 0) {
        document.getElementById("cronometro").style.display = "none";
        document.getElementById("iniciarConversacion").disabled = false;
        document.getElementById("iniciarConversacion").classList.remove("btn-disabled");
        document.getElementById("iniciarConversacion").style.backgroundColor = "#4CAF50"; // Color verde
    } else {
        const segundos = Math.floor((diferencia / 1000) % 60);
        const minutos = Math.floor((diferencia / 1000 / 60) % 60);
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        document.getElementById("contador").innerText = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    }
}


// Función para simular la aceptación de la reserva
function aceptarReserva() {
    reservaAceptada = true;
    document.getElementById("textoReserva").innerText = "Reserva aceptada, espere el tiempo correspondiente";
    document.getElementById("textoReserva").style.color = "green";
    document.getElementById("hacerReserva").disabled = true; // Deshabilitar el botón de hacer reserva
    document.getElementById("hacerReserva").classList.add("btn-disabled"); // Añadir la clase para dar estilo al botón deshabilitado
    document.getElementById("cronometro").style.display = "block"; // Mostrar el cronómetro
    setTimeout(calcularTiempoRestante, 120000); // 2 minutos de espera antes de activar el contador para iniciar la conversación
    document.getElementById("iniciarConversacion").disabled = false;
}

// Función para enviar la consulta
function enviarConsulta() {
    const tipoEntidad = document.getElementById("tipoEntidad").value;
    const hospital = document.getElementById("hospital").value;
    const doctor = document.getElementById("doctor").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha").value;
    const servicio = document.getElementById("servicio").value;

    if (!verificarDisponibilidad(fecha)) {
        alert("La fecha y hora seleccionadas no están disponibles. Por favor, elija otra.");
        return;
    }

    // Simular proceso de reserva
    document.getElementById("textoReserva").innerText = "Reserva en proceso de aceptación";
    document.getElementById("textoReserva").style.color = "red";
    setTimeout(aceptarReserva, 2000); // Simular proceso de aceptación de reserva

    // Aquí podrías enviar los datos a una base de datos o hacer alguna acción con ellos
    // Por ahora solo los mostraremos en consola
    console.log("Tipo de entidad:", tipoEntidad);
    console.log("Hospital:", hospital);
    console.log("Doctor:", doctor);
    console.log("Teléfono:", telefono);
    console.log("Fecha y hora de la consulta:", fecha);
    console.log("Servicio requerido:", servicio);
}

// Función para iniciar la conversación
function iniciarConversacion() {
    const fechaSeleccionada = new Date(document.getElementById("fecha").value);
    const ahora = new Date();
    const diferencia = fechaSeleccionada - ahora;
    if (diferencia > 0) {
        document.getElementById("textoReserva").innerText = "Espere los minutos correspondientes para su cita";
        document.getElementById("textoReserva").style.color = "red";
        return;
    }
    document.getElementById("cronometro").style.display = "block";
    calcularTiempoRestante();

    // Obtener el valor del servicio seleccionado
    const servicioSeleccionado = document.getElementById("servicio").value;

    // Redireccionar al usuario al chat con el doctor según el servicio seleccionado
    if (servicioSeleccionado === "cita") {
        window.location.href = "../FuncionesMenú/ChatBot/chat1.html";
    } else if (servicioSeleccionado === "historia") {
        window.location.href = "../FuncionesMenú/ChatBot/chat2.html";
    } else if (servicioSeleccionado === "certificado") {
        window.location.href = "../FuncionesMenú/ChatBot/chat3.html";
    } else if (servicioSeleccionado === "receta") {
        window.location.href = "../FuncionesMenú/ChatBot/chat4.html";
    } else {
        // Si no se seleccionó ningún servicio válido, mostrar un mensaje de error
        console.error("Error: Servicio no válido seleccionado.");
    }
}


// Event listeners
document.getElementById("tipoEntidad").addEventListener("change", cargarHospitales);
document.getElementById("hospital").addEventListener("change", cargarDoctores);
document.getElementById("fecha").addEventListener("change", calcularTiempoRestante);

// Inicialización del contador de tiempo restante
setInterval(calcularTiempoRestante, 1000);
