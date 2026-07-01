import supabase from "../config/supabase.js";

// GET all sell requests
export const getSellRequests = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("sell")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// CREATE sell request
export const createSellRequest = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("sell")
            .insert([req.body])
            .select();

        if (error) throw error;

        res.status(201).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// DELETE sell request
export const deleteSellRequest = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("sell")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Sell request deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};