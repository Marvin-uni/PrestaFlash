export function showMessage(message, type = "success") {
  Toastify({
    text: message,
    duration: 4000,
    destination: "aa",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "bottom", // Asegúrate de establecer "bottom" para la posición
    stopOnFocus: true,
    style: {
      background: type === "success" ? "green" : "red",
    },
    // onClick: function () { }
  }).showToast();
}