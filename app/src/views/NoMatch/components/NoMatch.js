import React from "react";
import { Link } from "react-router-dom";

import "./NoMatch.css";

export default () => (
    <section className="fit layout vertical center-center">
        <h2>404</h2>
        <div>
            <Link to="/" tabIndex="-1">
                <span>/</span>
            </Link>
        </div>
    </section>
);
