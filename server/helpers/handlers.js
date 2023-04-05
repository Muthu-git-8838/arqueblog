const moment = require("moment");
const getTwoDateDiffPercentage = (startDate, endDate) => {
  var startOfDate = moment(startDate),
    endDate = moment(endDate, "X"),
    todayDate = moment();
  const daysDifference = moment(endDate).diff(startOfDate, "days");
  const difference = todayDate.diff(startOfDate, "days");

  const result = Math.round((difference / daysDifference) * 100);
  return result;
};

const getColumns = (Model) => {
  let sortings=['_id']
  return Object.values(Model.schema.paths).sort((a, b) => sortings.indexOf(b.path)-sortings.indexOf(a.path))
};

module.exports = { getTwoDateDiffPercentage, getColumns };
