import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div class="footer">
            <Link to="/team">
                <div className="team-footer">Meet the team</div>
            </Link>
        </div>
    )
}

export default Footer;