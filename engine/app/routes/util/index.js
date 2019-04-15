module.exports = {

  md: obj => ({
    md: obj.md,
    html: (obj.html || '').replace(/&amp;quot;/g, '&quot;'),
  }),

};
