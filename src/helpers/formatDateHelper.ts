export const formatDate = (date: string | Date, locale: string = 'es-ES'): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, 
    };
  
    const formattedDate = new Intl.DateTimeFormat(locale, options).format(new Date(date));
  
    return formattedDate;
  };
  