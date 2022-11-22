
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["ar", "cl", "uy", "ec", "co", "ce", "pe", "py", "bo", "br", "ve", "mx", "us", "ca", "es"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.18/js/utils.js"
});

/*         const info = document.querySelector(".alert-msg");

function process(event) {
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();

    info.style.display = "";
    info.innerHTML = `Su número de teléfono es: <strong>${phoneNumber}</strong>`;
} */