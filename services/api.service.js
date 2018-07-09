var axios = require('axios');


export function getPartsInfo(partNumber) {
    alert(partNumber);
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/PartInventories/ByPartNumber', {
        params: {
            PartNumber: partNumber
        }
    });
}

export function sendMovementLog(data){
    return axios.post('http://buffermanagementwebservice.azurewebsites.net/api/MovementLogs', data);
}

export function getAllMovementLog(){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/MovementLogs/AllMovementLogs');
}

export function getAllLocation(){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/Locations');
}