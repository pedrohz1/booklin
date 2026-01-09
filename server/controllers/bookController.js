const bookService = require('../services/bookServices');

exports.getReadlist = async (req, res) => {
    try {
        if (req.session.username === undefined) {
            res.redirect("/users/login");
            return;
        } 

        const userId = req.session.userId;
        const books = await bookService.getBooks("desejado", userId);
        res.render("readlist", { books: books });
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.getReads = async (req, res) => {
    try {
        if (req.session.username === undefined) {
            res.redirect("/users/login");
            return;
        } 

        const userId = req.session.userId;
        const books = await bookService.getBooks("lido", userId);
        res.render("reads", { books: books });
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.getAddPage = async (req, res) => {
    try {
        if (req.session.username === undefined) {
            res.redirect("/users/login");
            return;
        } 
        
        res.render("add", { username: req.session.username });
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.addBook = async (req, res) => {
    try {
        const userId = req.session.userId;
        req.body.userId = userId;
        const book = await bookService.createBook(req.body);

        if (book.status === "desejado") {
            const books = await bookService.getBooks("desejado", userId);
            res.redirect("readlist"), { books: books };
            return;
        }

        res.redirect("reads");
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.getEditPage = async (req, res) => {
    try {
        if (req.session.username === undefined) {
            res.redirect("/users/login");
            return;
        }
        const id = req.params.id;
        const book = await bookService.getBookById(id);
        res.render("edit", { book: book });
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.editBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await bookService.editBook(id, req.body);
        
        if (book.status === "desejado") {
            res.redirect("readlist");
            return;
        }

        res.redirect("reads");
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await bookService.deleteBook(id);

        if (book.status === "desejado") {
            res.redirect("readlist");
            return;
        }

        res.redirect("reads");
    }
    catch (err) {
        res.render("error", { error: `Erro ${err.status} - ${err}` });
    }
}