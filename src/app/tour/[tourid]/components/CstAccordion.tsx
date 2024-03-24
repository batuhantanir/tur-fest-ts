import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TourPlan } from '@/types/tour';

interface CstAccordionProps {
  tour_plan: Array<TourPlan>;
}

function convertKeywordsToString(keywords: string[]) {
  return keywords.map((keyword, idx) =>
    keywords.length - 1 !== idx ? keyword + ', ' : keyword
  );
}

function CstAccordion({ tour_plan }: CstAccordionProps) {
  return (
    <div className="mb-16">
      <Accordion type="single" collapsible className="w-full">
        {tour_plan.map((item, index) => (
          <AccordionItem key={index} value={(index + 1).toString()}>
            <AccordionTrigger>
              <div className="text-left">
                <span>{index + 1 + '. GÜN: '}</span>
                <span className="font-normal">
                  {convertKeywordsToString(item.keywords)}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-3">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CstAccordion;
