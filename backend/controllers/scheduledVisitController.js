import supabase from "../config/supabase.js";

// GET all scheduled visits
export const getScheduledVisits = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("scheduled_visits")
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

// CREATE scheduled visit
export const createScheduledVisit = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("scheduled_visits")
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

// DELETE scheduled visit
export const deleteScheduledVisit = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("scheduled_visits")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Scheduled visit deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};