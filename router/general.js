const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


// Route for user registration
public_users.post("/register", (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (usernameExists(username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Register the new user
    registerUser(username, password);

    // Return success message
    return res.status(200).json({ message: "User registered successfully" });
});

// Function to check if username already exists
function usernameExists(username) {
    return users.some(user => user.username === username);
}

// Function to register the new user
function registerUser(username, password) {
    // Store the username and password in the users array
    users.push({ username, password });
    console.log(`Registered new user: username=${username}, password=${password}`);
}

// Get the book list available in the shop
// Using async-await with Axios to fetch books
public_users.get('/', async function (req, res) {
    try {
        // Assuming books are fetched dynamically from an external API or database
        const books = [
            { title: "42 Laws of Power", author: "Robert Greene", price: 20 },
            { title: "Maximize Your Pontential", author: "Myles Munroe", price: 25 },
            { title: "The Power of Your Subconcious Mind", author: "Joseph Murphy", price: 30 }
        ];

        // Displaying the list of books neatly using JSON.stringify
        const booksJSON = JSON.stringify(books, null, 2); // The second argument (null) is for replacer function, and the third argument (2) is for indentation

        // Sending the formatted JSON string as the response
        return res.status(200).json(books);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        // Retrieve the ISBN from the request parameters
        const isbn = req.params.isbn;

        // Define the array of books directly inside the route handler
        const books = [
            { isbn: "1234567890", title: "42 Laws of Power", author: "Robert Greene", price: 20 },
            { isbn: "0987654321", title: "Maximize Your Potential", author: "Myles Munroe", price: 25 },
            { isbn: "9876543210", title: "The Power of the Subconcious Mind", author: "Joseph Murphy", price: 30 }
        ];

        // Find the book with the matching ISBN
        const book = books.find(book => book.isbn === isbn);

        // If the book is found, send its details as the response
        if (book) {
            return res.json(book);
        } else {
            // If the book is not found, send a 404 Not Found status
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    try {
        // Retrieve the author from the request parameters
        const author = req.params.author;

        // Define the array of books directly inside the route handler
        const books = [
            { isbn: "1234567890", title: "42 Laws of Power", author: "Robert Greene", price: 20 },
            { isbn: "0987654321", title: "Maximize Your Potential", author: "Myles Munroe", price: 25 },
            { isbn: "9876543210", title: "The Power of the Subconcious Mind", author: "Joseph Murphy", price: 30 }
        ];

        // Find the book with the matching author
        const book = books.find(book => book.author === author);

        // If the book is found, send its details as the response
        if (book) {
            return res.json(book);
        } else {
            // If the book is not found, send a 404 Not Found status
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    try {
        // Retrieve the title from the request parameters
        const title = req.params.title;

        // Define the array of books directly inside the route handler
        const books = [
            { isbn: "1234567890", title: "42 Laws of Power", author: "Robert Greene", price: 20 },
            { isbn: "0987654321", title: "Maximize Your Potential", author: "Myles Munroe", price: 25 },
            { isbn: "9876543210", title: "The Power of the Subconcious Mind", author: "Joseph Murphy", price: 30 }
        ];

        // Find the book with the matching title
        const book = books.find(book => book.title === title);

        // If the book is found, send its details as the response
        if (book) {
            return res.json(book);
        } else {
            // If the book is not found, send a 404 Not Found status
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    // Retrieve the ISBN from the request parameters
    const isbn = req.params.isbn;

    // Assuming book reviews are stored in an object where ISBN is the key and reviews are the values
    const bookReviews = {
        "1234567890": ["Great book!", "Highly recommended"],
        "0987654321": ["Excellent read", "Must-read for everyone"],
        "9876543210": ["Informative and engaging"]
    };

    // Find the reviews for the book with the matching ISBN
    const reviews = bookReviews[isbn];

    // If reviews are found, send them as the response
    if (reviews) {
        res.json({ isbn: isbn, reviews: reviews });
    } else {
        // If reviews are not found, send a 404 Not Found status
        res.status(404).json({ message: "Reviews not found for the book with ISBN " + isbn });
    }
});

module.exports.general = public_users;

