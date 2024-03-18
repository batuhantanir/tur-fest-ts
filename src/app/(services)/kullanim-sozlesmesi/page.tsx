import ServicesContainer from '@/components/services/ServicesContainer';
import React from 'react';
import TextComponent from '@/components/services/TextComponent';
import { userAgreementData } from '@/mocks/servicesMocks';

function UserAgreement() {
  return (
    <ServicesContainer>
      <div className="py-2 space-y-4 ">
        <h2 className="text-2xl font-medium">{userAgreementData.title}</h2>
        <p className="text-sm">{userAgreementData.description}</p>
        {userAgreementData.children.map((item, index) => (
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

export default UserAgreement;
