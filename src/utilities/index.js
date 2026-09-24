const Util = {};

// Build navigation
Util.getNav = async () => {
    return `
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/organizations">Organizations</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/categories">Categories</a></li>
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