'use client';
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { twMerge } from 'tailwind-merge';

interface CustomInputProps {
  title: string;
  className?: string;
  name: string;
  type?: string;
}

const CustomInput = ({ title, className, name, type }: CustomInputProps) => {
  return (
    <div className="space-y-2 flex flex-col">
      <label htmlFor={name} className="pl-1 text-sm text-[#3F536C]">
        {title}
      </label>
      <Field
        className={twMerge(
          'w-full text-gray-400 transition-colors duration-200 border p-3 rounded-md border-[#E4E4E7] focus:text-black',
          className
        )}
        type={type ? type : 'text'}
        autoComplete="off"
        id={name}
        name={name}
      />
      <ErrorMessage name={name} component="div" className="text-cst-primary" />
    </div>
  );
};

export default CustomInput;
