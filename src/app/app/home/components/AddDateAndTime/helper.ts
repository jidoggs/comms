// dateTimeHelper.ts
import { DateTimeEntry } from "./types";
export const INITIAL_DATE_TIME: DateTimeEntry = {
    id: 0,
    date: null,
    time: null,
  };
  
  export const generateNewDateTimeEntry = (id: number): DateTimeEntry => ({
    id,
    date: null,
    time: null,
  });
  