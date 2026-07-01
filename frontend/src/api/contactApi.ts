import api from "./axios";

export const createContact = async (data: any) => {
    const response = await api.post("/contact-us", data);
    return response.data;
};