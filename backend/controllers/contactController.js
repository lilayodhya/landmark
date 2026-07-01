import supabase from "../config/supabase.js";

// GET all contact submissions
export const getContacts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("contact_us")
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

// CREATE contact submission
export const createContact = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("contact_us")
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

// DELETE contact submission
export const deleteContact = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("contact_us")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });

    } catch (err) {
    console.error(err);

    res.status(500).json({
        success: false,
        error: err.message
    });
}
};