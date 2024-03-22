import React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  titleIcon?: React.ReactNode;
  description: string;
  descriptionClass?: string;
}

function LoginContainer({
  children,
  title,
  titleIcon,
  description,
  descriptionClass,
}: Props) {
  return (
    <div className="bg-layoutColor flex items-center justify-center w-full">
      <div className=" w-[96%] bg-transparent rounded-md min-w-[300px] sm:w-[70%] max-w-[450px] flex flex-col items-center py-8 2xl: md:px-[30px] px-[20px]">
        <div className=" mx-6 space-y-1 mt-4 mb-5 w-full">
          <h1 className="font-bold text-2xl gap-1 flex text-blue-600 ">
            {title && <span>{title}</span>}
            {titleIcon && <span>{titleIcon}</span>}
          </h1>
          <p className={descriptionClass ? descriptionClass : 'text-black '}>
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default React.memo(LoginContainer);
