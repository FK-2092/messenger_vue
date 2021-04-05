import {provide, reactive, readonly, toRefs} from "vue";
import {capitalize} from "lodash";

class PersistenceController {
    constructor(symbol) {
        this.symbol = symbol
    }
    restore() {}
    store() {}
}

export class LocalStoragePersistenceController extends PersistenceController{
    constructor(symbol) {
        super(symbol);
    }

    restore() {
        let state
        try {
            state = JSON.parse(localStorage.getItem(this.symbol))
        } catch (e) {
            state = {}
        }
        return state
    }

    store(state) {
        localStorage.setItem(this.symbol, JSON.stringify(state))
    }
}

export default function (symbol, initialState, persistenceController) {
    return {
        setup() {
            const restoredState = persistenceController.restore();
            const state = reactive({
                ...initialState,
                ...restoredState
            });

            const update = (property, value) => {
                state[property] = value;
                persistenceController.store(state)
            };

            const functions = {};

            Object.entries(state).map(([key]) => {
                const functionName = `update${capitalize(key)}`
                functions[functionName] = (value) => update(key, value)
            })

            // Using `toRefs()` makes it possible to use
            // spreading in the consuming component.
            // Making the return value `readonly()` prevents
            // users from mutating global state.
            provide(symbol, {...toRefs(readonly(state)), update, ...functions});
        },
        render() {
            // Our provider component is a renderless component
            // it does not render any markup of its own.
            return this.$slots.default();
        },
    }
}