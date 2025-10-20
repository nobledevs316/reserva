const form = document.getElementById("formReserva");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    whatsapp: form.whatsapp.value,
    servicio: form.servicio.value,
    fecha: form.fecha.value,
    hora: form.hora.value
  };

  try {
    const response = await fetch("https://nobledevs.app.n8n.cloud/webhook-test/reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById("respuesta").innerText = "Reserva enviada con éxito!";
      form.reset();
    } else {
      document.getElementById("respuesta").innerText = "Error al enviar la reserva.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("respuesta").innerText = "Error al enviar la reserva.";
  }
});
