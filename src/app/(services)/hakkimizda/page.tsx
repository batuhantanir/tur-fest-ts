import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import Link from 'next/link';

function AboutUs() {
  return (
    <ServicesContainer>
      <div className="py-2">
        <h2 className="text-2xl font-medium mb-4">Hakkımızda - Turfest</h2>
        <p className="text-sm">
          Türkiye&apos;nin lider tur operatörü ile Dünyayı keşfedin... Turfest
          sektörde seçkin bir yer edinmiş, deneyimli yönetim kadrosu ile öncü
          olmayı hedefleyen yenilikçi ve mükemmeliyetçi anlayışla yola çıkan bir
          turizm Seyahat ve Organizasyon acentasıdır. Müşteri memnuniyeti ve
          konforunu en üst seviyede gerçekleştirme konusundaki hassasiyetimiz
          kusursuz hizmet anlayışımızın başlıca göstergesidir. Turfest
          profesyonel kadrosu ile organizasyonlarınızda şirket profilinizi
          maksimum fayda sağlayacağınız bir atılıma dönüştürerek kurumsal
          iletişim konusundaki tüm desteği alabileceğiniz en güvenilir isim
          olacaktır. Dünyanın her yerine seyahat, özel tur organizasyonları,
          gemi turları, kongre ve asistans hizmeti ile güven ve konforu sınırsız
          hizmet anlayışı ile birleştiren Turfest ile seyahat bir ayrıcalık
          olacaktır.
        </p>
        <h3 className="text-2xl font-medium mt-6 mb-4">
          Tatil Satış Kanallarımız
        </h3>

        <ul className="list-disc ">
          <li className="list-item ml-5 ">Web Sitemiz Aracılığıyla,</li>
          <p className="mb-4 ">
            Tatil satın alma işleminizin tercih ettiğiniz bir diğer yolu da web
            sitemiz üzerinden satın alma kolaylığı... Online ortamlarda güvenli
            alışveriş yapabilmek için geliştirilmiş bir kimlik doğrulama sistemi
            olan 3-D Secure ile güvenli tatil satın almanın hizmetinin sunulduğu
            web sitemizde, tatil satın alma işleminizi tamamladıktan sonra her
            türlü isteğinizi çağrı merkezimize dilediğiniz zaman aralığında
            bildirebilirsiniz.
          </p>
          <li className="list-item ml-5">Telefon Aracılığıyla,</li>
          <p className="mb-4">
            <a href="tel:+905059956402" className="font-medium">
              0505 995 64 02
            </a>{' '}
            no’lu çağrı merkezimizde görev alan seyahat danışmanlarımız
            sayesinde ayrıntılı ürün bilgilerini çok kısa bir sürede
            öğrenebileceğiniz gibi, çok kolay bir şekilde tatil satın alma
            işlemini yapabileceksiniz. Çağrı merkezimiz teknolojik alt yapısı
            sayesinde sesli yanıt sistemiyle hızlı ve güvenilir bir şekilde
            rezervasyon işlemlerinizi gerçekleştirebiliyorsunuz. Tatilinizi
            satın aldıktan sonra gerekli evraklar sistem üzerinden otomatik mail
            veya faks yoluyla tarafınıza, onayınız için iletiliyor.
          </p>
          <li className="list-item ml-5">Whatsapp Aracılığıyla,</li>
          <p className="">
            Tur detayları, rezervasyonlar, özel istekleriniz veya herhangi bir
            sorunuz için bize Whatsapp üzerinden ulaşabilirsiniz. Profesyonel
            ekibimiz, size en uygun tatil planını yapmanızda yardımcı olmak için
            hazır!
          </p>
          <div className="flex mb-4 gap-2">
            <p className="font-medium">Whatsapp Numaramız: </p>
            <Link href="https://wa.me/+905059956402" className="">
              {' '}
              0505 995 64 02
            </Link>
          </div>
          <li className="list-item ml-5">Sosyal Medya Aracılığıyla,</li>
          <p>Bizlere instagram üzerinden ulaşabilirsiniz.</p>
          <Link href="https://www.instagram.com/turfestcom">
            <span className="font-medium">Instagram: </span>@turfest
          </Link>
        </ul>
      </div>
    </ServicesContainer>
  );
}

export default AboutUs;
