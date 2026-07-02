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
      error: err.message,
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
      error: err.message,
    });
  }
};