// Otra manera de hacer una función, como function postContactToServer() {}
const postContactToServer = async () => {
    // Cojo los datos que haya en los inputs
    // Lo hago con jQuery, el equivalente en JS simple (o vanilla) es document.getElementById("name").value;
    const name = $("#name").val();
    const surname = $("#surname").val();
    const age = $("#age").val();

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
        console.log(data); // Lo imprimo por consola.
    }
};

// Esto es otra manera de escuchar a un evento de click. Es como poner en el botoón de HTML: onclick="postContactToServer()"
// Es usando la librería de jQuery
$("#save").on("click", (event) => {
    // Evito que la página se recargue cuando le de al botón
    event.preventDefault();
    // Guardo la información
    postContactToServer();
});
