import { SettingsFormValues } from "./form";

export const defaultSettingValues: SettingsFormValues = {
    general: {
        name: '',
        email: '',
        phone: '',
        address: {
            house_number: '',
            road: '',
            sub_district: '',
            district: '',
            province: '',
            postal_code: '',
        }
    },
    localization: {
        language: '',
        timezone: '',
    },
    maintenance: {
        enabled: false,
        message: '',
    }
};