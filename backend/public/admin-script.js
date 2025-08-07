// Admin Dashboard JavaScript
let contacts = [];
let currentPage = 1;
let totalPages = 1;
let selectedStatus = 'all';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const contentEl = document.getElementById('content');
const contactsListEl = document.getElementById('contacts-list');
const noContactsEl = document.getElementById('no-contacts');
const paginationEl = document.getElementById('pagination');
const statusFilterEl = document.getElementById('status-filter');
const prevBtnEl = document.getElementById('prev-btn');
const nextBtnEl = document.getElementById('next-btn');
const pageInfoEl = document.getElementById('page-info');

// Stats elements
const newCountEl = document.getElementById('new-count');
const readCountEl = document.getElementById('read-count');
const repliedCountEl = document.getElementById('replied-count');
const totalCountEl = document.getElementById('total-count');
const totalInfoEl = document.getElementById('total-info');
const updateTimeEl = document.getElementById('update-time');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Dashboard loaded');
    loadContacts();
    updateTime();
    
    // Update time every minute
    setInterval(updateTime, 60000);
});

// Load contacts from backend
async function loadContacts(page = 1, status = 'all') {
    try {
        showLoading();
        
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: '10'
        });
        
        if (status !== 'all') {
            queryParams.append('status', status);
        }

        const response = await fetch(`${API_BASE_URL}/contacts?${queryParams}`);
        const result = await response.json();

        if (result.success) {
            contacts = result.data;
            currentPage = result.pagination.current;
            totalPages = result.pagination.total;
            
            displayContacts();
            updatePagination();
            loadStats(); // Load stats after contacts are loaded
            showContent();
        } else {
            showError('Failed to fetch contacts: ' + result.message);
        }
    } catch (err) {
        console.error('Error fetching contacts:', err);
        showError('Error connecting to server. Please check if the backend is running.');
    }
}

// Load contact statistics
async function loadStats() {
    try {
        // Load all contacts to calculate stats
        const response = await fetch(`${API_BASE_URL}/contacts?limit=1000`);
        const result = await response.json();
        
        if (result.success) {
            const allContacts = result.data;
            const stats = {
                new: allContacts.filter(c => c.status === 'new').length,
                read: allContacts.filter(c => c.status === 'read').length,
                replied: allContacts.filter(c => c.status === 'replied').length,
                total: allContacts.length
            };
            
            updateStats(stats);
        }
    } catch (err) {
        console.error('Error loading stats:', err);
    }
}

// Update statistics display
function updateStats(stats) {
    newCountEl.textContent = stats.new;
    readCountEl.textContent = stats.read;
    repliedCountEl.textContent = stats.replied;
    totalCountEl.textContent = stats.total;
    totalInfoEl.textContent = `Total submissions: ${stats.total}`;
}

