import supabase from "../config/supabase.js";

// GET all enquiries
export const getEnquiries = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("enquiry")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {
        console.error("GET ENQUIRY ERROR:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// CREATE enquiry
// CREATE enquiry
export const createEnquiry = async (req, res) => {

    console.log("BODY RECEIVED:", req.body);

    const { data, error } = await supabase
        .from("enquiry")
        .insert([req.body])
        .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(data);
};

// DELETE enquiry
export const deleteEnquiry = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("enquiry")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully"
        });

    } catch (err) {

        console.error("DELETE ENQUIRY ERROR:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};