const Book = require('../models/Book');

module.exports = {
    createBook: async (data) => {
        try {
            return await Book.create(data);
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            throw err;
        }
    },
    
    getBookById: async (id) => {
        try {
            return await Book.findById(id, { title: 1, author: 1, cover: 1, desc: 1, link: 1, status: 1, rating: 1, _id: 1 });
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            throw err;
        }
    }   ,

    getBooks: async (status, userId) => {
        try {
            return await Book.find({ status: status, userId: userId }, { title: 1, cover: 1, _id: 1 });
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            throw err;
        }
    },

    editBook: (id, data) => {
        return Book.findByIdAndUpdate(id, data, { new: true });
    },

    deleteBook: (id) => {
        return Book.findByIdAndDelete(id);
    },
}