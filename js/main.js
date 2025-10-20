// Archivo: js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formReserva");
  const respuesta = document.getElementById("respuesta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturamos los datos del formulario
    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      servicio: form.servicio.value,
      fecha: form.fecha.value,
      hora: form.hora.value,
      inicio: `${form.fecha.value}T${form.hora.value}:00`,
      fin: calcularFin(form.fecha.value, form.hora.value)
    };

    console.log("📤 Enviando datos al webhook...", data);

    try {
      const response = await fetch("https://nobledevs.app.n8n.cloud/webhook/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Error al enviar la reserva.");

      const result = await response.json();
      console.log("✅ Respuesta del servidor:", result);

      respuesta.innerHTML = `
        <div class="alert alert-success mt-3">
          <strong>¡Reserva enviada con éxito!</strong><br>
          Gracias, ${data.nombre}. Te contactaremos por WhatsApp o email para confirmar tu turno.
        </div>
      `;
      form.reset();

    } catch (error) {
      console.error("❌ Error:", error);
      respuesta.innerHTML = `
        <div class="alert alert-danger mt-3">
          Hubo un error al enviar la reserva. Intenta nuevamente más tarde.
        </div>
      `;
    }
  });

  // Calcula una hora después para el fin del evento
  function calcularFin(fecha, hora) {
    const [h, m] = hora.split(":").map(Number);
    const fin = new Date(fecha);
    fin.setHours(h + 1, m);
    return fin.toISOString().slice(0, 16);
  }
});
