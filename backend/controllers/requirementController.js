const Requirement = require('../models/Requirement');

// @desc    Create a new requirement
// @route   POST /api/requirements
exports.createRequirement = async (req, res) => {
  try {
    // Only keep the category-specific details that match the selected category
    const { category } = req.body;
    const cleanedData = { ...req.body };

    if (category !== 'Event Planner') delete cleanedData.plannerDetails;
    if (category !== 'Performer') delete cleanedData.performerDetails;
    if (category !== 'Crew') delete cleanedData.crewDetails;

    const requirement = await Requirement.create(cleanedData);
    res.status(201).json({ success: true, data: requirement });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Create Requirement Error:', error);
    res.status(500).json({ success: false, error: 'Server error while creating requirement' });
  }
};

// @desc    Get all requirements
// @route   GET /api/requirements
exports.getRequirements = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements
    });
  } catch (error) {
    console.error('Get Requirements Error:', error);
    res.status(500).json({ success: false, error: 'Server error while fetching requirements' });
  }
};

// @desc    Get single requirement by ID
// @route   GET /api/requirements/:id
exports.getRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, error: 'Requirement not found' });
    }
    res.status(200).json({ success: true, data: requirement });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Requirement not found' });
    }
    console.error('Get Requirement Error:', error);
    res.status(500).json({ success: false, error: 'Server error while fetching requirement' });
  }
};
