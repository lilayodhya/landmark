import api from "./axios";

export const createPopupLead = async (data: any) => {
    const response = await api.post("/pop-up", data);
    return response.data;
};