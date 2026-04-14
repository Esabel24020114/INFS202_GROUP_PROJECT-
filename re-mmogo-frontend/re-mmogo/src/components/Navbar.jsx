import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        {/* Logo */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="logo-mark">RM</span>
          <span className="logo-text">Re-Mmogo</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar__links">
          <NavLink to="/"              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/register"      className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Register Group</NavLink>
          <NavLink to="/enroll-member" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Enroll Member</NavLink>
          <NavLink to="/dashboard"     className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
        </nav>

        {/* CTA */}
        <button className="btn btn-primary navbar__cta" onClick={() => { navigate('/register'); closeMenu(); }}>
          Get Started
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="mobile-menu">
          <NavLink to="/"              onClick={closeMenu} className="mobile-link" end>Home</NavLink>
          <NavLink to="/register"      onClick={closeMenu} className="mobile-link">Register Group</NavLink>
          <NavLink to="/enroll-member" onClick={closeMenu} className="mobile-link">Enroll Member</NavLink>
          <NavLink to="/dashboard"     onClick={closeMenu} className="mobile-link">Dashboard</NavLink>
          <button className="btn btn-primary" style={{marginTop:'8px'}} onClick={() => { navigate('/register'); closeMenu(); }}>
            Get Started
          </button>
        </nav>
      )}
    </header>
  );
}