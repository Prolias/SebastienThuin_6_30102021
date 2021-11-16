const Sauce = require('../models/Sauce');
const fs = require('fs');

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
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
    .then(() => res.status(201).json({ 'message': 'Sauce created!' }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ 'message': 'Sauce modified!' }))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({ message: 'Sauce deleted!'}))
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }))
}

exports.likeSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id })
        const liked = sauce.usersLiked.findIndex(str => str === req.body.userId)
        const disliked = sauce.usersDisliked.findIndex(str => str === req.body.userId)
        let message = '';
        if(liked != -1){
            sauce.likes -= 1;
            sauce.usersLiked.splice(liked, 1);
        }
        else if(disliked != -1) {
            sauce.dislikes -= 1;
            sauce.usersDisliked.splice(liked, 1);
        }
        if(req.body.like == 1){
            sauce.likes += 1;
            sauce.usersLiked.push(req.body.userId);
            message = 'Liked!'
        }
        else if(req.body.like == -1) {
            sauce.dislikes += 1;
            sauce.usersDisliked.push(req.body.userId);
            message = 'Disliked!'
            console.log(sauce.usersDisliked);
        }
        await sauce.save();
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}