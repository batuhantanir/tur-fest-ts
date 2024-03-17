import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';

function OurServices() {
  return (
    <div>
      <ServicesContainer>
        <div className="py-2 space-y-4">
          <h2 className="text-2xl font-medium">Hizmetlerimiz - Turfest</h2>
          <TextComponent
            title="🌄Türkiye'nin Doğal ve Tarihi Güzelliklerini Keşfedin: Unutulmaz Yolculuklar"
            content="Türkiye'nin muhteşem doğal güzellikleri, zengin tarihi ve kültürel mirasıyla dolu yerlerine ulaşmak için hazır mısınız? Turfest'in özel olarak düzenlenmiş turlarıyla, Türkiye'nin en çarpıcı noktalarını keşfedin."
          />
          <TextComponent
            title="🏞️ Doğal Harikalarıyla Dolu Rotalar"
            content="Ege'nin turkuaz suları, Akdeniz'in altın kumsalları ve Karadeniz'in yeşil yaylaları sizi bekliyor. Doğanın muhteşem güzelliklerini keşfedin ve nefes kesen manzaraların keyfini çıkarın."
          />
          <TextComponent
            title="🚗 Konforlu Taşımacılık"
            content="Tatilinizin keyfini çıkarın ve konforlu taşımacılık hizmetlerimizle rahat edin. Modern araçlarımız ve profesyonel sürücülerimizle, seyahatinizi keyifli hale getirin."
          />
          <TextComponent
            title="🏨 Konforlu Konaklama"
            content="Tatilinizin her anını konforlu bir şekilde geçirin. Turfest'in özenle seçilmiş otelleri ve konaklama yerleriyle, rahatınızı düşünün."
          />
          <TextComponent
            title="🏰 Tarihi ve Kültürel Yerler"
            content="Binlerce yıllık tarih ve kültürle dolu yerler arasında kaybolun. Göbeklitepe'den Efes'e, Kapadokya'dan Safranbolu'ya kadar, Türkiye'nin zengin tarih ve kültür mirasını keşfedin."
          />
          <TextComponent
            title="🌇 Renkli Şehir ve Kasabalar"
            content="İstanbul'un eşsiz atmosferi, İzmir'in canlı sokakları ve Antalya'nın turkuaz koyları sizi bekliyor. Renkli şehirlerde dolaşın, sevimli kasabaları ziyaret edin."
          />
        </div>
      </ServicesContainer>
    </div>
  );
}

export default OurServices;
