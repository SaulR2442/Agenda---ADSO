import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v3</h1>
      <p className="subtitulo">
        Persistencia con localStorage + UI moderna
      </p>

      <FormularioContacto onAgregar={agregarContacto} />

      {contactos.map((c) => (
        <ContactoCard
          key={c.correo}
          {...c}
          onEliminar={eliminarContacto}
        />
      ))}
    </main>
  );
}
