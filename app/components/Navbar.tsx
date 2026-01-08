import {Link} from "react-router";

const Navbar = () => {
    return (
        <>
            <nav className="navbar animate-in fade-in duration-1000">
                <Link to="/">
                    <p className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300">CVision</p>
                </Link>
                <Link to="/upload" className="primary-button w-fit hover:scale-105 transition-transform duration-300">
                    Upload Your Resume
                </Link>
            </nav>
        </>
    );
}
export default Navbar;