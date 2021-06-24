import { useState, useEffect } from 'react';

import normalizeCurrency from '../../utils/normalizeCurrency';

const MoneyInput = (props) => {
    const [ view, setView ] = useState('');
    const { inputRef, ...other } = props;

    useEffect(
        () => {
            setView(normalizeCurrency(props.value));
        },
        [props.value]
    )

    const handleChange = (event) => {
        event.preventDefault();
        const currency = normalizeCurrency(event.target.value);

        const returnEvent = {
            target: {
                name: props.name,
                value: currency
            }
        }
        props.onChange(returnEvent);
    }

    return (
        <input
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            value={view}
            onChange={handleChange}
        />
    );
}

export default MoneyInput;