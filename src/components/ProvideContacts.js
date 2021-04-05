import createPersistentStateProvider, {LocalStoragePersistenceController} from "@src/helper/createPersistentStateProvider";
// We use symbols as unique identifiers.
export const ContactsSymbol = Symbol('Contacts provider identifier').toString();

export default createPersistentStateProvider(ContactsSymbol, {
    contacts: []
}, new LocalStoragePersistenceController(ContactsSymbol));