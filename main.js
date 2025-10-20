const form = document.getElementById("formReserva");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Calcular inicio y fin en formato ISO
  const inicio = new Date(`${form.fecha.value}T${form.hora.value}`).toISOString();
  const finDate = new Date(`${form.fecha.value}T${form.hora.value}`);
  finDate.setHours(finDate.getHours() + 1); // Evento de 1 hora
  const fin = finDate.toISOString();

  // Preparar datos a enviar al webhook
  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    whatsapp: form.whatsapp.value,
    servicio: form.servicio.value,
    inicio: inicio,
    fin: fin
  };

  try {
    const response = await fetch("https://nobledevs.app.n8n.cloud/webhook-test/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById("respuesta").innerText = "✅ Reserva enviada con éxito!";
      form.reset();
    } else {
      document.getElementById("respuesta").innerText = "❌ Error al enviar la reserva. Intenta nuevamente.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("respuesta").innerText = "❌ Error al enviar la reserva. Intenta nuevamente.";
  }
});
