const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('books').find();
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
      res.status(400).json({ message: 'Must use a valid book id' });
      return;
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('books')
      .find({ _id: bookId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      language: req.body.language
    };
    const response = await mongodb.getDb().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'Book created successfully',
        id: response.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Error occurred while creating book' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid book id' });
      return;
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      language: req.body.language
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(500).json({ message: 'Error occurred while updating book' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid book id' });
      return;
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};