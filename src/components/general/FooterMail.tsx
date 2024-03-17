"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  footerMail: Yup.string()
    .required("Bu alan zorunludur")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Geçerli bir e-posta adresi giriniz"
    ),
});

function FooterMail() {
  return (
    <>
      <Formik
        initialValues={{ footerMail: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
        }}
      >
        <Form className="flex items-center justify-center py-3 max-w-[400px] ">
          <div className="flex flex-nowrap flex-col gap-5 items-center justify-center  w-full  text-white text-center">
            {/* <h4 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">Kampanyalarımızdan haberdar olmak ister misiniz?</h4> */}
            <div className="w-full text-start space-y-1">
              <div className="flex gap-2 flex-nowrap md:gap-2  w-full">
                <Field
                  className="w-full h-12 px-5 text-black rounded-md"
                  name="footerMail"
                  id="footerMail"
                  type="text"
                  placeholder="E-posta adresiniz"
                />
                <button
                  className=" border whitespace-nowrap bg-cst-primary  rounded-sm 
                                    px-3 py-2 text-white scale-95
                                    border-cst-primary  hover:bg-white hover:text-cst-primary
                                    transition-all duration-200 ease-in-out
                                    active:scale-90"
                >
                  Kaydol
                </button>
              </div>
              <ErrorMessage
                name="footerMail"
                component="div"
                className="text-cst-primary pl-1 text-base"
              />
            </div>
            {/* <div className="text-sm md:text-base ">Kaydolduğunuz taktirde başlatılan her kampanya için size mail göndereceğiz</div> */}
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default FooterMail;
