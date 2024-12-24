
const Admin = require('../models/loginModels');

exports.Login = async (req, res) => {
    const { username, password} = req.body;

    try {
        // Vérifiez si l'email existe déjà
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).send({ message: 'L\'email existe déjà.' });
        }


        // Crée un nouvel admin
        const newAdmin = new Admin({
            username: username,
            password: password,

        });

        // Sauvegarde l'admin dans la base de données
        await newAdmin.save();
        res.status(201).send(newAdmin);
    } catch (error) {
        console.error('Erreur lors de la création de l\'admin:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la création de l\'admin.' });
    }
};
