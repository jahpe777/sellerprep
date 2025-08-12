// src/components/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

interface User {
  id: number;
  username: string;
  email: string;
  user_type: string;
  subscription_status: string;
  subscription_tier: string | null;
  properties_exported: number;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isGrantingAdmin, setIsGrantingAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users/');
      setUsers(response.data);
    } catch (err: any) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const grantAdminAccess = async () => {
    if (!newAdminEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    setIsGrantingAdmin(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await api.post('/api/admin/make-admin/', {
        email: newAdminEmail.trim(),
      });

      setSuccessMessage(response.data.message);
      setNewAdminEmail('');
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to grant admin access');
    } finally {
      setIsGrantingAdmin(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'admin': return '#e53e3e';
      case 'agent': return '#3182ce';
      case 'client': return '#38a169';
      default: return '#4a5568';
    }
  };

  if (loading) {
    return (
      <div className="sp-admin-panel">
        <div className="sp-loading">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="sp-admin-panel">
      <div className="sp-admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users and grant administrative privileges</p>
      </div>

      {/* Grant Admin Section */}
      <div className="sp-admin-section">
        <h2>Grant Admin Access</h2>
        <div className="sp-grant-admin-form">
          <div className="sp-form-row">
            <input
              type="email"
              placeholder="Enter user email address"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="sp-admin-input"
            />
            <button
              onClick={grantAdminAccess}
              disabled={isGrantingAdmin || !newAdminEmail.trim()}
              className="sp-btn sp-btn-primary"
            >
              {isGrantingAdmin ? 'Granting...' : 'Grant Admin Access'}
            </button>
          </div>
          
          {error && (
            <div className="sp-admin-error">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="sp-admin-success">
              {successMessage}
            </div>
          )}
        </div>
      </div>

      {/* Users List Section */}
      <div className="sp-admin-section">
        <h2>All Users ({users.length})</h2>
        <div className="sp-users-table-container">
          <table className="sp-users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Type</th>
                <th>Subscription</th>
                <th>Exports</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="sp-username">{user.username}</td>
                  <td className="sp-email">{user.email}</td>
                  <td>
                    <span 
                      className="sp-user-type-badge"
                      style={{ backgroundColor: getUserTypeColor(user.user_type) }}
                    >
                      {user.user_type}
                    </span>
                  </td>
                  <td>
                    {user.subscription_status === 'active' ? (
                      <span className="sp-subscription-active">
                        {user.subscription_tier || 'Active'}
                      </span>
                    ) : (
                      <span className="sp-subscription-none">None</span>
                    )}
                  </td>
                  <td className="sp-exports">{user.properties_exported}</td>
                  <td className="sp-date">{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="sp-admin-section">
        <h2>User Statistics</h2>
        <div className="sp-stats-grid">
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.filter(u => u.user_type === 'admin').length}
            </div>
            <div className="sp-stat-label">Admins</div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.filter(u => u.user_type === 'agent').length}
            </div>
            <div className="sp-stat-label">Agents</div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.filter(u => u.user_type === 'client').length}
            </div>
            <div className="sp-stat-label">Clients</div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.filter(u => u.user_type === 'individual').length}
            </div>
            <div className="sp-stat-label">Individuals</div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.filter(u => u.subscription_status === 'active').length}
            </div>
            <div className="sp-stat-label">Subscribers</div>
          </div>
          <div className="sp-stat-card">
            <div className="sp-stat-number">
              {users.reduce((sum, u) => sum + u.properties_exported, 0)}
            </div>
            <div className="sp-stat-label">Total Exports</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;