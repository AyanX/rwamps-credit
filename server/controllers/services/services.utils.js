const validService = (service) => {
  const { title, content, icon, points } = service;
  if (!title || !content || !icon || !points) {
    return false;
  }
  // check if points is an array , or if its a string, check if its convertible to an array| a string of array
  if (typeof points !== "string" && !Array.isArray(points)) {
    return false;
  }

  // If it's a string, try to parse as JSON
  if (typeof points === "string") {
    try {
      arr = JSON.parse(points);
    } catch (err) {
      return false; // Invalid JSON string
    }
  }

  // Must be an array now
  if (!Array.isArray(arr)) return false;

  return true;
};

const validServiceToClient = (service) => {
  const services = service.map((s) => {
    // data from db, points is a stringified array, we need to check if its convertible to an array
    const { title, content, icon, points, id , image, blur_image} = s;

    const parsedPoints = JSON.parse(points);

    return {
      title,
      content,
      icon,
      points: parsedPoints,
      id,
      image,
      blur_image,
    };
  });

  return services;
};

function pointsStringified(points) {
  // Only accept string or array
  if (typeof points !== "string" && !Array.isArray(points)) {
    return null;
  }

  let arr = points;

  // If it's a string, try to parse as JSON
  if (typeof points === "string") {
    try {
      arr = JSON.parse(points);
    } catch (err) {
      return null; // Invalid JSON string
    }
  }

  // Must be an array of strings
  if (!Array.isArray(arr) || !arr.every(el => typeof el === "string")) {
    return null;
  }

  // Return the stringified version
  return JSON.stringify(arr);
}

module.exports = {
  validService,
  validServiceToClient,
  pointsStringified
};
