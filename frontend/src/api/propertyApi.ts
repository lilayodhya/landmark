import api from "./axios.ts";

export const getProperties = async () => {
    const response = await api.get("/properties");
    return response.data;
};

export const getProperty = async (id: string) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};