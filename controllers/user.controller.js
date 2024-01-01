const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//===================================================

exports.registration = async (req, res) => {
  const { equipe, email, password, role } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Cette adresse mail est déjà utilisée!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      equipe,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user", // Set role to 'user' if not provided
    });

    // Create token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    newUser.token = token;
    await newUser.save();

    res.status(200).json({
      status: true,
      message: "Une équipe est ajoutée avec succès",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};

//=======================================================================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input Validation and User Existence Check
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email et Mot de passe Obligatoire!" });
    }
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.user = user;

      // Token Generation
      const token = generateToken(user);
      user.token = token;

      // Response Handling
      return res
        .status(200)
        .json({ status: true, message: "Vous êtes connecté", user, token });
    } else {
      res.status(400).json({
        status: false,
        message: "Adresse mail ou mot de passe incorrect!",
      });
    }
  } catch (error) {
    // Default Error Handling
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};

// Token Generation Function
function generateToken(user) {
  try {
    return jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: "10h" }
    );
  } catch (error) {
    throw new Error("Token generation failed");
  }
}

//======================================================================

exports.initiatePasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Utilisateur non trouvable!",
      });
    }

    // Generate a reset token and set expiration (for example, 1 hour)
    const resetToken = crypto.randomBytes(10).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send the reset token to the user (e.g., via email)
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MANAGER_EMAIL, // Your Gmail email address
        pass: process.env.MANAGER_EMAIL_PASS, // Your Gmail email password or an app-specific password
      },
    });
    // Function to send the reset token via email
    async function sendResetToken(email, resetToken) {
      const mailOptions = {
        from: process.env.MANAGER_EMAIL, // Sender email address
        to: email,
        subject: "Réinitialisation du mot de passe",
        text: `Code: ${resetToken}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Reset token sent to ${email} successfully.`);
      } catch (error) {
        console.error(`Error sending reset token to ${email}:`, error);
      }
    }

    // Example usage
    // const userEmail = "mom@gmail.com"; // Replace with the user's email
    // const resetToken = "abcdef123456"; // Replace with the generated reset token

    sendResetToken(email, resetToken);

    res.status(200).json({
      status: true,
      message:
        "Réinitialisation du mot de passe. Veuillez vérifier votre courrier électronique pour les instructions.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
//=================================================================================
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() }, // Token should be valid
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Code provisoire invalide ou expiré!",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password, reset token, and expiration
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    res.status(200).json({
      status: true,
      message: "Mot de passe Modifié avec succès!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "An error occurred!" });
  }
};
//Modify the user or team Password using current token and

exports.modifyPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//============================Get all Users (equipes) ==============================
/**********GetAll*************/
exports.getAllTeams = async (req, res, next) => {
  try {
    const allTeams = await User.find({});
    res.status(200).json({ status: true, equipes: allTeams });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Une erreur s'est produite!" });
  }
};
