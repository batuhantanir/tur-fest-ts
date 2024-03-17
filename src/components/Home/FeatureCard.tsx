import { cardsData } from '@/mocks/featureData';
import { IconType } from 'react-icons';

interface CardProps {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}

function FeatureCard() {
  return (
    <div className="bg-cst-primary">
      <div className="flex flex-col items-center lg:flex-row cards-center justify-center gap-5 md:container py-10 mx-auto">
        {(cardsData as CardProps[]).map((card) => (
          <div
            key={card.id}
            className="group flex cards-center gap-4 py-5 px-8 items-center justify-center max-w-[500px] text-white"
          >
            <span
              className={`text-6xl group-hover:scale-105 group-hover:rotate-6 transition-all duration-200`}
            >
              {card.icon && <card.icon />}
            </span>
            <span className="flex flex-col gap-2 border-l pl-3 ">
              <p className="text-xl">{card.title}</p>
              <p className="text-base text-lightgrey">{card.description}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCard;
