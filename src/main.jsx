import React from "react"; 
import ReactDOM from "react-dom/client"; 
// Importamos el componente raíz 
import App from "./App.jsx"; 
// Importante: trae Tailwind a la app 
import "./index.css"; 

// Punto de entrada de la app: renderiza <App /> dentro de #root 
ReactDOM.createRoot(document.getElementById("root")).render( 
  <React.StrictMode> 
    <App /> 
  </React.StrictMode> 
); 

