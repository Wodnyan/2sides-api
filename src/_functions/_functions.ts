import fetch from "node-fetch";

type DateSeparator = " " | "." | "-" | "/";

export const getHtml = async (link: string) => {
    const resp = await fetch(link);
    const body = await resp.text();
    return body;
};
export const getDate = (date: Date, separator: DateSeparator) => {
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formatedDate = `${year}${separator}${addZeroToDate(
        month
    )}${separator}${addZeroToDate(dayOfMonth)}`;
    return formatedDate;
};
const addZeroToDate = (date: number) => {
    return date < 10 ? "0" + date : date;
};
