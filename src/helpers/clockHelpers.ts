export const getFormattedTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  export const getFormattedDate = (date: Date): string => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 
      'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const day = date.getDate();
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} de ${monthName} ${year}`;
  };
  