import axios from "axios";

const apiUrl = "http://localhost:3001";

export const getClients = async () => {
  try {
    const response = await axios.get(`${apiUrl}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

export const getSessionNotes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/sessionNotes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session notes:", error);
    throw new Error("Failed to fetch session notes");
  }
};
