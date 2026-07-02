import supabase from "../config/supabase.js";

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error("GET BLOGS ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// GET one blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("GET BLOG ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};