import { Carousel, Spin } from 'antd';
import React from 'react';

import Container from '@/components/container';
import { isEqual } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';

import s from './index.less';

interface BannerItemProps {
  image: string;
  background?: string;
}

interface BannerProps {
  data: BannerItemProps[];
  loading?: boolean;
}

const SpinLoading = <LoadingOutlined spin />;

const BannerItem: React.FC<BannerItemProps> = React.memo(
  ({ image, background }) => {
    const wrapperStyle: React.CSSProperties = {};
    const style: React.CSSProperties = {
      backgroundImage: `url(${image})`,
    };

    if (background) {
      wrapperStyle.background = background;
    }

    return (
      <div style={wrapperStyle}>
        <Container>
          <div className={s.bannerItem} style={style} />
        </Container>
      </div>
    );
  },
  isEqual,
);

const Banner: React.FC<BannerProps> = ({ data, loading }) => {
  return (
    <Spin
      tip="正在获取资源"
      indicator={SpinLoading}
      wrapperClassName={s.loading}
      spinning={!!loading}
    >
      <div className={s.banner}>
        <Carousel effect="fade" autoplay>
          {data.map((props, index: number) => (
            <BannerItem key={`homepage_banner_item_${index}`} {...props} />
          ))}
        </Carousel>
      </div>
    </Spin>
  );
};

export default Banner;
