export const isIntegerNumeric = n => !Number.isNaN(Number.parseInt(n, 10));

export const getCurrentTimestamp = () => Math.floor((new Date().getTime()) / 1000);

export const timestampToString = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};
