import supabase from "../config/supabase.js";

// Public enquiry form submission
export const createEnquiry = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("enquiry")
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE ENQUIRY ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};