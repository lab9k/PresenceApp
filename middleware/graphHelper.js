const request = require('superagent');

function getUserData(accessToken, callback) {
  request
   .get('https://graph.microsoft.com/beta/me')
   .set('Authorization', 'Bearer ' + accessToken)
   .end((err, res) => {
     callback(err, res);
   });
}

function getProfilePhoto(accessToken, callback) {
  // Get the profile photo of the current user (from the user's mailbox on Exchange Online).
  // This operation in version 1.0 supports only work or school mailboxes, not personal mailboxes.
  request
   .get('https://graph.microsoft.com/beta/me/photo/$value')
   .set('Authorization', 'Bearer ' + accessToken)
   .end((err, res) => {
     // Returns 200 OK and the photo in the body. If no photo exists, returns 404 Not Found.
     callback(err, res.body);
   });
}

exports.getUserData = getUserData;
exports.getProfilePhoto = getProfilePhoto;