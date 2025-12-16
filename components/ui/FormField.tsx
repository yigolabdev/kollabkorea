import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  rows = 4,
  options = [],
  error,
}) => {
  const baseInputStyles = 'w-full p-3 bg-black border border-zinc-700 text-white rounded-none focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors';
  const errorStyles = error ? 'border-red-500' : '';

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-zinc-400 mb-2">
        {label}
        {required && <span className="text-kollab-red ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInputStyles} ${errorStyles} resize-none`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseInputStyles} ${errorStyles}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`${baseInputStyles} ${errorStyles}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

