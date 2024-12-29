
const UserTest = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.UserRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await UserTest.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'L\'utilisateur existe déjà.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new UserTest({
            username,
            password: hashedPassword, // Utilisez le mot de passe haché
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).send({ 
            message: 'Utilisateur créé avec succès.', 
            user: { username: newUser.username } // Évitez de renvoyer le mot de passe
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
};


exports.UserLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe
        const existingUser = await UserTest.findOne({ username });
        if (!existingUser) {
            return res.status(404).send({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifiez si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Mot de passe incorrect.' });
        }

        // Clé secrète fictive pour les tests (ne pas utiliser en production)
        const secretKey = 'cle_secrete_fictive_pour_tests_12345';

        // Créez un jeton JWT
        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username },
            secretKey,
            { expiresIn: '1h' } // Durée de validité du jeton
        );

        // Réponse réussie avec le jeton et les infos utilisateur
        res.status(200).send({
            message: 'Connexion réussie.',
            token,
            user: { id: existingUser._id, username: existingUser.username },
        });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).send({ message: 'Une erreur est survenue lors de la connexion.' });
    }
};