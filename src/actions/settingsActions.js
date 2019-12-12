import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from './types';

export const setDisableBalanceOnAdd = () => {
    // get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // Toggle
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
    localStorage.setItem('settings', JSON.stringify(settings));
    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    };
}

export const setDisableBalanceOnEdit = () => {
    // get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // Toggle
    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
    localStorage.setItem('settings', JSON.stringify(settings));
    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    };
}

export const setAllowRegistration = () => {
    // get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // Toggle
    settings.allowRegistration = !settings.allowRegistration;
    localStorage.setItem('settings', JSON.stringify(settings));
    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    };
}