const Util = {};

// Build navigation
Util.getNav = async (isLoggedIn = false) => {
    return `
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/organizations">Organizations</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/categories">Categories</a></li>
            ${isLoggedIn
            ? `<li><a href="/logout">Logout</a></li>`
            : `
                        <li><a href="/register">Register</a></li>
                        <li><a href="/login">Login</a></li>
                    `
        }
        </ul>
    `;
};

// Build an Error object with a status code
Util.handleErrors = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

export default Util;