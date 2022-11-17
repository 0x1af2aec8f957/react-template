/// doc: https://effector.dev/docs/api/effector-react
import {createStore, createEvent} from 'effector'

/// action
export const changeAddAge = createEvent<number>();
/// state
export const $userInfo = createStore({
    age: 0,
    role: '*'
})
.on(changeAddAge, (state, params: number) => ({...state, age: state.age + params}));