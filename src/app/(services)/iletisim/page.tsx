import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';

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
        <h2 className="text-2xl font-medium">İletişim - Turfest</h2>
        <div className="flex flex-col gap-2">
          <h6 className="font-semibold">İletişim</h6>
          <div>
            <p className="text-sm">
              <a className="" href="mailto:turfest@gmail.com ">
                <span className="font-medium">E-Posta:</span> turfest@gmail.com
              </a>
            </p>
            <a href="tel:+905059956402" className="text-sm ">
              <span className="font-medium">Telefon:</span> +90 505 995 64 02{' '}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="flex self-start font-semibold">Adres</h6>
          <p className="text-sm">
            Turfest Turizm Seyahat Acentesi İstanbul, Türkiye{' '}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="flex self-start font-semibold"> Kurumsal</h6>
          <div>
            <p className="text-sm">
              Şirket Ünvanı: TURFEST SEYAHAT ACENTELİĞİ VE TURİZM A.Ş
            </p>
            <p className="text-sm">Ticaret Sicil No: 111111</p>
          </div>
        </div>
      </div>
    </ServicesContainer>
  );
}

export default Contact;
