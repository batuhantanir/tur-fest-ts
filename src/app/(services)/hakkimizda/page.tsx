import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import Link from 'next/link';
import { aboutUsData } from '@/mocks/servicesMocks';

function AboutUs() {
  return (
    <ServicesContainer>
      <div className="py-2">
        <h2 className="text-2xl font-medium mb-4">{aboutUsData.title}</h2>
        <p className="text-sm">{aboutUsData.description}</p>
        <h3 className="text-2xl font-medium mt-6 mb-4">
          {aboutUsData.subTitle}
        </h3>
        <ul className="list-disc ">
          {aboutUsData.children.map((item, index) => (
            <li className="list-item list-none">
              <p className="font-medium mt-3 ">
                <span>•</span> <span> {item.title}</span>
              </p>
              <p className="">{item.content}</p>
              {item.contact && (
                <Link href={item.contact?.href} className="flex gap-2">
                  <span className="font-medium">{item.contact?.title} </span>
                  <span>{item.contact?.description}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </ServicesContainer>
  );
}

export default AboutUs;
