import $ from 'jquery';
import config from '../config.json';

const getGetAverageMiningTimeByTimePromise = minutes => new Promise((resolve, reject) => {
    const host = `http://${config.apiHostName}:${config.apiPort}`;

    $.ajax({
        url: `${host}/mining-time/average/last-minutes/${minutes}`,
        type: 'GET',
        success: (data) => {
            if (data.success) {
                resolve(data);
            } else {
                reject(new Error(data.message));
            }
        },
        error: (xhr, status, err) => {
            reject(err || new Error('Problem with the connection to API'));
        },
    });
});

export default getGetAverageMiningTimeByTimePromise;
