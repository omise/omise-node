import { Schedules } from "../../types";
import omise from "./index";

omise.schedules.retrieve((err: Error | null, resp: Schedules.ISchedulesList) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(resp);
});