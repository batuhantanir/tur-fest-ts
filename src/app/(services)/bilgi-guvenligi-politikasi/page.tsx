import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';

import { InformationSecurityPolicyData } from '@/mocks/servicesMocks';

function InformationSecurityPolicy() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 id="title" className="text-2xl font-medium">
          {InformationSecurityPolicyData.title}
        </h2>
        <p className="text-sm">{InformationSecurityPolicyData.description}</p>
        {InformationSecurityPolicyData.children.map((item, index) => (
          <TextComponent
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </ServicesContainer>
  );
}

export default InformationSecurityPolicy;
