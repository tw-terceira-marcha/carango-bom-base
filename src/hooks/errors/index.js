import { useState } from 'react';

const useErrors = (validations) => {

    const initialState = createInitialState(validations);

    const [errors, setErrors] = useState(initialState);

    const validateFields = (event) => {
        const { name, value } = event.target;
        const newState = { ...errors };
        newState[name] = validations[name](value);
        setErrors(newState);
    };

    const canSend = () => {
        for (let campo in errors) {
            if (!errors[campo].valido) {
                return false;
            }
        }
        return true;
    };

    return [errors, validateFields, canSend];
};

const createInitialState = (validations) => {
    const initialState = {};
    for (let field in validations) {
        initialState[field] = { valido: true, texto: '' };
    }

    return initialState;
};

export default useErrors;