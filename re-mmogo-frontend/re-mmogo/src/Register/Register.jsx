import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const initialForm = {
  groupName: '',
  description: '',
  startDate: '',
  signatory1Name: '',
  signatory1Phone: '',
  signatory1Email: '',
  signatory2Name: '',
  signatory2Phone: '',
  signatory2Email: '',
  adminUsername: '',
  adminPassword: '',
  confirmPassword: '',
};

function validate(form) {
  const errors = {};
  if (!form.groupName.trim())          errors.groupName = 'Group name is required.';
  if (!form.startDate)                 errors.startDate = 'Start date is required.';
  if (!form.signatory1Name.trim())     errors.signatory1Name = 'Name is required.';
  if (!form.signatory1Phone.trim())    errors.signatory1Phone = 'Phone is required.';
  if (!form.signatory1Email.includes('@')) errors.signatory1Email = 'Valid email required.';
  if (!form.signatory2Name.trim())     errors.signatory2Name = 'Name is required.';
  if (!form.signatory2Phone.trim())    errors.signatory2Phone = 'Phone is required.';
  if (!form.signatory2Email.includes('@')) errors.signatory2Email = 'Valid email required.';
  if (!form.adminUsername.trim())      errors.adminUsername = 'Username is required.';
  if (form.adminPassword.length < 6)  errors.adminPassword = 'Password must be at least 6 characters.';
  if (form.confirmPassword !== form.adminPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export default function Register() {
  const [form, setForm]         = useState(initialForm);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page register-page">
        <div className="container register-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Group Registered!</h2>
            <p>
              <strong>{form.groupName}</strong> has been successfully registered.
              Your signatories and admin account are ready.
            </p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => navigate('/enroll-member')}>
                Enroll Members →
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page register-page">
      <div className="container register-container">

        {/* Page header */}
        <div className="register-header">
          <h1>Register Your Group</h1>
          <p>Fill in the details below to set up your motshelo group on Re-Mmogo.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>

          {/* ── Section 1: Group Info ──────────────── */}
          <div className="form-section">
            <h2 className="form-section__title">
              <span className="section-num">1</span> Group Information
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="groupName">Group Name *</label>
                <input
                  id="groupName" name="groupName" type="text"
                  placeholder="e.g. Tshwaraganang Savings Group"
                  value={form.groupName} onChange={handleChange}
                  className={errors.groupName ? 'invalid' : ''}
                />
                {errors.groupName && <span className="error-msg">{errors.groupName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  id="startDate" name="startDate" type="date"
                  value={form.startDate} onChange={handleChange}
                  className={errors.startDate ? 'invalid' : ''}
                />
                {errors.startDate && <span className="error-msg">{errors.startDate}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Group Description (optional)</label>
              <textarea
                id="description" name="description" rows={3}
                placeholder="Brief description of your group's goals..."
                value={form.description} onChange={handleChange}
              />
            </div>

            <div className="rules-box">
              <h4>📋 Standard Group Rules (applied automatically)</h4>
              <ul>
                <li>Monthly contribution: <strong>P1,000 per member</strong></li>
                <li>Loan interest: <strong>20% on balance per month</strong></li>
                <li>Interest target per member: <strong>P5,000 / year</strong></li>
                <li>Loans require approval from <strong>both signatories</strong></li>
                <li>Only members may borrow from the group</li>
              </ul>
            </div>
          </div>

          {/* ── Section 2: Signatories ─────────────── */}
          <div className="form-section">
            <h2 className="form-section__title">
              <span className="section-num">2</span> Signatories
            </h2>
            <p className="form-section__desc">Two signatories are required to approve loans and payments.</p>

            <div className="signatories-grid">
              {/* Signatory 1 */}
              <div className="signatory-card">
                <div className="signatory-card__label">Signatory 1</div>

                <div className="form-group">
                  <label htmlFor="signatory1Name">Full Name *</label>
                  <input
                    id="signatory1Name" name="signatory1Name" type="text"
                    placeholder="Full name"
                    value={form.signatory1Name} onChange={handleChange}
                    className={errors.signatory1Name ? 'invalid' : ''}
                  />
                  {errors.signatory1Name && <span className="error-msg">{errors.signatory1Name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signatory1Phone">Phone Number *</label>
                  <input
                    id="signatory1Phone" name="signatory1Phone" type="tel"
                    placeholder="+267 7X XXX XXX"
                    value={form.signatory1Phone} onChange={handleChange}
                    className={errors.signatory1Phone ? 'invalid' : ''}
                  />
                  {errors.signatory1Phone && <span className="error-msg">{errors.signatory1Phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signatory1Email">Email *</label>
                  <input
                    id="signatory1Email" name="signatory1Email" type="email"
                    placeholder="email@example.com"
                    value={form.signatory1Email} onChange={handleChange}
                    className={errors.signatory1Email ? 'invalid' : ''}
                  />
                  {errors.signatory1Email && <span className="error-msg">{errors.signatory1Email}</span>}
                </div>
              </div>

              {/* Signatory 2 */}
              <div className="signatory-card">
                <div className="signatory-card__label">Signatory 2</div>

                <div className="form-group">
                  <label htmlFor="signatory2Name">Full Name *</label>
                  <input
                    id="signatory2Name" name="signatory2Name" type="text"
                    placeholder="Full name"
                    value={form.signatory2Name} onChange={handleChange}
                    className={errors.signatory2Name ? 'invalid' : ''}
                  />
                  {errors.signatory2Name && <span className="error-msg">{errors.signatory2Name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signatory2Phone">Phone Number *</label>
                  <input
                    id="signatory2Phone" name="signatory2Phone" type="tel"
                    placeholder="+267 7X XXX XXX"
                    value={form.signatory2Phone} onChange={handleChange}
                    className={errors.signatory2Phone ? 'invalid' : ''}
                  />
                  {errors.signatory2Phone && <span className="error-msg">{errors.signatory2Phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="signatory2Email">Email *</label>
                  <input
                    id="signatory2Email" name="signatory2Email" type="email"
                    placeholder="email@example.com"
                    value={form.signatory2Email} onChange={handleChange}
                    className={errors.signatory2Email ? 'invalid' : ''}
                  />
                  {errors.signatory2Email && <span className="error-msg">{errors.signatory2Email}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 3: Admin Account ───────────── */}
          <div className="form-section">
            <h2 className="form-section__title">
              <span className="section-num">3</span> Admin Account
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adminUsername">Username *</label>
                <input
                  id="adminUsername" name="adminUsername" type="text"
                  placeholder="Choose a username"
                  value={form.adminUsername} onChange={handleChange}
                  className={errors.adminUsername ? 'invalid' : ''}
                />
                {errors.adminUsername && <span className="error-msg">{errors.adminUsername}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adminPassword">Password *</label>
                <input
                  id="adminPassword" name="adminPassword" type="password"
                  placeholder="Min 6 characters"
                  value={form.adminPassword} onChange={handleChange}
                  className={errors.adminPassword ? 'invalid' : ''}
                />
                {errors.adminPassword && <span className="error-msg">{errors.adminPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword" name="confirmPassword" type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword} onChange={handleChange}
                  className={errors.confirmPassword ? 'invalid' : ''}
                />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          <div className="register-form__footer">
            <button type="submit" className="btn btn-primary register-submit">
              Register Group →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}