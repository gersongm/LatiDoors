import { SearchData } from "@/app/Backend/sql/sqlAll";
import { sqlReportesVentas } from "@/app/Backend/sql/sqlReportesVentas";

export const SalesData = async () => {
  try {
    // Ejecutar la consulta principal
    const results = await sqlReportesVentas();
    

   
    if (!results || results.length === 0) {
      console.warn("No se encontraron datos en los últimos 3 meses");
      return [];
    }
 // Aquí puedes formatear los nombres de los meses en español si es necesario

     // Formatear y capitalizar el nombre del mes en español
     const formattedResults = results.map((row: { mes: string; total_monto: number }) => {
      let monthInSpanish = new Date(Date.parse(row.mes + " 1")).toLocaleString('es-ES', { month: 'long' });
       monthInSpanish =monthInSpanish.charAt(0).toUpperCase() + monthInSpanish.slice(1); // Capitaliza la primera letra
      return {
        name: monthInSpanish,
        value: row.total_monto,
      };
    });
// Verifica los datos formateados
    return formattedResults;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};


