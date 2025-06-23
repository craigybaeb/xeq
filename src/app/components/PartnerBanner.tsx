'use client';

import React from 'react';
import { Carousel, Typography } from 'antd';
import partners from '@/data/partners';

const { Text } = Typography;

const PartnerBanner: React.FC = () => {
  return (
    <div style={{ marginTop: '3rem' }}>
      <Carousel
        autoplay
        arrows
        autoplaySpeed={5000}
        dots={true}
        effect="scrollx"
      >
        {partners.map((partner, idx) => (
          <div key={idx}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 160,
                width: '100%',
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  maxHeight: 100,
                  objectFit: 'contain',
                  marginBottom: '0.5rem',
                }}
              />
              <Text type="secondary" style={{ fontSize: 14 }}>
                {partner.name}
              </Text>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PartnerBanner;
