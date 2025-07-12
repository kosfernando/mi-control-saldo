let saldo = Number(localStorage.getItem('saldo')) || 0;
let historial = JSON.parse(localStorage.getItem('historial')) || [];

document.getElementById("saldo").innerText = saldo;
renderHistorial();

function actualizarSaldo() {
  document.getElementById("saldo").innerText = saldo;
  localStorage.setItem('saldo', saldo);
}

function guardarHistorial(tipo, monto) {
  const fecha = new Date().toLocaleString();
  historial.unshift({ tipo, monto, fecha });
  localStorage.setItem('historial', JSON.stringify(historial));
  renderHistorial();
}

function renderHistorial() {
  const lista = document.getElementById("lista-historial");
  lista.innerHTML = "";
  historial.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.fecha} - ${item.tipo}: S/ ${item.monto}`;
    li.style.color = item.tipo === "Gasto" ? "#dc3545" : "#28a745";
    lista.appendChild(li);
  });
}

function sumar() {
  let monto = Number(document.getElementById("cantidad").value);
  if (!isNaN(monto) && monto > 0) {
    saldo += monto;
    actualizarSaldo();
    guardarHistorial("Depósito", monto);
    document.getElementById("cantidad").value = "";
  }
}

function restar() {
  let monto = Number(document.getElementById("cantidad").value);
  if (!isNaN(monto) && monto > 0) {
    saldo -= monto;
    actualizarSaldo();
    guardarHistorial("Gasto", monto);
    document.getElementById("cantidad").value = "";
  }
}

document.getElementById("btn-historial").addEventListener("click", () => {
  const seccion = document.getElementById("historial");
  seccion.classList.toggle("oculto");
});
