import { useState } from 'react';
import './EnrollMember.css';

const initialForm = {
  fullName: '',
  idNumber: '',
  phone: '',
  email: '',
  address: '',
  joinDate: '',
  role: 'member',
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim())  errors.fullName  = 'Full name is required.';
  if (!form.idNumber.trim())  errors.idNumber  = 'ID number is required.';
  if (!form.phone.trim())     errors.phone     = 'Phone number is required.';
  if (!form.email.includes('@')) errors.email  = 'Valid email is required.';
  if (!form.joinDate)         errors.joinDate  = 'Join date is required.';
  return errors;
}

// Demo: list of already enrolled members
const seedMembers = [
  { id: 1, fullName: 'Keabetswe Moalosi',  role: 'signatory', joinDate: '2025-01-01', status: 'Active' },
  { id: 2, fullName: 'Mpho Setlhare',      role: 'signatory', joinDate: '2025-01-01', status: 'Active' },
  { id: 3, fullName: 'Boitumelo Kgosidintsi', role: 'member', joinDate: '2025-01-01', status: 'Active' },
];

export default function EnrollMember() {
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [members, setMembers] = useState(seedMembers);
  const [toast, setToast]     = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const newMember = {
      id: members.length + 1,
      fullName: form.fullName,
      role: form.role,
      joinDate: form.joinDate,
      status: 'Active',
    };

    setMembers(prev => [...prev, newMember]);
    setForm(initialForm);
    showToast(`${newMember.fullName} enrolled successfully!`);
  };

  const roleBadgeClass = (role) =>
    role === 'signatory' ? 'badge badge--signatory' : 'badge badge--member';

  return (
    <div className="page enroll-page">
      <div className="container enroll-container">

        {/* Toast */}
        {toast && <div className="toast" role="alert">{toast}</div>}

        {/* Header */}
        <div className="enroll-header">
          <h1>Enroll a Member</h1>
          <p>Add a new person to your motshelo group. All members must contribute P1,000 monthly.</p>
        </div>

        <div className="enroll-layout">

          {/* Form */}
          <div className="enroll-form-wrap">
            <form className="enroll-form" onSubmit={handleSubmit} noValidate>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName" name="fullName" type="text"
                  placeholder="e.g. Kelebogile Moeng"
                  value={form.fullName} onChange={handleChange}
                  className={errors.fullName ? 'invalid' : ''}
                />
                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="idNumber">Omang / ID Number *</label>
                  <input
                    id="idNumber" name="idNumber" type="text"
                    placeholder="National ID number"
                    value={form.idNumber} onChange={handleChange}
                    className={errors.idNumber ? 'invalid' : ''}
                  />
                  {errors.idNumber && <span className="error-msg">{errors.idNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="+267 7X XXX XXX"
                    value={form.phone} onChange={handleChange}
                    className={errors.phone ? 'invalid' : ''}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="member@email.com"
                  value={form.email} onChange={handleChange}
                  className={errors.email ? 'invalid' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Residential Address</label>
                <input
                  id="address" name="address" type="text"
                  placeholder="Plot no., village/town"
                  value={form.address} onChange={handleChange}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="joinDate">Join Date *</label>
                  <input
                    id="joinDate" name="joinDate" type="date"
                    value={form.joinDate} onChange={handleChange}
                    className={errors.joinDate ? 'invalid' : ''}
                  />
                  {errors.joinDate && <span className="error-msg">{errors.joinDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role" value={form.role} onChange={handleChange}>
                    <option value="member">Member</option>
                    <option value="signatory">Signatory</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary enroll-submit">
                Enroll Member →
              </button>
            </form>
          </div>

          {/* Members list */}
          <div className="members-panel">
            <div className="members-panel__header">
              <h2>Group Members</h2>
              <span className="members-count">{members.length} enrolled</span>
            </div>

            <ul className="members-list">
              {members.map(m => (
                <li key={m.id} className="member-item">
                  <div className="member-avatar">
                    {m.fullName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="member-info">
                    <span className="member-name">{m.fullName}</span>
                    <span className="member-date">Joined {m.joinDate}</span>
                  </div>
                  <span className={roleBadgeClass(m.role)}>{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}