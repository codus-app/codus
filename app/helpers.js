module.exports = {
  // Remove _id and __v keys from Mongoose documents and arrays of mongoose documents
  stripId(obj) {
    if (Array.isArray(obj)) return obj.map(o => module.exports.stripId(o)); // Recur for arrays
    const o = 'toObject' in obj ? obj.toObject() : obj; // Convert mongoose documents to JS objects
    return Object.assign(o, { _id: undefined, __v: undefined }); // Remove properties
  },
};
