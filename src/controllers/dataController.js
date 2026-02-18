const db = require('../utils/database');
const tracker = require('../utils/requestTracker');

/**
 * Submit data to the system
 */
const submitData = async (req, res, next) => {
  try {
    const { data, userId } = req.validatedData;

    const entry = db.addEntry(data, userId);

    res.status(201).json({
      success: true,
      message: 'Data received and processed successfully',
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all data entries with pagination
 */
const getData = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;

    const result = db.getAllEntries(limit, offset);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get data entry by ID
 */
const getDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = db.getEntryById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Entry with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete data entry
 */
const deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteEntry(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Entry with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Entry deleted successfully',
      id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get API statistics and database info
 */
const getStats = async (req, res, next) => {
  try {
    const dbStats = db.getStats();
    const metrics = tracker.getMetrics();

    res.status(200).json({
      success: true,
      database: dbStats,
      metrics,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitData,
  getData,
  getDataById,
  deleteData,
  getStats,
};
