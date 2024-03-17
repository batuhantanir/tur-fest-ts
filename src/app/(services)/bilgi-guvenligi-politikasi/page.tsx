import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';
function InformationSecurityPolicy() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 id="title" className="text-2xl font-medium">
          Bilgi Güvenliği Politikası - Turfest
        </h2>
        <p className="text-sm">
          Turfest Turizm Seyahat Acentesi olarak, müşteri memnuniyeti ve
          güvenliği bizim için en önemli konudur. Bu kapsamda, kişisel
          verilerinizin korunmasına yönelik olarak aşağıda belirtilen
          politikaları uygulamaktayız.
        </p>
        <TextComponent
          title="Kişisel Verilerin Toplanması ve İşlenmesi"
          content="Kişisel verileriniz, Turfest Turizm Seyahat Acentesi tarafından, sizlerin onayı alınarak, yasal çerçevede ve faaliyetlerimiz ile bağlantılı olarak toplanmakta ve işlenmektedir."
        />
        <TextComponent
          title="Kişisel Verilere Erişim"
          content="Kişisel verilerinize, sadece yetkili kişilerin erişimi mümkündür. Kişisel verilerinize yetkisiz erişim, kişisel verilerin kaybı, hatalı kullanımı veya değiştirilmesine karşı gerekli önlemleri almaktayız."
        />
        <TextComponent
          title="Kişisel Verilerin Saklanması"
          content="Kişisel verileriniz, yasal saklama süreleri boyunca saklanmaktadır. Yasal saklama süreleri sona erdiğinde, kişisel verileriniz silinmektedir."
        />
        <TextComponent
          title="Kişisel Verilerin İşlenmesi"
          content="Kişisel verileriniz, yasal çerçevede ve faaliyetlerimiz ile bağlantılı olarak işlenmektedir. Kişisel verileriniz, yasal çerçevede ve faaliyetlerimiz ile bağlantılı olarak işlenmektedir."
        />
        <TextComponent
          title="Kişisel Verilerin Paylaşılması"
          content="Kişisel verileriniz, yasal çerçevede ve faaliyetlerimiz ile bağlantılı olarak, sizlerin onayı alınarak, üçüncü kişilerle paylaşılmaktadır."
        />
      </div>
    </ServicesContainer>
  );
}

export default InformationSecurityPolicy;
