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
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ 'message': 'Sauce created!'}))
        .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res) => {

}

exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'Sauce deleted!'}))
        .catch(error => res.status(400).json({ error }));
}

exports.likeSauce = (req, res) => {
    
}