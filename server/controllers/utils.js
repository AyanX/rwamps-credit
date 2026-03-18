
const arrayStringified = (arr) => {
   if (!arr || !Array.isArray(arr)) return null;
   return JSON.stringify(arr);
}

const stringifiedArrayToArray = (str) => {
   if (!str || typeof str !== 'string') return null;
   try {
      const arr = JSON.parse(str);
      if (Array.isArray(arr)) return arr;
      return null;
   } catch (error) {
      return null;
   }
}

module.exports = {
    arrayStringified,
    stringifiedArrayToArray
}