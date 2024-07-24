import React from 'react';

type Props = {
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

const Input = React.forwardRef<HTMLInputElement, Props>(({  ...props }, ref) => {
  return (
      <input
        className="w-full p-2 border border-gray-900"
        ref={ref}
        {...props}
      />

  );
});

export default Input;