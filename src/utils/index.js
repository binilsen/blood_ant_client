import dayjs from "dayjs";

export const ageCalculator = (dob) => dayjs().year() - dayjs(dob).year();
