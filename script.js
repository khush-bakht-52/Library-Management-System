let registeredUsers = [
    { email: 'khushistudent@gmail.com', role: 'student' },
    { email: 'khushiteacher@gmail.com', role: 'teacher' }
];

const adminCredentials = { email: 'khushiadmin@gmail.com', password: 'admin123' };

let books = [
    { title: 'Harry Potter', pages: 500, publisher: 'Khushi', author: 'Sobia', edition: '2nd' },
    { title: 'Namal', pages: 1000, publisher: 'Khushi', author: 'Nemrah', edition: '3rd' }
];

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === adminCredentials.email && password === adminCredentials.password) {
        alert('Admin logged in successfully');
        document.getElementById('login-signup-container').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        displayUsers();
        displayBooks('admin');
    } else {
        const user = registeredUsers.find(u => u.email === email);
        if (user) {
            alert(`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`);
            document.getElementById('login-signup-container').classList.add('hidden');
            document.getElementById('teacher-student-panel').classList.remove('hidden');
            displayBooks('student');
        } else {
            alert('Invalid credentials');
        }
    }
}

function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (email.includes('admin')) {
        alert('Signup as admin is not allowed.');
        return;
    }

    let role = email.includes('teacher') ? 'teacher' : 'student';
    registeredUsers.push({ email: email, role: role });
    alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
}

function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; 
    registeredUsers.forEach((user, index) => {
        userList.innerHTML += `
            <div class="user-item">
                <span>${user.role.toUpperCase()}: ${user.email}</span>
                <button onclick="removeUser(${index})">Remove</button>
            </div>
        `;
    });
}

function removeUser(index) {
    registeredUsers.splice(index, 1);
    displayUsers();
    alert('User removed successfully');
}

function addBook() {
    const title = document.getElementById('book-title').value;
    const pages = document.getElementById('book-pages').value;
    const publisher = document.getElementById('book-publisher').value;
    const author = document.getElementById('book-author').value;
    const edition = document.getElementById('book-edition').value;

    const newBook = { title, pages, publisher, author, edition };
    books.push(newBook);

    displayBooks('admin');
    alert('Book added successfully');
}

function displayBooks(panel) {
    let booksList = document.getElementById(panel === 'admin' ? 'books' : 'books-student');
    booksList.innerHTML = ''; 
    books.forEach((book, index) => {
        booksList.innerHTML += `
            <div class="book-item">
                <div class="book-details">
                    <div class="book-title">${book.title}</div>
                    <div class="book-meta">Pages: ${book.pages} | Publisher: ${book.publisher} | Author: ${book.author} | Edition: ${book.edition}</div>
                </div>
                ${panel === 'admin' ? `
                <div>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="removeBook(${index})">Remove</button>
                </div>` : ''}
            </div>
        `;
    });
}

function removeBook(index) {
    books.splice(index, 1);
    displayBooks('admin');
    alert('Book removed successfully');
}

function editBook(index) {
    const book = books[index];
    document.getElementById('book-title').value = book.title;
    document.getElementById('book-pages').value = book.pages;
    document.getElementById('book-publisher').value = book.publisher;
    document.getElementById('book-author').value = book.author;
    document.getElementById('book-edition').value = book.edition;

    // Add functionality to update the book
    document.getElementById('add-book-form').onsubmit = function (e) {
        e.preventDefault();
        books[index] = {
            title: document.getElementById('book-title').value,
            pages: document.getElementById('book-pages').value,
            publisher: document.getElementById('book-publisher').value,
            author: document.getElementById('book-author').value,
            edition: document.getElementById('book-edition').value
        };
        displayBooks('admin');
        alert('Book updated successfully');
        // Reset the form to default behavior
        document.getElementById('add-book-form').onsubmit = addBook;
        document.getElementById('add-book-form').reset();
    };
}

function requestBook() {
    const requestedBookTitle = document.getElementById('requested-book-title').value;
    alert(`Your request for "${requestedBookTitle}" has been submitted.`);
}

function goBack() {
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('teacher-student-panel').classList.add('hidden');
    document.getElementById('login-signup-container').classList.remove('hidden');
}
