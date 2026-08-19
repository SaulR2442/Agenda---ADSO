import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  return (
    <form className="form-contacto" onSubmit={onSubmit}>
      <label>Nombre *</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ej: Ana López"
      />
      <label>Teléfono *</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        placeholder="Ej: 300 123 4567"
      />
      <label>Correo *</label>
      <input
        name="correo"
        value={form.correo}
        onChange={onChange}
        placeholder="Ej: ana@sena.edu.co"
      />
      <label>Etiqueta (opcional)</label>
      <input
        name="etiqueta"
        value={form.etiqueta}
        onChange={onChange}
        placeholder="Ej: Trabajo"
      />
      <button className="btn-primario">Agregar contacto</button>
    </form>
  );
}
