import { API_SERVER_URL } from "@/app/constantes";

const sqlAll = async (tabla: string) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};
export default sqlAll;

export const sqlDelete = async (tabla: string, id: string) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter
  url.searchParams.append("id", id.toString());

  try {
    const formData = new FormData();
    formData.append("METHOD", "DELETE");
    formData.append("isVisible", "false");
    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};

export const sqlAdd = async (tabla: string, rows: object) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter

  try {
    const formData = new FormData();
    formData.append("METHOD", "INSERT");
    // Loop through each row in the array and append data

    Object.entries(rows).forEach(([key, value]) => {
      if (key !== "id") {
        if (key === "isActivo") {
          value = +value;
        } // pasa el boleano a numerico
        formData.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};

export const sqlUpdate = async (tabla: string, rows: object) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter

  try {
    const formData = new FormData();
    formData.append("METHOD", "UPDATE");
    // Loop through each row in the array and append data

    Object.entries(rows).forEach(([key, value]) => {
      if (key === "isActivo") {
        value = +value;
      } // pasa el boleano a numerico
      formData.append(key, value);
    });
    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:",rows);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};

export const sqlSelect = async (tabla:string,consulta:string) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla);
  const sql= `${consulta}`;

  url.searchParams.append("sql", sql);
  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};
