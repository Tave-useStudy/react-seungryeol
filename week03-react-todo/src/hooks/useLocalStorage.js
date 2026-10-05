import {useEffect, useReducer} from 'react';

const isValidTodo = (todo) => {
    return (
        typeof todo.id === 'number' &&
        typeof todo.text === 'string' &&
        typeof todo.done === 'boolean' &&
        typeof todo.category === 'string' &&
        typeof todo.priority === 'string'
    );
}

function useLocalStorage(key, reducer, initialState) {
    const loadedState = () => {
        const savedState = localStorage.getItem(key);
        if (!savedState) {
            return initialState;
        }
        try {
            const parsedState = JSON.parse(savedState);

            if (!Array.isArray(parsedState)) {
                return initialState;
            }

            if (!parsedState.every(isValidTodo)) {
                return initialState;
            }

            return parsedState;
        } catch {
            return initialState;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState, loadedState);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, dispatch];
}

export default useLocalStorage;
