import supabase from "../config/supabase.js";

// GET all blogs
export const getBlogs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("blog")
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

// GET single blog
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("blog")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// CREATE blog
export const createBlog = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("blog")
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

// UPDATE blog
export const updateBlog = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("blog")
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

// DELETE blog
export const deleteBlog = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from("blog")
            .delete()
            .eq("id", id);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};