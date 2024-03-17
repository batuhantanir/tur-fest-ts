import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/mocks/faq';

interface ItemProps {
    question: string;
    answer: string;
}

function Faq() {
  return (
    <div className="py-8 space-y-8 md:container md:mx-auto">
      <h1 className="text-center text-xl font-extrabold">
        Sıkça Sorulan Sorular
      </h1>
      <div className="flex justify-center">
        <Accordion type="single" collapsible className="w-[90%] md:w-2/3">
          {(faqData as ItemProps[]).map((item, index) => (
            <AccordionItem key={index} value={item.question}>
              <AccordionTrigger className=" text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pl-1 sm:pl-3">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
