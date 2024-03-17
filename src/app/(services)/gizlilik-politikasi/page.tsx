import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';

function PrivacyPolicy() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 className="text-2xl font-medium">Gizlilik Politikası</h2>
        <TextComponent
          title="Satın Alma İşlem Güvenliği ve SSL Sertifikası"
          content="Sitemizde kredi kartınızla yapacağınız tüm işlemleriniz GeotrustRapidSSL sertifikasıyla güvence altına alınmıştır. Kart bilgileriniz 2048 bit koruma ile şifrelenerek iletilmektedir. SSL (Secure Soket Layer) bağlantısının hangi durumda aktif olduğunu, sipariş işlemleri sırasında kart bilgilerinizi girdiğiniz sayfamıza geçtiğiniz sırada, tarayıcınızın adres çubuğunun hemen yanında görüntülenecek olan kilit simgesinden anlayabilirsiniz.Kredi Kartı bilgilerinizi girdiğiniz sayfanın sağ alt köşesinde bulunan kilit resmi bu sayfanın SSL ile şifrelendiğini gösterir ve üzerine tıkladığınızda şifrelemenin hangi firmaya ait olduğunu belirtir. Web sitemize kayıt olurken kullandığınız üyelik ve kişisel bilgileriniz gizli tutulmakta olup sizin onayınız dışında hiç kimseyle paylaşılamaz. SSL yazılımları, müşteri-işletme-banka arasındaki bilgi akışının, çözülme ihtimali matematiksel olarak çok düşük ve teknik açıdan zor olan 2048 bit teknolojileriyle şifreli olarak yapılmasını sağlamaktadır."
        />
        <TextComponent
          title="Cookie'ler ve Diğer Teknolojiler"
          content="Turfest.com web sitesi, online servisleri, interaktif uygulamaları, e-posta mesajları ve reklamları, cookie'leri ve diğer teknolojileri kullanabilmektedir. Bu teknolojiler size en kaliteli hizmeti sağlamak, davranışlarınızı daha iyi anlamak ve hizmetlerimizi daha kolay sunmak amacıyla kullanılmaktadır.Cookie'ler ve diğer teknolojiler web sitemizi ziyaret ettiğiniz zaman kişisel bilgilerinizi anımsatır. Bununla amacımız size kullanım kolaylığı sağlamak, vermiş olduğunuz siparişlere ulaşabilmenizi sağlamak ve bir sonraki ziyaretinizde sizi ve kişisel bilgilerinizi anımsayarak size daha özel bir hizmet sunabilmektir. İstenildiği takdirde cookie'leri bilgisayarınızdan silebilir ya da engelleyebilirsiniz.Cookie'ler kullanıcı davranışlarını anlamak, üyelerimizin web sitemizin hangi bölümlerini ziyaret ettiklerini göstermekte reklamların ve web aramalarının etkinliğini ölçmektedir. TURFEST.COM, bu bilgileri pazarlama ve reklam hizmetlerinde de kullanabilecektir."
        />
        <TextComponent
          title="Kişisel Bilgilerin Kullanımı"
          content="TURFEST.COM, gerekli gördüğünde kullanıcıların kişisel bilgilerini yapılan işlemlerle ilgili olarak veya işbirliği içinde olduğu kişiler tarafından doğrudan pazarlama yapmak amacıyla kullanabilir. Site tarafından talep edilen bilgiler veya kullanıcı tarafından sağlanan bilgiler veya site üzerinden yapılan işlemlerle ilgili bilgiler, TURFEST.COM ve işbirliği içinde olduğu kişiler tarafından, site'nin üyeleri ve işletmeler ile yaptığı sözleşmeler ile belirlenen amaçlar ve kapsam dışında olsa dahi, kullanıcının kimliği ifşa edilmeden, çeşitli istatistiksel değerlendirmeler yapmak, veritabanı oluşturmak veya pazar araştırmaları yapmak için kullanılabilir.5651 sayılı kanun gereği, hizmet ve içerikleri barındıran sistemi sağlayan ve işleten kişi olarak, sistemle ilgili sorunların tanımlanması ve site'de çıkabilecek sorunların giderilebilmesi için, TURFEST.COM gerektiğinde kullanıcıların IP adreslerini tespit etmekte ve bunu kullanmaktadır. IP adresleri, kullanıcıları genel bir şekilde tanımlamak ve kapsamlı demografik bilgi toplamak amacıyla da kullanılabilir.TURFEST.COM, site dâhilinde başka sitelere link verebilir. TURFEST.COM, link vasıtasıyla erişilen sitenin gizlilik uygulamaları ve içeriklerine yönelik herhangi bir sorumluluk taşımamaktadır."
        />
      </div>
    </ServicesContainer>
  );
}

export default PrivacyPolicy;
