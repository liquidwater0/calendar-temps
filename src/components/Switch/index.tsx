import "./index.scss";
import { useState } from "react";
import type { HTMLAttributes } from "react";

interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
    checked?: boolean,
    onUpdate?: (value: boolean) => void
}

export default function Switch({ checked, onUpdate, className = "", ...props }: SwitchProps) {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    function handleClick() {
        setIsChecked(c => !c);

        if (onUpdate) {
            onUpdate(!isChecked); //have to invert for some reason
        }
    }

    return (
        <button
            className={`switch ${className}`}
            role="switch"
            data-checked={isChecked}
            aria-checked={isChecked}
            onClick={handleClick}
            { ...props }
        >
            <span className="visually-hidden">
                { isChecked ? "checked" : "not checked" }
            </span>
        </button>
    );
}