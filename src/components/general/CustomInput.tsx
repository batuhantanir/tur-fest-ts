'use client';
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { cn } from '@/lib/utils';

interface CustomInputProps {
  title: string;
  className?: string;
  name: string;
  type?: string;
}

const CustomInput = ({ title, className, name, type }: CustomInputProps) => {
  return (
    <div className="space-y-2 flex flex-col w-full">
      <label htmlFor={name} className="pl-1 text-sm text-[#3F536C]">
        {title}
      </label>
      <Field
        className={cn(
          ' text-gray-400 transition-colors duration-200 border p-3 rounded-md border-[#E4E4E7] focus:text-black w-full',
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
