const Nombre = "Saúl";
const Ficha = "3412768";
const Notas = [3.0, 2.2, 2.8];
const Promedio = (Notas[0] + Notas[1] + Notas[2]) / 3;

console.log(`
  =================
SISTEMA DE NOTAS SENA
  ================= 
  Aprendiz ${Nombre}
  Ficha ${Ficha}
  Notas ${Notas}
  =================
  Promedio ${Promedio.toFixed(2)}
  Estado ${Promedio >= 3 ? "Aprobado" : "No Aprobado"}
  `);





    