'use client';
import CampaignTours from '@/components/Home/CampaignTours';
import CustomerReviews from '@/components/Home/CustomerReviews';
import Faq from '@/components/Home/Faq';
import FeatureCard from '@/components/Home/FeatureCard';
import HighlightsTours from '@/components/Home/HighlightsTours';
import SearchBar from '@/components/Home/Searchbar';
import withAuth from '@/components/withAuth';

function App() {
  return (
    <div className="">
      <SearchBar />
      <HighlightsTours />
      <FeatureCard />
      <CampaignTours />
      <CustomerReviews />
      <Faq />
    </div>
  );
}

export default withAuth(App, 'all');
