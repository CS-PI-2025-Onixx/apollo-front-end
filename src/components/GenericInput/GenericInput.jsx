import './GenericInput.css';
import { useState } from 'react';

export default function GenericInput({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    mask = false,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(
        mask ? formatPrice(value || '') : value
    );

    function formatPrice(val) {
        if (!val) return '';
        val = val.toString().replace(/\D/g, '');
        val = (val / 100).toFixed(2);
        val = val.replace('.', ',');
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `R$ ${val}`;
    };

    const handleInputChange = (e) => {
        if (mask) {
            let val = e.target.value.replace(/\D/g, '');
            const formatted = formatPrice(val);
            setInputValue(formatted);
            onChange({ ...e, target: { ...e.target, value: parseFloat(val) / 100 } }); // Envia apenas o valor numérico
        } else {
            setInputValue(e.target.value);
            onChange(e);
        }
    };
    return (
        <div className="input-container">
            {type === 'textarea' ? (
                <>
                    <textarea
                        id='input-textarea'
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="input-textarea"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(value.length > 0)}
                    />
                    <label htmlFor="input-textarea" className={`${value.length > 0 ? 'label-text-area' : 'label-text-deactivate'}`}>{label}</label>
                </>
            ) : (
                <>
                    <label htmlFor="input" className='label-input'>{label || '\u00A0'}</label>
                    <input
                        id="input"
                        type={type}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        min={type === 'number' ? 0 : undefined}
                    />
                </>
            )}
        </div>
    );
}