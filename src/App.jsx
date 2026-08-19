// App.jsx
import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
// Nota: toda la lógica de contactos (agregar/eliminar/persistir) se mantiene.
export default function App() {
  // 1) Cargar lo guardado en localStorage (o array vacío)
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];
  // 2) Estado con la lista de contactos
  const [contactos, setContactos] = useState(contactosGuardados);
  // 3) Persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);
  // 4) Agregar contacto (siempre inmutable)
  const agregarContacto = (nuevo) => setContactos((prev) => [...prev, nuevo]);
  // 5) Eliminar usando correo como clave única
  const eliminarContacto = (correo) =>
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  return (
    <main className="min-h-screen py-10 px-4">
      {/* Título centrado con color morado */}
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Agenda ADSO v3
      </h1>
      <div className="max-w-4xl mx-auto">
        {/* Tarjeta del formulario */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <FormularioContacto onAgregar={agregarContacto} />
        </section>
        {/* Lista de contactos */}
        <section className="space-y-4">
          {contactos.map((c) => (
            <ContactoCard key={c.correo} {...c} onEliminar={eliminarContacto} />
          ))}
        </section>
      </div>
    </main>
  );
}
