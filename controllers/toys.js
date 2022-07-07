import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

import toysdb from '../models/toys.js';

export const getToys = async (req, res) => {
    try {
        const toydb = await toysdb.find();
        res.status(200).json(toydb);
    } catch (error) {

        res.status(404).json({ message: error });
    }
}

export const addToy = async (req, res) => {
    try {
        const toy = req.body;
        const newtoydb = new toysdb({ ...toy, listedAt: new Date().toISOString() });
        await newtoydb.save();
        res.status(201).json(newtoydb);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const getDetails = async (req, res) => {
    const { sq } = req.query;
    try {
        const toyName = new RegExp(sq, "i");

        const details = await toysdb.find({ toyName });

        res.json({ data: details });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const { toyName, toyDescription, sellerName, toyPrice, toyImg } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No toy with id: ${id}`);

        const updatedtoy = { sellerName, toyName, toyDescription, toyPrice, toyImg, _id: id };
        await toysdb.findByIdAndUpdate(id, updatedtoy);
        res.status(200).json(updatedtoy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteToy = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No toy with id: ${id}`);

        await toysdb.findByIdAndRemove(id);
        res.status(200).json({ message: 'toy information deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default router;