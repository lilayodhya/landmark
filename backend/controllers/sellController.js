import supabase from "../config/supabase.js";

// Public sell-request form submission
export const createSellRequest = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("sell")
      .insert([req.body])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE SELL REQUEST ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};