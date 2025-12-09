const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: function() {
      return this.status === "lido";
    }
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["desejado", "lido"],
    default: "desejado"
  },
  desc: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;