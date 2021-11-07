const Sauce = require('../models/Sauce');

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res) => {
    Sauce.findById({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res) => {
    
}

exports.modifySauce = (req, res) => {

}

exports.deleteSauce = (req, res) => {

}

exports.likeSauce = (req, res) => {
    
}