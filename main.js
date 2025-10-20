const form = document.getElementById("formReserva");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Construir fechas con zona horaria -03:00
  const inicio = `${form.fecha.value}T${form.hora.value}:00-03:00`;
  const [hora, minuto] = form.hora.value.split(":");
  const finHora = String(Number(hora) + 1).padStart(2, "0");
  const fin = `${form.fecha.value}T${finHora}:${minuto}:00-03:00`;

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    whatsapp: form.whatsapp.value,
    servicio: form.servicio.value,
    inicio,
    fin
  };

  try {
    const response = await fetch("https://nobledevs.app.n8n.cloud/webhook/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const mensaje = document.getElementById("respuesta");
    if (response.ok) {
      mensaje.innerHTML = '<div class="alert alert-success mt-3">✅ Reserva enviada con éxito. ¡Gracias por elegir Lavadero Pro!</div>';
      form.reset();
    } else {
      mensaje.innerHTML = '<div class="alert alert-danger mt-3">❌ Error al enviar la reserva. Intenta nuevamente.</div>';
    }
  } catch (error) {
    console.error(error);
    document.getElementById("respuesta").innerHTML = '<div class="alert alert-danger mt-3">❌ Error de conexión. Verifica tu conexión e intenta otra vez.</div>';
  }
});
