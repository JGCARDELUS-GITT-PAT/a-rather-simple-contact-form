package com.jgcardelus.contactForm;


import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactFormController {
    // Si alguien llama a la URL /contacts con el método GET devuelo un String con hola.
    @GetMapping("/contacts")
    public String getContacts() {
        return "Hola";
    }

    // Escucho a que alguien llame a la url /contacts con el método POST
    @PostMapping("/contacts")
    public ContactForm postContact(@RequestBody ContactForm contactForm) {
        // Después de recibir la información, le cambio el apellido, para que se note que ha pasado por el servidor
        contactForm.setSurname("Garcia");
        // Devuelvo la información. SpringBoot automáticamente convierte este objeto a JSON.
        return contactForm;
    }
}
