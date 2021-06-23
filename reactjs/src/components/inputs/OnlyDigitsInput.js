import { useState, useEffect } from 'react';

import onlyNumbers from '../../utils/onlyNumbers';

const OnlyDigitsInput = (props) => {
    const [ view, setView ] = useState('');
    const { inputRef, ...other } = props;

    useEffect(
        () => {
            setView(onlyNumbers(props.value));
        },
        [props.value]
    )

    const handleChange = (event) => {
        event.preventDefault();
        const digits = onlyNumbers(event.target.value);

        const returnEvent = {
            target: {
                name: props.name,
                value: digits
            }
        }
        props.onChange(returnEvent);
    }

    return (
        <input
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            value={view}
            onChange={handleChange}
        />
    );
}

export default OnlyDigitsInput;