import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); // evita recargar
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos Nombre y Teléfono");
      return;
    }
    onAgregar(form); // App agrega id y actualiza la lista
    setForm({ nombre: "", correo: "", telefono: "", etiqueta: "" }); // limpiar
  };

  return (
    <form onSubmit={onSubmit} className="form-contacto">
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={onChange}
      />
      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
      />
      <input
        name="etiqueta"
        placeholder="Etiqueta (opcional)"
        value={form.etiqueta}
        onChange={onChange}
      />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}
