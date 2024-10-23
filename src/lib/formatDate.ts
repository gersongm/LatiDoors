export function formatDate(dateStr: Date): string {

    const date = new Date(dateStr);

    // Handle potential invalid date parsing (e.g., invalid format)
    if (isNaN(date.getTime())) {
      return 'Invalid date format'; // Or handle it differently as needed
    }
const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const day = date.getDate();
const month = months[date.getMonth()];
const year = date.getFullYear();

return `${day} ${month}, ${year}`;

}