import api from "./axios.ts";

export const getProperties = async () => {
    const response = await api.get("/properties");
    return response.data;
};

export const getProperty = async (id: string) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};

export const createProperty = async (property: any, token: string) => {
    return api.post("/properties", property, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateProperty = async (
    id: string,
    property: any,
    token: string
) => {
    return api.put(`/properties/${id}`, property, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteProperty = async (
    id: string,
    token: string
) => {
    return api.delete(`/properties/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};