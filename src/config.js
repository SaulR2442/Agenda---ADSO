// Este archivo centraliza configuraciones reutilizables de la Agenda ADSO.

// URL base del backend local de Agenda ADSO.
// Si cambia el puerto o la ruta, solo se modifica aquí.
export const API_BASE_URL = "http://localhost:3002/contactos";

// Información general de la aplicación que se utilizará en App.jsx
export const APP_INFO = {
  // Número de ficha que se muestra en el encabezado
  ficha: "3223876",
  // Título principal de la aplicación
  titulo: "Agenda ADSO v7",
  // Subtítulo o descripción corta que aparece debajo del título
  subtitulo:
    "Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.",
};
