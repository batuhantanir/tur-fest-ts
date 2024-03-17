export type Tour = {
  id: string;
  name: string;
  description: string;
  price: Price;
  category: Category;
  vehicle: string;
  reserved: number;
  quota: number;
  city: string;
  price_includes: string[];
  price_excludes: string[];
  tour_plan: Array<TourPlan>;
  begin_date: string;
  end_date: string;
  images: string[];
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  campaign: string;
};

export type TourPlan = {
  keywords: string[];
  description: string;
  _id: string;
};

export type Category = {
  parent_category: string;
  sub_category: string;
};

export type Price = {
  normal_price: number;
  last_price: number;
  campaign_discount: number;
  campaign_exists: boolean;
};

export interface NextPageProps<SlugType = string> {
  params: { tourid: SlugType };
  //searchParams?: { [key: string]: string | string[] | undefined };
}
