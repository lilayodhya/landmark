import supabase from "../config/supabase.js";

// Public scheduled-visit form submission
export const createScheduledVisit = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("scheduled_visits")
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE SCHEDULED VISIT ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};