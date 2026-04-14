 import { useState } from 'react';
import './Dashboard.css';

const members = [
  { id: 1, name: 'Keabetswe Moalosi',     contributions: 12, totalPaid: 12000, loanBalance: 0,    interest: 5200, status: 'Good' },
  { id: 2, name: 'Mpho Setlhare',         contributions: 12, totalPaid: 12000, loanBalance: 3000, interest: 4800, status: 'Good' },
  { id: 3, name: 'Boitumelo Kgosidintsi', contributions: 11, totalPaid: 11000, loanBalance: 0,    interest: 5000, status: 'Good' },
  { id: 4, name: 'Lesego Tau',            contributions: 10, totalPaid: 10000, loanBalance: 6000, interest: 3200, status: 'Behind' },
  { id: 5, name: 'Onalenna Phiri',        contributions: 12, totalPaid: 12000, loanBalance: 0,    interest: 5100, status: 'Good' },
];

const recentActivity = [
  { id: 1, member: 'Mpho Setlhare',         type: 'Contribution',  amount: 1000, date: '2025-12-01', status: 'Approved' },
  { id: 2, member: 'Lesego Tau',             type: 'Loan Request',  amount: 5000, date: '2025-11-28', status: 'Pending'  },
  { id: 3, member: 'Boitumelo Kgosidintsi', type: 'Loan Repayment', amount: 2000, date: '2025-11-25', status: 'Approved' },
  { id: 4, member: 'Onalenna Phiri',         type: 'Contribution',  amount: 1000, date: '2025-11-01', status: 'Approved' },
  { id: 5, member: 'Keabetswe Moalosi',      type: 'Contribution',  amount: 1000, date: '2025-11-01', status: 'Approved' },
];

const totalFund     = members.reduce((s, m) => s + m.totalPaid - m.loanBalance, 0);
const totalLoans    = members.reduce((s, m) => s + m.loanBalance, 0);
const totalInterest = members.reduce((s, m) => s + m.interest, 0);
const behindCount   = members.filter(m => m.status === 'Behind').length;

const statCards = [
  { label: 'Total Fund Balance', value: `P${totalFund.toLocaleString()}`,     icon: '💰', gold: false },
  { label: 'Outstanding Loans',  value: `P${totalLoans.toLocaleString()}`,    icon: '📤', gold: false },
  { label: 'Interest Earned',    value: `P${totalInterest.toLocaleString()}`, icon: '📈', gold: true  },
  { label: 'Members Behind',     value: behindCount,                          icon: '⚠️', gold: false },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const statusClass = s =>
    s === 'Approved' ? 'pill pill--approved'
    : s === 'Pending' ? 'pill pill--pending'
    : 'pill pill--rejected';

  const memberStatusClass = s =>
    s === 'Good' ? 'pill pill--approved' : 'pill pill--pending';

  return (
    <div className="page dashboard-page">
      <div className="container dashboard-container">

        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-sub">Tshwaraganang Savings Group · Year 2025</p>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-outline btn-sm">📊 Export Report</button>
            <button className="btn btn-primary btn-sm">+ Record Payment</button>
          </div>
        </div>

        <div className="stat-cards">
          {statCards.map(c => (
            <div key={c.label} className={`stat-card ${c.gold ? 'stat-card--gold' : ''}`}>
              <div className="stat-card__icon">{c.icon}</div>
              <div className="stat-card__body">
                <span className="stat-card__value">{c.value}</span>
                <span className="stat-card__label">{c.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-tabs">
          {['overview', 'members', 'activity'].map(t => (
            <button
              key={t}
              className={`dash-tab ${activeTab === t ? 'dash-tab--active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'overview' ? '📋 Overview'
               : t === 'members' ? '👥 Members'
               : '🕒 Recent Activity'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="panel">
            <p className="panel-title">Interest Progress — Target: P5,000 per member</p>
            <div className="progress-list">
              {members.map(m => {
                const pct = Math.min((m.interest / 5000) * 100, 100);
                return (
                  <div key={m.id} className="progress-item">
                    <div className="progress-item__top">
                      <span className="progress-name">{m.name}</span>
                      <span className="progress-val">P{m.interest.toLocaleString()} / P5,000</span>
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className={`progress-bar-fill ${pct >= 100 ? 'progress-bar-fill--done' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="panel">
            <p className="panel-title">All Members</p>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Contributions</th>
                    <th>Total Paid</th><th>Loan Balance</th>
                    <th>Interest</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.id}>
                      <td className="td-name">{m.name}</td>
                      <td>{m.contributions} / 12</td>
                      <td>P{m.totalPaid.toLocaleString()}</td>
                      <td className={m.loanBalance > 0 ? 'td-warn' : ''}>
                        {m.loanBalance > 0 ? `P${m.loanBalance.toLocaleString()}` : '—'}
                      </td>
                      <td>P{m.interest.toLocaleString()}</td>
                      <td><span className={memberStatusClass(m.status)}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="panel">
            <p className="panel-title">Recent Activity</p>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Member</th><th>Type</th>
                    <th>Amount</th><th>Date</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map(a => (
                    <tr key={a.id}>
                      <td className="td-name">{a.member}</td>
                      <td>{a.type}</td>
                      <td>P{a.amount.toLocaleString()}</td>
                      <td>{a.date}</td>
                      <td><span className={statusClass(a.status)}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}