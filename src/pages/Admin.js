import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Fetch contacts from backend
  const fetchContacts = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (status !== 'all') {
        queryParams.append('status', status);
      }

      const response = await fetch(`http://localhost:5000/api/contacts?${queryParams}`);
      const result = await response.json();

      if (result.success) {
        setContacts(result.data);
        setTotalPages(result.pagination.total);
        setCurrentPage(result.pagination.current);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update contact status
  const updateStatus = async (contactId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (result.success) {
        // Refresh the contacts list
        fetchContacts(currentPage, selectedStatus);
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating status');
    }
  };

  // Delete contact
  const deleteContact = async (contactId, contactName) => {
    if (!window.confirm(`Are you sure you want to delete the contact submission from ${contactName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('Contact submission deleted successfully');
        // Refresh the contacts list
        fetchContacts(currentPage, selectedStatus);
      } else {
        alert('Failed to delete contact: ' + result.message);
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Error deleting contact');
    }
  };

  // Load contacts on component mount and when filters change
  useEffect(() => {
    fetchContacts(currentPage, selectedStatus);
  }, [currentPage, selectedStatus]);

  // Handle status filter change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => fetchContacts(currentPage, selectedStatus)}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📧 Contact Submissions</h1>
        <p>Manage and respond to contact form submissions</p>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select 
          id="status-filter"
          value={selectedStatus} 
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All Submissions</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Contacts List */}
      <div className="contacts-list">
        {contacts.length === 0 ? (
          <div className="no-contacts">
            <h3>No contact submissions found</h3>
            <p>No submissions match your current filter.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className={`contact-card ${contact.status}`}>
              <div className="contact-header">
                <div className="contact-info">
                  <h3>{contact.name} (Parent/Guardian)</h3>
                  <p className="child-name">👶 Child: <strong>{contact.childName}</strong></p>
                  <p className="class-info">🎓 Class to Join: <strong>{contact.classToJoin}</strong></p>
                  <p className="birth-date">📅 Date of Birth: <strong>{contact.dateOfBirth ? new Date(contact.dateOfBirth).toLocaleDateString('en-IN') : 'N/A'}</strong></p>
                  {contact.email && <p className="email">📧 {contact.email}</p>}
                  {contact.phone && (
                    <p className="phone">
                      📞 <a href={`tel:${contact.phone}`} className="phone-link">{contact.phone}</a>
                    </p>
                  )}
                </div>
                <div className="contact-meta">
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status.toUpperCase()}
                  </span>
                  <span className="date">{formatDate(contact.submittedAt)}</span>
                </div>
              </div>
              
              <div className="contact-content">
                <p className="message">{contact.message}</p>
              </div>
              
              <div className="contact-actions">
                <select 
                  value={contact.status} 
                  onChange={(e) => updateStatus(contact._id, e.target.value)}
                  className="status-select"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
                {contact.email && (
                  <a 
                    href={`mailto:${contact.email}?subject=Re: Contact from ${contact.name}`}
                    className="reply-button"
                    title="Send Email Reply"
                  >
                    📧 Reply
                  </a>
                )}
                <button 
                  onClick={() => deleteContact(contact._id, contact.name)}
                  className="delete-button"
                  title="Delete this contact submission"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="admin-footer">
        <p>Total submissions: {contacts.length > 0 ? 
          `Showing ${contacts.length} of many` : '0'}</p>
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Admin;
