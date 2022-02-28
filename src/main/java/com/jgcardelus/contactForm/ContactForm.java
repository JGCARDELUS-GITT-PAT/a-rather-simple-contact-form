package com.jgcardelus.contactForm;

// Clase para guardar la información de contacto.
public class ContactForm {
    private String name;
    private String surname;
    private int age;

    public ContactForm(String name, String surname, int age) {
        this.setName(name);
        this.setSurname(surname);
        this.setAge(age);
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Nombre: " + this.getName());
        sb.append(" ").append(this.getSurname());
        sb.append(" /// Age: ").append(this.getAge());

        return sb.toString();
    }
}
