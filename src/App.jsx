// Componente principal de la aplicación Agenda ADSO.
// Responsabilidades:
// - Cargar la lista de contactos desde la API (JSON Server).
// - Manejar estados globales (contactos, carga, error).
// - Manejar el contacto en edición.
// - Conectar el formulario, el buscador y las tarjetas de contactos.
// - Aplicar búsqueda, ordenamiento y edición.

// Importamos hooks de React
import { useEffect, useState } from "react";

// Importamos las funciones de la API (capa de datos)
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global de la aplicación
import { APP_INFO } from "./config";

// Importamos componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información (por ejemplo, al inicio)
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error generales de la aplicación
  const [error, setError] = useState("");

  // Estado para el término de búsqueda digitado por el usuario
  const [busqueda, setBusqueda] = useState("");

  // Estado para el orden de los contactos: true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Estado para saber qué contacto estamos editando (o null si no editamos)
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // useEffect que se ejecuta una sola vez al montar el componente.
  // Aquí cargamos los contactos iniciales desde JSON Server (GET).
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true); // Indicamos que estamos cargando
        setError(""); // Limpiamos posibles errores anteriores

        const data = await listarContactos(); // Llamamos a la API
        setContactos(data); // Guardamos la lista de contactos en el estado
      } catch (error) {
        // En caso de error, lo registramos en consola para depuración
        console.error("Error al cargar contactos:", error);

        // Y mostramos un mensaje amigable al usuario
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false); // Finalizamos el estado de carga
      }
    };

    cargarContactos();
  }, []);

  // Función que se encarga de agregar un nuevo contacto usando la API (CREATE)
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      // Limpiamos cualquier error previo antes de intentar guardar
      setError("");

      // Llamamos al servicio que crea el contacto en JSON Server
      const creado = await crearContacto(nuevoContacto);

      // Actualizamos el estado agregando el contacto recién creado a la lista
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      // Mostramos el error en consola para facilitar la depuración
      console.error("Error al crear contacto:", error);

      // Si falla la creación, mostramos un mensaje claro y útil
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      // Relanzar el error permite que el formulario también pueda reaccionar
      throw error;
    }
  };

  // Función para actualizar un contacto (UPDATE)
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError(""); // Limpiamos errores previos

      // Llamamos a la API para actualizar el contacto por id
      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      // Recorremos la lista y reemplazamos el contacto que coincida por id
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );

      // Limpiamos el contacto en edición (salimos de modo edición)
      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o el servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // Función para eliminar un contacto por su id (DELETE)
  const onEliminarContacto = async (id) => {
    try {
      setError(""); // Limpiamos errores previos
      await eliminarContactoPorId(id); // Llamamos al servicio de eliminación

      // Filtramos el contacto eliminado de la lista local
      setContactos((prev) => prev.filter((c) => c.id !== id));

      // Si el contacto que se elimina estaba en edición, cancelamos la edición
      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (error) {
      // Mostramos el error en consola para depurar
      console.error("Error al eliminar contacto:", error);

      // Si algo falla al eliminar, informamos al usuario
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // Función para activar el modo edición al hacer clic en "Editar"
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto); // Guardamos el contacto que se va a editar
    setError(""); // Limpiamos posibles errores previos
  };

  // Función para cancelar la edición y volver a modo "crear"
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // === LÓGICA DE BÚSQUEDA Y ORDENAMIENTO (Clase 10) ===

  // 1. Filtramos la lista original según el término de búsqueda
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

  // 2. Ordenamos los contactos filtrados por nombre
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  // JSX que renderiza toda la aplicación
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal centrado */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Encabezado principal de la Agenda usando la configuración global */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* Si hay un error global, lo mostramos en un recuadro rojo */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Si estamos cargando, mostramos un mensaje de carga */}
        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* Formulario para crear o editar contactos */}
            {/* La key fuerza el re-montaje al cambiar de modo, reiniciando
                el estado del formulario de forma natural */}
            <FormularioContacto
              key={contactoEnEdicion ? contactoEnEdicion.id : "nuevo"}
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />

            {/* Buscador y botón de orden */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* Listado de contactos (usa contactosOrdenados) */}
            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => onEditarClick(c)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página con los datos del instructor */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

// Exportamos el componente principal
export default App;
