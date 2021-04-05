import createStateProvider from "@src/helper/createStateProvider";
// We use symbols as unique identifiers.
export const UserSettingsSymbol = Symbol('User settings combined provider identifier').toString();

export default createStateProvider(UserSettingsSymbol, {
    user: null,
    language: 'en',
    theme: 'light',
});