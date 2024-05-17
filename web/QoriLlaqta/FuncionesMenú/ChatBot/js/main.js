// Elementos del chatbot
var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('container');

// Objeto para almacenar datos del usuario durante la interacción
var user = {
    message: "",
    counter: 0,
    name: "",
    dni: "",
    age: "",
    phoneNumber: "",
    reasonForAppointment: ""
};

// Función para enviar mensajes del médico (chatbot)
function doctorSendMessage(messageText) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('medico');
    messageElement.textContent = "Médico: " + messageText;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para procesar mensajes del usuario
function processMessage() {
    var userMessage = user.message.toLowerCase().trim();

    switch (user.counter) {
        case 0:
            // Reconocimiento por documento de identificación (DNI)
            if (validateDNI(userMessage)) {
                // Simular datos predefinidos asociados a un DNI
                user.name = "Kenyi Yaranga";
                user.age = "21";
                user.gender = "masculino";
                user.phoneNumber = "+51 907 948 023";

                doctorSendMessage("Hola " + user.name.split(' ')[0] + ". ¿Cuál es el motivo de tu reserva?");
                user.counter++;
            } else {
                doctorSendMessage("Por favor, introduce un número de DNI válido (8 dígitos numéricos).");
            }
            break;
        case 1:
            // Recibir motivo de reserva
            user.reasonForAppointment = userMessage;
            doctorSendMessage("Estas son las fechas disponibles para tu reserva: 25 de mayo, 27 de mayo, 29 de mayo. ¿Cuál prefieres?");
            user.counter++;
            break;
        case 2:
            // Recibir fecha seleccionada
            if (userMessage.includes("25") || userMessage.includes("27") || userMessage.includes("29")) {
                doctorSendMessage("Perfecto. ¿A qué hora te gustaría agendar tu cita? Tenemos disponibilidad a las 8 am, 9 am y 10 am.");
                user.counter++;
            } else {
                doctorSendMessage("Por favor, selecciona una fecha válida de las opciones proporcionadas.");
            }
            break;
        case 3:
            // Recibir hora seleccionada
            if (userMessage.includes("8 am") || userMessage.includes("9 am") || userMessage.includes("10 am")) {
                doctorSendMessage("Gracias por reservar. Aquí está el código QR para tu reserva:");
                showQRCode();
                user.counter = 0; // Reiniciar contador para futuras interacciones
            } else {
                doctorSendMessage("Por favor, selecciona una hora válida de las opciones proporcionadas.");
            }
            break;
    }
}

// Función para validar número de DNI (8 dígitos numéricos)
function validateDNI(dni) {
    return /^\d{8}$/.test(dni);
}

// Función para mostrar un código QR (simulado) con opción de descarga
function showQRCode() {
    var qrImage = document.createElement('img');
    qrImage.src = 'qr/Reserva1.jpg'; // Ruta de tu imagen QR

    // Establecer estilos para la imagen
    qrImage.style.marginTop = "10px";
    qrImage.style.width = "200px"; // Ancho de la imagen (más grande que antes)
    qrImage.style.height = "auto"; // Altura automática para mantener la proporción

    // Crear un contenedor para la imagen y el botón de descarga
    var imageContainer = document.createElement('div');
    imageContainer.classList.add('message');
    imageContainer.classList.add('medico');
    imageContainer.classList.add('image-container');

    // Agregar la imagen al contenedor
    imageContainer.appendChild(qrImage);

    // Crear un elemento <a> para la descarga de la imagen
    var downloadLink = document.createElement('a');
    downloadLink.href = qrImage.src;
    downloadLink.download = 'Reserva1.jpg';
    downloadLink.textContent = 'Descargar';
    imageContainer.appendChild(downloadLink);

    chatContainer.appendChild(imageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para enviar mensajes del usuario
function sendMessage(messageText) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('usuario');
    messageElement.textContent = "Tú: " + messageText;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Procesar el mensaje del usuario
    user.message = messageText;
    processMessage();
}

// Evento click en el botón "Enviar"
sendBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (textbox.value.trim() === "") {
        alert('Por favor, escribe un mensaje.');
    } else {
        let messageText = textbox.value.trim();
        sendMessage(messageText);
        textbox.value = ""; // Limpiar el campo de texto después de enviar el mensaje
    }
});

// Ejecutar un mensaje inicial del médico
doctorSendMessage("Buen día. Soy el Dr. Marcos Soto. Para reservar una cita, necesitaremos verificar algunos datos personales. Por favor, introduce tu documento de identificación (DNI).");
