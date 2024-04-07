import CampaignTours from '@/components/Home/CampaignTours';
import CustomerReviews from '@/components/Home/CustomerReviews';
import Faq from '@/components/Home/Faq';
import FeatureCard from '@/components/Home/FeatureCard';
import HighlightsTours from '@/components/Home/HighlightsTours';
import SearchBar from '@/components/Home/Searchbar';
import Slider from '@/components/Home/Slider';

function App() {
  return (
    <div className="">
      <Slider />
      <SearchBar />
      <CampaignTours />
      <FeatureCard />
      <HighlightsTours />
      <CustomerReviews />
      <Faq />
    </div>
  );
}

export default App;
