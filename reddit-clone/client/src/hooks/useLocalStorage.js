import { useState, useEffect } from "react";

const PREFIX = 'nclone-app-';

export default function useLocalStorage(key, initialValue) {
    const prefixKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const value = localStorage.getItem(prefixKey);
        if (value !== null) return value;
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        if(value){
            localStorage.setItem(prefixKey, value);
        }
    }, [prefixKey, value])

    return [value, setValue];
}