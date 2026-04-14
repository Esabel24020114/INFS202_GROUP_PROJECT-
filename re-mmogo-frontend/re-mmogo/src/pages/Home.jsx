import { useNavigate } from 'react-router-dom';
import './Home.css';
import myLogo from './assets/logo.jpeg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-app">

      {/* ── Top Header Bar ─────────────────────────── */}
      <header className="app-header">
        <div className="app-header__logo">
          <img src={myLogo} alt="My logo" />
          <span className="app-header__icon"></span>
          <span className="app-header__name">ReMmogo</span>
        </div>
        <button className="app-header__bell" aria-label="Notifications">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
      </header>

      {/* ── Scrollable Body ─────────────────────────── */}
      <main className="app-body">

        {/* Greeting */}
        <div className="greeting">
          <h1 className="greeting__title">Welcome back</h1>
          <p className="greeting__sub"></p>
        </div>

        {/* Balance Card */}
        <div className="balance-card">
          <p className="balance-card__label">Your Balance</p>
          <p className="balance-card__amount">P12,000.00</p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigate('/enroll-member')}>
            <span className="action-btn__icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </span>
            <span className="action-btn__label">Deposit</span>
          </button>

          <button className="action-btn" onClick={() => navigate('/dashboard')}>
            <span className="action-btn__icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </span>
            <span className="action-btn__label">Withdraw</span>
          </button>

          <button className="action-btn" onClick={() => navigate('/dashboard')}>
            <span className="action-btn__icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </span>
            <span className="action-btn__label">Send Money</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="recent-section">
          <h2 className="recent-section__title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--green">↓</div>
              <div className="activity-item__info">
                <span className="activity-item__name">Monthly Contribution</span>
                <span className="activity-item__date">Dec 1, 2025</span>
              </div>
              <span className="activity-item__amount activity-item__amount--green">+P1,000</span>
            </div>
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--gold">↗</div>
              <div className="activity-item__info">
                <span className="activity-item__name">Loan Disbursed</span>
                <span className="activity-item__date">Nov 28, 2025</span>
              </div>
              <span className="activity-item__amount activity-item__amount--gold">-P5,000</span>
            </div>
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--green">↓</div>
              <div className="activity-item__info">
                <span className="activity-item__name">Loan Repayment</span>
                <span className="activity-item__date">Nov 25, 2025</span>
              </div>
              <span className="activity-item__amount activity-item__amount--green">+P2,000</span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom Navigation ───────────────────────── */}
      <nav className="bottom-nav">
        <button className="bottom-nav__item bottom-nav__item--active" onClick={() => navigate('/')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span>Home</span>
        </button>
        <button className="bottom-nav__item" onClick={() => navigate('/dashboard')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>Savings</span>
        </button>
        <button className="bottom-nav__item" onClick={() => navigate('/dashboard')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          <span>Payments</span>
        </button>
        <button className="bottom-nav__item" onClick={() => navigate('/register')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Account</span>
        </button>
      </nav>
    </div>
  );
}