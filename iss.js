const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  request("https://api.aipify.org?format=json", (err, rspns, body) => {
    if (err) {
      callback(err, null);
    }
    //Assum server error if status code is not 200
    if (rspns.statusCode !== 200) {
      const msg = `Status Code ${rspns.statusCode} when fetching IP. Response: ${body}`;

      callback(Error(msg), null);
      return;
    }
    //Return JSON data if filters clear
    callback(null, body);
  });
};

module.exports = { fetchMyIP };
