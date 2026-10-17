const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  // ─── Step 1: Event Basics ───────────────────────────────────
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [200, 'Event name cannot exceed 200 characters']
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: {
      values: ['Concert', 'Wedding', 'Corporate', 'Festival', 'Private Party', 'Conference', 'Exhibition', 'Sports Event', 'Charity Event', 'Other'],
      message: '{VALUE} is not a valid event type'
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  venue: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Event Planner', 'Performer', 'Crew'],
      message: '{VALUE} is not a valid category'
    }
  },

  // ─── Steps 2 & 3: Event Planner Specific ───────────────────
  plannerDetails: {
    budgetRange: {
      type: String,
      enum: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', ''],
      default: ''
    },
    expectedGuests: {
      type: Number,
      min: [1, 'Must have at least 1 guest'],
      default: null
    },
    servicesNeeded: {
      type: [String],
      default: []
    },
    theme: {
      type: String,
      trim: true,
      default: ''
    },
    cateringPreferences: {
      type: String,
      trim: true,
      default: ''
    },
    decorationType: {
      type: String,
      trim: true,
      default: ''
    },
    timeline: {
      type: String,
      trim: true,
      default: ''
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: ''
    }
  },

  // ─── Steps 2 & 3: Performer Specific ───────────────────────
  performerDetails: {
    performanceType: {
      type: String,
      enum: ['Band', 'DJ', 'Solo Artist', 'Dance Group', 'Comedian', 'Magician', 'MC/Host', 'Orchestra', 'Other', ''],
      default: ''
    },
    genre: {
      type: String,
      trim: true,
      default: ''
    },
    numberOfPerformers: {
      type: Number,
      min: [1, 'Must have at least 1 performer'],
      default: null
    },
    performanceDuration: {
      type: String,
      trim: true,
      default: ''
    },
    equipmentNeeded: {
      type: [String],
      default: []
    },
    stageRequirements: {
      type: String,
      trim: true,
      default: ''
    },
    travelAccommodation: {
      type: Boolean,
      default: false
    },
    specialRequirements: {
      type: String,
      trim: true,
      default: ''
    }
  },

  // ─── Steps 2 & 3: Crew Specific ────────────────────────────
  crewDetails: {
    crewRoles: {
      type: [String],
      default: []
    },
    numberOfCrew: {
      type: Number,
      min: [1, 'Must have at least 1 crew member'],
      default: null
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Intermediate', 'Experienced', 'Expert', ''],
      default: ''
    },
    shiftDuration: {
      type: String,
      trim: true,
      default: ''
    },
    equipmentProvided: {
      type: Boolean,
      default: false
    },
    dressCode: {
      type: String,
      trim: true,
      default: ''
    },
    safetyRequirements: {
      type: String,
      trim: true,
      default: ''
    },
    additionalNotes: {
      type: String,
      trim: true,
      default: ''
    }
  }
}, {
  timestamps: true
});

// Index for faster queries by category
requirementSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Requirement', requirementSchema);
