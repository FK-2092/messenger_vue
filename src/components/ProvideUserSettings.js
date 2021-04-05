import createPersistentStateProvider, {LocalStoragePersistenceController} from "@src/helper/createPersistentStateProvider";
// We use symbols as unique identifiers.
export const UserSettingsSymbol = Symbol('User settings combined provider identifier').toString();

export default createPersistentStateProvider(UserSettingsSymbol, {
    user: null,
    language: 'en',
    theme: 'light',
}, new LocalStoragePersistenceController(UserSettingsSymbol));