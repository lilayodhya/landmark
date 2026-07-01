import supabase from "../config/supabase.js";

// GET all properties
export const getProperties = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("properties")
            .select("*");

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// GET single property
export const getPropertyById = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// CREATE property
export const createProperty = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("properties")
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

// UPDATE property
export const updateProperty = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("properties")
            .update(req.body)
            .eq("id", id)
            .select();

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// DELETE property
export const deleteProperty = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("properties")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Property deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};