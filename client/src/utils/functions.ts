import { toJalaali } from "jalaali-js";

export const convertGregorianToJalali = (date: string) => {
  const dateOnly = date.split("T")[0];

  const [year, month, day] = dateOnly.split("-").map(Number);

  const { jy, jm, jd } = toJalaali(year, month, day);

  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
};
