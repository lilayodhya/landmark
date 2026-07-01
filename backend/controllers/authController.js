import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
    try {

        const { name, email, password, phone } = req.body;

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    phone,
                    password_hash: hashedPassword
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }
};

// LOGIN
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) throw error;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};

// GET ALL USERS (Admin Only)
export const getUsers = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("users")
            .select("id, name, email, phone, role, created_at");

        if (error) throw error;

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

};