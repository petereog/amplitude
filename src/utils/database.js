const { v4: uuidv4 } = require('uuid');

/**
 * In-Memory Database
 * Stores data entries with timestamps and metadata
 */
class Database {
  constructor() {
    this.entries = [];
    this.stats = {
      totalEntries: 0,
      totalRequests: 0,
      createdAt: new Date(),
    };
  }

  /**
   * Add a new entry
   */
  addEntry(data, userId = null) {
    const entry = {
      id: uuidv4(),
      data,
      userId,
      timestamp: new Date(),
      status: 'processed',
    };
    this.entries.push(entry);
    this.stats.totalEntries++;
    return entry;
  }

  /**
   * Get all entries
   */
  getAllEntries(limit = 50, offset = 0) {
    return {
      total: this.entries.length,
      limit,
      offset,
      entries: this.entries.slice(offset, offset + limit).reverse(),
    };
  }

  /**
   * Get entry by ID
   */
  getEntryById(id) {
    return this.entries.find(entry => entry.id === id) || null;
  }

  /**
   * Get entries by user
   */
  getEntriesByUser(userId) {
    return this.entries.filter(entry => entry.userId === userId);
  }

  /**
   * Update entry
   */
  updateEntry(id, updates) {
    const entry = this.getEntryById(id);
    if (!entry) return null;
    
    Object.assign(entry, updates, { id: entry.id, timestamp: entry.timestamp });
    return entry;
  }

  /**
   * Delete entry
   */
  deleteEntry(id) {
    const index = this.entries.findIndex(entry => entry.id === id);
    if (index === -1) return false;
    
    this.entries.splice(index, 1);
    return true;
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      ...this.stats,
      totalEntries: this.entries.length,
      totalRequests: this.stats.totalRequests + 1,
    };
  }

  /**
   * Clear all entries
   */
  clear() {
    this.entries = [];
  }
}

// Singleton instance
const db = new Database();

module.exports = db;
