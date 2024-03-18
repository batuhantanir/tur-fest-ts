import React from 'react';
import ServicesContainer from '@/components/services/ServicesContainer';
import TextComponent from '@/components/services/TextComponent';
import { privacyPolicyData } from '@/mocks/servicesMocks';

function PrivacyPolicy() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 className="text-2xl font-medium">{privacyPolicyData.title}</h2>
        {privacyPolicyData.children.map((item, index) => (
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

export default PrivacyPolicy;
