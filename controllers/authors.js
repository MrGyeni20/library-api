const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid author id' });
      return;
    }
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .find({ _id: authorId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ message: 'Author not found' });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      biography: req.body.biography,
      email: req.body.email,
      website: req.body.website
    };
    const response = await mongodb.getDb().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'Author created successfully',
        id: response.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Error occurred while creating author' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid author id' });
      return;
    }
    const authorId = new ObjectId(req.params.id);
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      biography: req.body.biography,
      email: req.body.email,
      website: req.body.website
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .replaceOne({ _id: authorId }, author);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Author not found' });
    } else {
      res.status(500).json({ message: 'Error occurred while updating author' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid author id' });
      return;
    }
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .deleteOne({ _id: authorId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};