import api from "./axios";

export const createSellRequest = async (data: any) => {
    const response = await api.post("/sell", data);
    return response.data;
};