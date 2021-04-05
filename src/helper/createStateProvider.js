import {provide, reactive, readonly, toRefs} from "vue";
import {capitalize} from "lodash";

export default function (symbol, initialState) {
    return {
        setup() {
            const state = reactive(initialState);

            const update = (property, value) => {
                state[property] = value;
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