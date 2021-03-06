const User = require('../models/user');

exports.postRun = async (req, res, next) => {
  const { _id } = req.user;

  // Find the user by id and push the new run onto the runlog
  const updatedRunLog = await User.findOneAndUpdate(
    { _id: _id },
    { $push: { runlog: req.body } }
  );

  res.status(200).send(updatedRunLog);
};

exports.getRunsByDate = async (req, res, next) => {
  const { _id } = req.user;

  //Return dates between two dates
  const aggregatedData = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        runlog: {
          $filter: {
            input: '$runlog',
            as: 'runlog',
            cond: {
              $and: [
                { $gte: ['$$runlog.date', new Date('2019-03-31')] },
                { $lte: ['$$runlog.date', new Date('2019-04-10')] },
              ],
            },
          },
        },
      },
    },
  ]);
  const runs = aggregatedData[0].runlog;

  return res.status(200).json({ runs: runs });
};

exports.getRunsByMonth = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  const monthlyRuns = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        runlog: {
          $filter: {
            input: '$runlog',
            as: 'runlog',
            cond: { $eq: ['$$runlog.month', parseInt(id)] },
          },
        },
      },
    },
  ]);

  const { runlog } = monthlyRuns[0];

  const sortedRuns = runlog.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({ runs: sortedRuns });
};

exports.getThisWeeksRuns = async (req, res, next) => {
  const { _id } = req.user;
  const aggregatedData = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        runlog: {
          $filter: {
            input: '$runlog',
            as: 'runlog',
            cond: { $eq: ['$$runlog.week', { $isoWeek: new Date() }] },
          },
        },
      },
    },
    {
      $project: {
        totals: {
          totalDistance: { $sum: '$runlog.distance' },
          totalHrs: { $sum: '$runlog.hrs' },
          totalMins: { $sum: '$runlog.mins' },
          totalSecs: { $sum: '$runlog.secs' },
          totalDays: { $size: '$runlog' },
        },
        runlog: '$runlog',
      },
    },
  ]);

  return res.status(200).json({
    runlog: aggregatedData[0].runlog,
    totals: aggregatedData[0].totals,
  });
};
