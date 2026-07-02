import supabase from "../config/supabase.js";

// Public contact-form submission
export const createContact = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contact_us")
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE CONTACT ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};