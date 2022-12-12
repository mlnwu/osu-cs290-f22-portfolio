import React from 'react';
import { Link } from 'react-router-dom';

function navLinks() {
    return (
        <nav>
            <span>
                <Link className="App-Nav" to="/">Go to Homepage</Link>
                <Link className="App-Nav" to="/add-exercise">Create an Exercise</Link>
            </span>
        </nav>
    );
}

export default navLinks;