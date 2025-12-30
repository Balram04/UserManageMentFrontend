import React, { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0
  });
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers({ 
        page: pagination.currentPage, 
        limit: 10 
      });
      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers]);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleActivate = (user) => {
    setSelectedUser(user);
    setModalAction('activate');
    setShowModal(true);
  };

  const handleDeactivate = (user) => {
    setSelectedUser(user);
    setModalAction('deactivate');
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModalAction('delete');
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {
      if (modalAction === 'activate') {
        await adminAPI.activateUser(selectedUser._id);
        toast.success('User activated successfully');
      } else if (modalAction === 'deactivate') {
        await adminAPI.deactivateUser(selectedUser._id);
        toast.success('User deactivated successfully');
      } else if (modalAction === 'delete') {
        await adminAPI.deleteUser(selectedUser._id);
        toast.success('User deleted successfully');
      }
      
      fetchUsers();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setShowModal(false);
      setSelectedUser(null);
      setModalAction(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p className="stat-number">{stats.activeUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Inactive Users</h3>
              <p className="stat-number">{stats.inactiveUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Admin Users</h3>
              <p className="stat-number">{stats.adminUsers}</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="card">
          <h2 className="mb-20">All Users</h2>
          
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>
                          <span className={`badge badge-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            {user.status === 'inactive' ? (
                              <button 
                                onClick={() => handleActivate(user)}
                                className="btn btn-success btn-sm"
                              >
                                Activate
                              </button>
                            ) : user.role !== 'admin' && (
                              <button 
                                onClick={() => handleDeactivate(user)}
                                className="btn btn-secondary btn-sm"
                              >
                                Deactivate
                              </button>
                            )}
                            {user.role !== 'admin' && (
                              <button 
                                onClick={() => handleDelete(user)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="btn btn-secondary btn-sm"
                  >
                    Previous
                  </button>
                  
                  <span className="page-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="btn btn-secondary btn-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmModal
          title={`Confirm ${modalAction}`}
          message={`Are you sure you want to ${modalAction} ${selectedUser?.fullName}?`}
          onConfirm={confirmAction}
          onCancel={() => {
            setShowModal(false);
            setSelectedUser(null);
            setModalAction(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
