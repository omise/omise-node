import { Schedules } from "../index";
import omise from "./index";

omise.schedules.retrieve((err: Error | null, resp: Schedules.ISchedulesList) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(resp);
});