import { twMerge } from 'tailwind-merge';

interface PriceSchemaProps {
  tour: {
    price: {
      normal_price: number;
      last_price: number;
      campaign_discount: number;
      campaign_exists: boolean;
    };
  };
  flex?: boolean;
  discountStyle?: string;
}

function PriceSchema({ tour, flex, discountStyle }: PriceSchemaProps) {
  const convertTL = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(tour.price.last_price / 100);
  };

  return (
    <>
      {tour.price.campaign_exists ? (
        <div className={`${flex && 'flex gap-2'}`}>
          <div className="flex flex-col">
            <span className="text-sm line-through text-muted-foreground">
              {convertTL(tour.price.normal_price)}
            </span>
            <span className="">{convertTL(tour.price.last_price)}</span>
          </div>
          <div
            className={twMerge(
              'h-fit w-fit border-[1.5px] border-dashed py-0.5 px-1 border-cst-primary bg-cst-primary/10 text-cst-primary text-sm',
              discountStyle
            )}
          >
            {tour.price.campaign_discount + '% indirim'}
          </div>
        </div>
      ) : (
        <span>{convertTL(tour.price.last_price)}</span>
      )}
    </>
  );
}

export default PriceSchema;
