import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();
    const withoutFooterRoutes = ["/instructorPortal"];
    if(withoutFooterRoutes.some((item) => pathname.includes(item))) return null;
    
    return (
        <div class="footer">
            <Link to="/team">
                <div className="team-footer">Meet the team</div>
            </Link>
        </div>
    )
}

export default Footer;