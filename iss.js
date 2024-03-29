const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  request("https://api.ipify.org?format=json", (err, rspns, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    //Assume server error if status code is not 200
    if (rspns.statusCode !== 200) {
      const msg = `Status Code ${rspns.statusCode} when fetching IP. Response: ${body}`;

      callback(Error(msg), null);
      return;
    }
    //Return JSON data if filters clear
    const pureIp = JSON.parse(body);
    callback(null, pureIp.ip);
  });
};

const fetchCoordsByIP = function (ipString, callback) {
  request("https://ipwho.is/" + ipString, (err, rspns, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    //Check if returning object has false on acquiring coordinates
    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(msg, null);
      return;
    }

    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (err, rspns, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (rspns.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${rspns.statusCode} when fetching ISS pass times: ${body}`
        ),
        null
      );
      return;
    }

    const issPasses = JSON.parse(body);
    callback(null, issPasses.response);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, iss) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, iss);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
