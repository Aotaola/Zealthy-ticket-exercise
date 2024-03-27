import React from "react";
import { useAuth } from '../authFile/AuthContext'; 

const Footer = () => {
    const { isAdmin } = useAuth();
    return (
        <footer className={`footer ${isAdmin ? 'admin-footer' : ''}`}>
            <div className={`footer-content ${isAdmin ? 'admin-footer-content' : ''}`}>
                Zealthy Footer
            </div>
        </footer>
    )
}

export default Footer