import "./index.scss";
import { useState, useEffect } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

type ValueType = string | number;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: ValueType,
    onUpdate?: (value: ValueType) => void
}

export default function Input({ value, onUpdate, ...props }: InputProps) {
    const [inputValue, setInputValue] = useState<ValueType>(value || "");
    const inputWidth = !inputValue ? "1ch" : `${[...inputValue.toString()].length}ch`;

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        setInputValue(target.value);

        if (onUpdate) {
            onUpdate(inputValue);
        }
    }

    return (
        <input
            style={{ width: inputWidth }}
            className="input"
            value={value}
            onChange={handleChange}
            { ...props }
        />
    );
}