import { Constants } from "./Constants";

/******Sort Function  with params (Original User Data)**** */
export const sortPlayers = (APIData) => {
    return Object.values(APIData).sort((a, b) => (a.bananas < b.bananas) ? 1 : -1);
}

/******Top Ten Records Function params (Sorted User Data)*****/
export const getTopPlayers = (APIData) => {
    return APIData.splice(Constants.offset, Constants.limit);
}

/******Search Function params (Sorted user Data,  Search user name in Data)*****/
export const searchPlayers = (APIData, searchKeyword) => {
    return APIData.filter(value => {
        return value.name.toLowerCase().match(new RegExp(searchKeyword.toLowerCase(), 'g'));
    })
}

/******Search Element Position Function params (Sorted user Data,  Search user name in Data)*****/
export const searchElementIndex = (APIData, searchKeyword) => {
    return APIData.findIndex(obj => obj.name.toLowerCase().match(new RegExp(searchKeyword.toLowerCase(), 'g')))
}