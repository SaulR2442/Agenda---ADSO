// Importamos React y el hook useState para manejar estados locales del componente
import { useState } from "react";

// Componente FormularioContacto
// Recibe como props la función onAgregar (para crear un contacto)
// y la variable cargandoDesdeApp (si quieres reutilizar estados desde App, opcional)
function FormularioContacto({ onAgregar }) {
  // Estado principal del formulario: almacena los valores de cada campo
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Estado para almacenar los mensajes de error de validación por cada campo
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado que indica si el formulario está enviando la información al servidor
  // Sirve para desactivar el botón y mostrar un texto diferente
  const [enviando, setEnviando] = useState(false);

  // Función manejadora del cambio de los inputs
  // Se ejecuta cada vez que el usuario escribe en un campo
  const onChange = (e) => {
    // Extraemos el nombre y el valor del input que disparó el evento
    const { name, value } = e.target;

    // Actualizamos el estado del formulario, manteniendo lo anterior
    // y solo cambiando la propiedad correspondiente (nombre, telefono, correo o etiqueta)
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Función encargada de validar todos los campos del formulario
  // Devuelve true si el formulario es válido, y false en caso contrario
  function validarFormulario() {
    // Creamos un objeto temporal para ir llenando los mensajes de error
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    // Validación del campo "nombre"
    // .trim() elimina espacios en blanco al inicio y al final del texto
    // Esto evita que el usuario envíe solo espacios como si fuera un dato válido
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Validación del campo "telefono"
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    // Validación del campo "correo"
    if (!form.correo.trim()) {
      // Si el usuario no escribió nada
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      // Si escribió texto pero no contiene el símbolo @
      nuevosErrores.correo = "El correo debe contener @.";
    }

    // Actualizamos el estado de errores para que React vuelva a renderizar
    // y se muestren los mensajes en pantalla
    setErrores(nuevosErrores);

    // Retornamos true SOLO si no hay mensajes de error en ninguno de los campos
    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Función manejadora del envío del formulario
  // Es async porque puede llamar a una función onAgregar que se comunique con la API
  const onSubmit = async (e) => {
    // Evitamos que el formulario recargue la página por defecto
    e.preventDefault();

    // Ejecutamos la validación. Si no es válida, salimos y no guardamos el contacto
    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      // Marcamos que el formulario está en proceso de envío
      setEnviando(true);

      // Llamamos a la función que llega por props y que se encarga de guardar el contacto
      // Puede ser una llamada a la API a través de api.js
      await onAgregar(form);

      // Si todo fue exitoso, limpiamos los campos del formulario
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      // También limpiamos los mensajes de error
      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } finally {
      // Independientemente de si la operación salió bien o mal,
      // apagamos el estado de "enviando" para reactivar el botón
      setEnviando(false);
    }
  };

  // JSX que pinta el formulario en pantalla
  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >
      {/* Título del formulario */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Nuevo contacto
      </h2>

      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}    // El valor mostrado viene del estado form.nombre
          onChange={onChange}    // Al escribir, actualizamos el estado
        />
        {/* Si existe un mensaje en errores.nombre, lo mostramos debajo del input */}
        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}  // Valor controlado desde form.telefono
          onChange={onChange}
        />
        {/* Mensaje de error específico para el campo teléfono */}
        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}    // Valor controlado desde form.correo
          onChange={onChange}
        />
        {/* Mensaje de error específico para el campo correo */}
        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta (opcional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón para enviar el formulario */}
      <div className="pt-2">
        <button
          type="submit"
          // El botón se desactiva mientras enviando sea true
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700
                     disabled:bg-purple-300 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {/* Texto dinámico: cambia según el estado enviando */}
          {enviando ? "Guardando..." : "Agregar contacto"}
        </button>
      </div>
    </form>
  );
}

// Exportamos el componente para usarlo en App.jsx
export default FormularioContacto;
