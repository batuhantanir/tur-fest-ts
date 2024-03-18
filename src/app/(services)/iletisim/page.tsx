import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import { contactData } from '@/mocks/servicesMocks';

function Contact() {
  return (
    <ServicesContainer>
      <iframe
        className="md:mt-4 md:space-x-0 md:ml-0 w-full h-[250px] md:h-[300px] mb-4"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12023.605458208534!2d28.991001500817866!3d41.114845187523834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab4340fb9acd1%3A0xf14121f85f1bc96a!2sTurkcell%20Platinum%20Park!5e0!3m2!1str!2str!4v1708885097202!5m2!1str!2str"
        width="998"
        height="335"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="py-2 space-y-4 ">
        <h2 className="text-2xl font-medium">{contactData.title}</h2>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold">{contactData.firstChild.title}</h6>
          <div className="flex flex-col">
            {contactData.firstChild.children.map((item, index) => (
              <a key={index} href={item.href} className="text-sm ">
                <span className="font-medium">{item.title} </span>
                <span>{item.content}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="flex self-start font-semibold">
            {contactData.secondaryChild.title}
          </h6>
          <p className="text-sm">{contactData.secondaryChild.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="flex self-start font-semibold">
            {' '}
            {contactData.thirdChild.title}
          </h6>
          <div>
            <p className="text-sm">{contactData.thirdChild.description}</p>
            <p className="text-sm">{contactData.thirdChild.description2}</p>
          </div>
        </div>
      </div>
    </ServicesContainer>
  );
}

export default Contact;
