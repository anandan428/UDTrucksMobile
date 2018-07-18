var axios = require('axios');


export function getPartsInfo(partNumber) {
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/PartInventories/ByPartNumber', {
        params: {
            PartNumber: partNumber
        }
    });
}

export function getMovementLogInfobyDate(partNumber, date){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/MovementLogs/MovementLogsbyFilters', {
        params: {
            PartNumber: partNumber,
            CreatedDate: date
        }
    });
}

export function sendMovementLog(data){
    return axios.post('https://BufferManagementHub.azure-devices.net/devices/BufferMgtMobile/messages/events?api-version=2016-11-14', data, {
        headers: {
            'Authorization': {
                toString() {
                    return 'SharedAccessSignature sr=BufferManagementHub.azure-devices.net&sig=1n6lO/kutL4wQjOq5XwWTN5by/EChwFtCWtpv5FuoVI%3D&se=1562659722&skn=iothubowner&devices=BufferMgtMobile'
                }
            }, 
            'Content-Type': 'application/json'
        }
    });
}

export function getAllMovementLog(){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/MovementLogs/AllMovementLogs');
}

export function getAllLocation(){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/Locations');
}

export function getLocation(locationName){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/Locations', {
        params: {
            id: locationName
        }
    });
}

export function getPossOrderbyptno(partNumber, date){
    return axios.get('http://buffermanagementwebservice.azurewebsites.net/api/POSSMovementLogs/POSSMovementLogsbyFilters', {
        params: {
            PartNumber: partNumber,
            CreatedDate: date
        }
    });
}