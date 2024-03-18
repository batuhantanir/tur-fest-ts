import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';
import { ourServicesData } from '@/mocks/servicesMocks';

function OurServices() {
  return (
    <div>
      <ServicesContainer>
        <div className="py-2 space-y-4">
          <h2 className="text-2xl font-medium">{ourServicesData.title}</h2>
          {ourServicesData.children.map((item, index) => (
            <TextComponent
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </ServicesContainer>
    </div>
  );
}

export default OurServices;
