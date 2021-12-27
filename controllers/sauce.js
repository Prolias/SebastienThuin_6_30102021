const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error.message }));
}

exports.getOneSauce = (req, res) => {
    Sauce.findById({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error: error.message }));
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
    .catch(error => res.status(400).json({ error: error.message }))
}

exports.modifySauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if(req.file) {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                console.log('File deleted with success.')
            })
        }
        const sauceObject = req.file ?
            {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body}
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ 'message': 'Sauce modified!' }))
        .catch(error => res.status(400).json({ error: error.message }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({ message: 'Sauce deleted!'}))
            .catch(error => res.status(400).json({ error: error.message }));
        })
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.likeSauce = async (req, res) => {
    try {
        let message = '';
        const sauce = await Sauce.findOne({ _id: req.params.id })
        removeDisLike(sauce, req);
        switch(req.body.like) {
            case 1:
                sauce.likes += 1;
                sauce.usersLiked.push(req.body.userId);
                message = 'Liked!'
            break;
            case -1:
                sauce.dislikes += 1;
                sauce.usersDisliked.push(req.body.userId);
                message = 'Disliked!'
            break;
            case 0:
                message = 'Removed Like/Dislike!'
            break;
            default:
            throw new Error('Invalid body request')
        }
        await sauce.save();
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const removeDisLike = (sauce, req) => {
    const liked = sauce.usersLiked.findIndex(str => str === req.body.userId)
    const disliked = sauce.usersDisliked.findIndex(str => str === req.body.userId)
    const removeL = () => {
        sauce.likes -= 1;
        sauce.usersLiked.splice(liked, 1);
    }
    const removeD = () => {
        sauce.dislikes -= 1;
        sauce.usersDisliked.splice(liked, 1);
    }
    if(liked != -1 && disliked != -1) {
        removeL()
        removeD()
    }
    if(liked != -1 && disliked == -1) removeL()
    if(liked == -1 && disliked != -1)  removeD()
}