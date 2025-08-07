const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for admin interface
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/srisaiblossoms';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📍 Database: srisaiblossoms');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  console.log('💡 Make sure MongoDB is running on localhost:27017');
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  childName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  classToJoin: {
    type: String,
    required: true,
    enum: ['Pre-KG', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
    trim: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sri Sai Blossoms Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Admin dashboard root redirect
app.get('/admin/', (req, res) => {
  res.redirect('/admin');
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, childName, dateOfBirth, classToJoin, email, phone, message } = req.body;

    // Validation
    if (!name || !childName || !dateOfBirth || !classToJoin || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (parent name, child name, date of birth, class to join, message)'
      });
    }

    // Validate class to join
    const validClasses = ['Pre-KG', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
    if (!validClasses.includes(classToJoin)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid class to join'
      });
    }

    // Validate date of birth
    const dob = new Date(dateOfBirth);
    const today = new Date();
    if (dob >= today) {
      return res.status(400).json({
        success: false,
        message: 'Date of birth must be in the past'
      });
    }

    // Email validation (only if email is provided)
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
    }

    // Create new contact submission
    const newContact = new Contact({
      name,
      childName,
      dateOfBirth: dob,
      classToJoin,
      email: email || '',
      phone: phone || '',
      message
    });

    const savedContact = await newContact.save();

    console.log('📨 New contact form submission:', {
      id: savedContact._id,
      parentName: savedContact.name,
      childName: savedContact.childName,
      classToJoin: savedContact.classToJoin,
      email: savedContact.email,
      timestamp: savedContact.submittedAt
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you shortly.',
      data: {
        id: savedContact._id,
        submittedAt: savedContact.submittedAt
      }
    });

  } catch (error) {
    console.error('❌ Error saving contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get all contact submissions (for admin use)
app.get('/api/contacts', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: contacts.length,
        totalRecords: total
      }
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submissions'
    });
  }
});

// Update contact status (for admin use)
app.patch('/api/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, read, or replied'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status'
    });
  }
});

// Delete contact submission (for admin use)
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Attempting to delete contact with ID:', id);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('❌ Invalid ObjectId format:', id);
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      console.log('❌ Contact not found with ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    console.log('✅ Contact submission deleted successfully:', {
      id: contact._id,
      parentName: contact.name,
      childName: contact.childName,
      email: contact.email,
      deletedAt: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Contact submission deleted successfully',
      data: contact
    });

  } catch (error) {
    console.error('❌ Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact submission'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Sri Sai Blossoms Backend Server is running on port ${PORT}`);
  console.log(` API Base URL: http://localhost:${PORT}/api`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
