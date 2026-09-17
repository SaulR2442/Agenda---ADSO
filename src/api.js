// Capa de acceso a datos de la Agenda ADSO (llamadas a la API REST con JSON Server).

// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";

// Función GET: listar contactos (READ)
export async function listarContactos() {
  // Hacemos un GET a la URL base (lista de contactos)
  const res = await fetch(API_BASE_URL);

  // Si la respuesta no es correcta (código 4xx o 5xx), lanzamos un error
  if (!res.ok) throw new Error("Error al listar contactos");

  // Parseamos el JSON y lo retornamos (devuelve un array de contactos)
  return res.json();
}

// Función POST: crear un nuevo contacto (CREATE)
export async function crearContacto(data) {
  // Hacemos un POST a la URL base con el objeto recibido
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Convertimos el objeto JavaScript a JSON
  });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al crear el contacto");

  // Devolvemos el contacto creado que regresa la API (incluye el id)
  return res.json();
}

// Función PUT: actualizar un contacto existente (UPDATE)
export async function actualizarContacto(id, data) {
  // Hacemos un PUT a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Enviamos el contacto actualizado
  });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al actualizar el contacto");

  // Devolvemos el contacto actualizado que regresa la API
  return res.json();
}

// Función DELETE: eliminar contacto por id (DELETE)
export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al eliminar el contacto");

  // Devolvemos true indicando éxito
  return true;
}
