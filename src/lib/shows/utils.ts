import dayjs from "dayjs";

export const formattedPerformAt = (performAt: Date): string =>
  dayjs(performAt).format("YYYY MMM D hh:MM a");
