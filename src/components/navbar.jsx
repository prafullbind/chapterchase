import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light font-weight-bold">
            <Link to="/home" className="navbar-brand"><span className="font-weight-bold"><i class="fas fa-book-open"></i></span></Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/books?q=Harry Potter">Harry Potter</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books?q=Agatha Christie">Agatha Christie</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books?q=Premchand">Premchand</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books?q=Jane Austen">Jane Austen</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addedBooks/0">My Book</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Settings">Settings</Link>
                    </li>
                </ul>
        </nav>
        )
    }
}
export default  Navbar;