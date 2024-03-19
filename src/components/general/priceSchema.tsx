import { cn } from '@/lib/utils';
import { Price } from '@/types/tour';
interface PriceSchemaProps {
  price: Price;
  flex?: boolean;
  discountStyle?: string;
  reverse?: boolean;
}

function PriceSchema({
  price,
  flex,
  discountStyle,
  reverse,
}: PriceSchemaProps) {
  const convertTL = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price / 100);
  };

  return (
    <>
      {price.campaign_exists ? (
        <div className={`${flex && 'flex gap-2'}`}>
          <div className={`flex flex-col ${reverse && 'order-2'}`}>
            <span className="text-sm line-through text-muted-foreground">
              {convertTL(price.normal_price)}
            </span>
            <span className="">{convertTL(price.last_price)}</span>
          </div>
          <div
            className={cn(
              'h-fit w-fit border-[1.5px] border-dashed py-0.5 px-1 border-cst-primary bg-cst-primary/10 text-cst-primary text-sm',
              discountStyle
            )}
          >
            {price.campaign_discount + '% indirim'}
          </div>
        </div>
      ) : (
        <span>{convertTL(price.last_price)}</span>
      )}
    </>
  );
}

export default PriceSchema;
