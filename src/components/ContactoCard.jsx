export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre}</h3>
      <p>📞 {telefono}</p>
      <p>✉️ {correo}</p>
      {etiqueta && <p>{etiqueta}</p>}
      <div className="acciones">
        <button className="btn-eliminar" onClick={() => onEliminar(correo)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
