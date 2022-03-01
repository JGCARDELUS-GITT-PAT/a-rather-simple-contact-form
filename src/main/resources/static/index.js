// Hide content
const hideContent = () => {
    const alerts = $(".content");
    for (let alert of alerts) {
        if (!$(alert).hasClass("hidden")) {
            $(alert).addClass("hidden");
        }
    }
};

const showForm = () => {
    hideContent();
    const form = $("#form");
    if (form.hasClass("hidden")) {
        form.removeClass("hidden");
    }
};

const showResponse = (name, surname, age) => {
    hideContent();

    $("#name-read").val(name);
    $("#surname-read").val(surname);
    $("#age-read").val(age);

    const response = $("#response");
    if (response.hasClass("hidden")) {
        response.removeClass("hidden");
    }
};

// Hide alerts
const hideAlerts = () => {
    const alerts = $(".alert");
    for (let alert of alerts) {
        if (!$(alert).hasClass("hidden")) {
            $(alert).addClass("hidden");
        }
    }
};

// Show error
const showError = (message) => {
    hideAlerts();
    const alert = $("#alert-error");
    alert.html(message);
    if (alert.hasClass("hidden")) {
        alert.removeClass("hidden");
    }
};

// Show success
const showSuccess = (message) => {
    hideAlerts();
    const success = $("#alert-success");
    success.html(message);
    if (success.hasClass("hidden")) {
        success.removeClass("hidden");
    }
};

// Validate information
const validate = (name, surname, age) => {
    // A bit of not DRY code but gets the job done
    if (name.trim() == "") {
        showError("Si no pones tu nombre. No podemos vender tu información.");
        return false;
    } else if (surname.trim() == "") {
        showError("Si no pones tu apellido. No podemos vender tu información.");
        return false;
    } else if (age.trim() == "") {
        showError("Si no pones tu edad. No podemos vender tu información.");
        return false;
    } else if (parseInt(age.trim()) > 100 || parseInt(age.trim()) < 0) {
        showError(
            "Venga, no te crees ni tu que tienes a) Más de 100 años b) Menos de 0"
        );
        return false;
    }

    return true;
};

// Otra manera de hacer una función, como function postContactToServer() {}
const postContactToServer = async () => {
    // Cojo los datos que haya en los inputs
    // Lo hago con jQuery, el equivalente en JS simple (o vanilla) es document.getElementById("name").value;
    const name = $("#name").val();
    const surname = $("#surname").val();
    const age = $("#age").val();

    // If information is not valid, cancel upload
    if (!validate(name, surname, age)) {
        return;
    }

    // Llamo a la url /contacts en mi servidor
    let request = await fetch("/contacts", {
        method: "POST", // Indico que voy a subir datos
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        body: JSON.stringify({
            // Guardo los datos en el body, que es lo que va a procesar el RestController
            name: name,
            surname: surname,
            age: age,
        }),
        dataType: "json",
    });

    // Compruebo que mi petición ha ido bien (como status.ok, pero más específico)
    if (request.status === 200) {
        const data = await request.json(); // El servidor me va a devolver lo que le he enviado
        showSuccess(
            "Todo ha ido bien! Ahora te enseñamos que ha devuelto el servidor."
        );
        setTimeout(() => {
            showResponse(data.name, data.surname, data.age);
        }, 2000);
    } else {
        showError(
            "Ha habido un error un error con el servidor. Por favor, inténtalo más tarde"
        );
    }
};

const start = () => {
    hideAlerts();
    showForm();
};

// Esto es otra manera de escuchar a un evento de click. Es como poner en el botoón de HTML: onclick="postContactToServer()"
// Es usando la librería de jQuery
$("#save").on("click", (event) => {
    // Evito que la página se recargue cuando le de al botón
    event.preventDefault();
    // Guardo la información
    postContactToServer();
});

$("#go-back").on("click", (event) => {
    hideAlerts();
    showForm();
});

start();