// Display contacts in the list
function displayContacts() {
    if (contacts.length === 0) {
        contactsListEl.style.display = 'none';
        noContactsEl.style.display = 'block';
        paginationEl.style.display = 'none';
        return;
    }

    contactsListEl.style.display = 'block';
    noContactsEl.style.display = 'none';
    
    contactsListEl.innerHTML = contacts.map(contact => `
        <div class="contact-card ${contact.status}">
            <div class="contact-header">
                <div class="contact-info">
                    <h3>${escapeHtml(contact.name)} (Parent/Guardian)</h3>
                    <p class="child-name">👶 Child: <strong>${escapeHtml(contact.childName || 'N/A')}</strong></p>
                    <p class="class-info">🎓 Class to Join: <strong>${escapeHtml(contact.classToJoin || 'N/A')}</strong></p>
                    <p class="birth-date">📅 Date of Birth: <strong>${contact.dateOfBirth ? new Date(contact.dateOfBirth).toLocaleDateString('en-IN') : 'N/A'}</strong></p>
                    ${contact.email ? `<p class="email">📧 ${escapeHtml(contact.email)}</p>` : ''}
                    ${contact.phone ? `<p class="phone">📞 <a href="tel:${escapeHtml(contact.phone)}" class="phone-link">${escapeHtml(contact.phone)}</a></p>` : ''}
                </div>
                <div class="contact-meta">
                    <span class="status-badge ${contact.status}">
                        ${contact.status.toUpperCase()}
                    </span>
                    <span class="date">${formatDate(contact.submittedAt)}</span>
                </div>
            </div>
            
            <div class="contact-content">
                <div class="message">${escapeHtml(contact.message)}</div>
            </div>
            
            <div class="contact-actions">
                <select 
                    class="status-select" 
                    value="${contact.status}"
                    onchange="updateContactStatus('${contact._id}', this.value)"
                >
                    <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="read" ${contact.status === 'read' ? 'selected' : ''}>Read</option>
                    <option value="replied" ${contact.status === 'replied' ? 'selected' : ''}>Replied</option>
                </select>
                ${contact.email ? `<a 
                    href="mailto:${escapeHtml(contact.email)}?subject=Re: Contact from ${escapeHtml(contact.name)}"
                    class="reply-button"
                    target="_blank"
                    title="Send Email Reply"
                >
                    <i class="fas fa-reply"></i> Reply
                </a>` : ''}
                <button 
                    onclick="deleteContact('${contact._id}', '${escapeHtml(contact.name)}')"
                    class="delete-button"
                    title="Delete this contact submission"
                >
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Update contact status
async function updateContactStatus(contactId, newStatus) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus })
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            showNotification('Status updated successfully!', 'success');
            
            // Refresh the current view
            await loadContacts(currentPage, selectedStatus);
        } else {
            showNotification('Failed to update status: ' + result.message, 'error');
        }
    } catch (err) {
        console.error('Error updating status:', err);
        showNotification('Error updating status. Please try again.', 'error');
    }
}

// Delete contact
async function deleteContact(contactId, contactName) {
    if (!confirm(`Are you sure you want to delete the contact submission from ${contactName}? This action cannot be undone.`)) {
        return;
    }

    try {
        console.log('Attempting to delete contact:', contactId);
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            method: 'DELETE',
        });

        console.log('Delete response status:', response.status);

        if (!response.ok) {
            // Handle different HTTP error statuses
            if (response.status === 404) {
                showNotification('Contact not found. It may have already been deleted.', 'error');
                // Refresh to update the list
                await loadContacts(currentPage, selectedStatus);
                return;
            } else if (response.status === 500) {
                showNotification('Server error occurred while deleting contact.', 'error');
                return;
            }
        }

        const result = await response.json();

        if (result.success) {
            showNotification('Contact submission deleted successfully!', 'success');
            // Refresh the current view
            await loadContacts(currentPage, selectedStatus);
        } else {
            showNotification('Failed to delete contact: ' + result.message, 'error');
        }
    } catch (err) {
        console.error('Error deleting contact:', err);
        showNotification('Error deleting contact. Please check your connection and try again.', 'error');
    }
}

// Handle status filter change
function handleStatusChange(status) {
    selectedStatus = status;
    currentPage = 1; // Reset to first page
    statusFilterEl.value = status;
    loadContacts(currentPage, selectedStatus);
}

// Handle pagination
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        loadContacts(currentPage, selectedStatus);
    }
}

// Update pagination controls
function updatePagination() {
    if (totalPages <= 1) {
        paginationEl.style.display = 'none';
        return;
    }
    
    paginationEl.style.display = 'flex';
    pageInfoEl.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevBtnEl.disabled = currentPage === 1;
    nextBtnEl.disabled = currentPage === totalPages;
}

// Refresh contacts
function refreshContacts() {
    loadContacts(currentPage, selectedStatus);
}

// Show loading state
function showLoading() {
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    contentEl.style.display = 'none';
}

// Show error state
function showError(message) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    contentEl.style.display = 'none';
    document.getElementById('error-message').textContent = message;
}

// Show main content
function showContent() {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    contentEl.style.display = 'block';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update current time
function updateTime() {
    const now = new Date();
    updateTimeEl.textContent = now.toLocaleTimeString('en-IN');
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem; margin-left: 1rem;">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#667eea'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for global use
window.loadContacts = loadContacts;
window.updateContactStatus = updateContactStatus;
window.deleteContact = deleteContact;
window.handleStatusChange = handleStatusChange;
window.changePage = changePage;
window.refreshContacts = refreshContacts;
