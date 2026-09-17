// Componente que muestra la información de un contacto en una tarjeta.
// Incluye botones para Editar y Eliminar.

function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, onEditar }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      {/* Información principal del contacto */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          {nombre}
        </h3>
        <p className="text-sm text-gray-600">
          Tel: {telefono}
        </p>
        <p className="text-sm text-gray-600">
          Correo: {correo}
        </p>
        {etiqueta && (
          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            {etiqueta}
          </span>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 justify-end">
        {/* Botón Editar */}
        <button
          type="button"
          onClick={onEditar}
          className="text-xs md:text-sm px-3 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Editar
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={onEliminar}
          className="text-xs md:text-sm px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ContactoCard;
