import supabase from "../config/supabase.js";

// GET all popup leads
export const getPopups = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("pop_up")
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

// CREATE popup lead
export const createPopup = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("pop_up")
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

// DELETE popup lead
export const deletePopup = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from("pop_up")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};