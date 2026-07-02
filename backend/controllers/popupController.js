import supabase from "../config/supabase.js";

// Public welcome-popup form submission
export const createPopup = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("pop_up")
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE POPUP LEAD ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};