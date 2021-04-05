import createPersistentStateProvider, {LocalStoragePersistenceController} from "@src/helper/createPersistentStateProvider";
// We use symbols as unique identifiers.
export const ConversationsSymbol = Symbol('Conversations provider identifier').toString();

export default createPersistentStateProvider(ConversationsSymbol, {
    conversations: []
}, new LocalStoragePersistenceController(ConversationsSymbol));