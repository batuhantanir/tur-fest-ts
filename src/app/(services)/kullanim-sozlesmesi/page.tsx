import ServicesContainer from '@/components/services/ServicesContainer';
import React from 'react';
import TextComponent from '@/components/services/TextComponent';

function UserAgreement() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 className="text-2xl font-medium">Kullanım Sözleşmesi - Turfest</h2>
        <p className="text-sm">
          Turfest Turizm Seyahat Acentesi olarak, müşteri memnuniyeti ve
          güvenliği bizim için en önemli konudur. Bu kapsamda, kişisel
          verilerinizin korunmasına yönelik olarak aşağıda belirtilen
          politikaları uygulamaktayız.
        </p>
        <TextComponent
          title="WEB SİTESİ KULLANIM KOŞULLARI: Turfest.com"
          content="Siteye erişiminizden veya siteyi kullanımınızdan önce lütfen bu sözleşmeyi dikkatle okuyunuz. Siteye erişmekle veya siteyi kullanmakla, aşağıda belirtilen şartlar ve hükümlerle bağlı olmayı kabul etmektesiniz. TURFEST TURİZM VE TİCARET A.Ş. bu sözleşmede her zaman değişiklik yapabilir ve bu değişiklikler değiştirilmiş sözleşmenin siteye konulmasıyla derhal yürürlük kazanır. Siz bu değişikliklerden haberdar olmak amacıyla periyodik olarak sözleşmeyi gözden geçirmeyi kabul etmektesiniz ve siteye devam eden erişiminiz veya devam eden siteyi kullanımınız değiştirilmiş sözleşmeyi kesin olarak kabul ettiğiniz anlamına gelecektir."
        />
        <TextComponent
          title="Telif hakları ve ticari markalar"
          content="www.tur-fest.com sitesinin tüm hakları TURFEST TURİZM VE TİCARET A.Ş.ne aittir. Bu web sayfalarında yayımlanan örneğin yazılım, ürünler, logolar, v.s. gibi ticari markalar, bilgiler, raporlar, resimler, grafikler vb.. içerikler, ulusal ve uluslar arası kanunlar ve uluslar arası sözleşmeler ile korunmaktadır. www.tur-fest.com ‘da yer alan her türlü bilgilerin ve materyallerin tamamı ya da bir bölümü revize edilerek, ekleme yapılarak ya da bir kısmı değiştirilerek farklı bir biçimde kullanılamaz. www.tur-fest.com‘da yer alan ifadeler içerisindeki 3. kişi ya da kurumlara ait tescilli marka, hizmet, logo vb. uyarılar ve ayraçlar, siteden alıntı yapıldığında kaldırılamaz."
        />
        <TextComponent
          title="Üçüncü parti sitelere verilen bağlantılar"
          content="www.tur-fest.com, sitesinde direkt ya da dolaylı yoldan diğer sitelere bağlantı(link) verilebilir. Bu bağlantıların amacı bilgi vermek ya da reklamdır. Kullanıcının bu linklere bağlantı yapıp yapmaması tamamen kendi inisiyatifindedir. Bu nedenle  Kullanıcı, site üzerindeki linklerin kaynakları üzerinde www.tur-fest.com'un hiçbir kontrolü olmadığı için, www.tur-fest.com'un linklerinin gösterdiği web sitelerinin veya kaynakların ulaşabilirliğinden sorumlu olmadığını ve bu web siteleri ve kaynaklar üzerinde bulunan veya bunlardan elde edilebilen hiçbir içerik, reklam, ürün veya diğer materyalden sorumlu olmadığını kabul eder. Kullanıcı ayrıca www.tur-fest.com'un böyle herhangi bir web sitesi veya kaynak üzerinde veya bunlar yoluyla elde edilebilen herhangi bir içerik, mal veya hizmete güvenerek veya bunlar tarafından veya bunların kullanımı ile bağlantılı olarak neden olunan ya da neden olunduğu iddia edilen herhangi bir zarar veya kayıptan doğrudan veya dolaylı olarak sorumlu olmadığını kabul eder."
        />
        <TextComponent
          title="Kullanıcı bilgileri"
          content="www.tur-fest.com sitesinde; kullanıcıların dolduracakları talep ve rezervasyon formlarının yer aldığı bölümler yer almaktadır. Bu bölümlerin doldurulması esnasında kullanıcıların küfür, tehdit, tahrik, rahatsız edici sözleri ve kanuna aykırı içerikler kullanma ve başkalarının kanuni ve kişisel haklarına zarar verme hakları yoktur. Ayrıca bu formların kopyalanarak kullanılmaları veya yeniden üretilmek amacıyla örnek olarak kullanılmaları yasaktır. Kullanıcılarının bu sayfaları kullanarak bir ürün ya da hizmet satma, ticari amaçlı reklam yapma ve benzeri ticari davranışlarda bulunma hakları yoktur. Üyelik ve rezervasyon işlemleri gerçekleştirirken verilen bilgiler 256 Bit SSL güvenlik sistemiyle korunmaktadır. Kullanıcı bilgilerinin gizliliği ile ilgili ayrıntılar için “Gizlilik Sözleşmesi” sayfasını inceleyebilirsiniz."
        />
        <TextComponent
          title="Kullanıcı yükümlülükleri"
          content="www.tur-fest.com her an güncellenen bir site olmasına karşın, site üzerindeki tesis/tur bilgileri, fiyatlar, ödeme koşulları ve kampanyalar temsilidir. Tipografik ya da geç güncellemelerden kaynaklanan eksik ya da hatalardan TURFEST TURİZM VE TİCARET A.Ş. sorumlu tutulamaz. Yapılan rezervasyonlarda her ürün ve ürün sağlayıcının kendi koşulları geçerlidir. Kullanıcı, bu ürünlerden herhangi birine rezervasyon yaptırmak isterse, rezervasyon yaptırdığı ürünün ait olduğu ürün sağlayıcının rezervasyon anındaki koşullarını kabul etmiş sayılır."
        />
      </div>
    </ServicesContainer>
  );
}

export default UserAgreement;
