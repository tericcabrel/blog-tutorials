import cron, { ScheduleOptions } from 'node-cron';

const scheduleOptions: ScheduleOptions = {
  scheduled: false,
  timezone: 'Europe/Paris',
  name: 'simple-task',
  recoverMissedExecutions: true,
};

const scheduleAction = async () => {
  const currentDate = new Date();

  console.log(`Build and send the weekly report - ${currentDate.getHours()}:${currentDate.getMinutes()}`);

  // Build and send the weekly report
};

const weeklyReportScheduler = cron.schedule('30 7 * * MON', scheduleAction, scheduleOptions);

export { weeklyReportScheduler };
