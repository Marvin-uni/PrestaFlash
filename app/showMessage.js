export function showMessage(message, type = "success") {
    Toastify({
      text: message,
      duration: 4000,
      destination: "aa",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: type === "success" ? "green" : "red",
      },
      // onClick: function () { } // Callback after click
    }).showToast();
  }