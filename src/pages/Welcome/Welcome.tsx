import { PageContainer } from '@ant-design/pro-components';
import { useModel,useRequest } from '@umijs/max';
import { Card, theme } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { homeIndex,merchantBanlance } from '@/services/ant-design-pro/api';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip,Statistic } from 'antd';
import Table from './table';

import numeral from 'numeral';




const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};



const IntroduceRow = ({ loading, visitData={} ,isAdmin }: { loading: boolean; visitData:API.HomeIndex }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <Card
        loading={loading}
      >
        <Statistic
            title="今日代收"
            value={visitData.payinToday}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix=""
          />
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        loading={loading}
      >
        <Statistic
            title="今日代付"
            value={visitData.payoutToday}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            suffix=""
          />
      </Card>
    </Col>
    <Col {...topColResponsiveProps}>
      <Card
        loading={loading}
      >
        <Statistic
            title="代付余额"
            value={visitData.payoutBanlance}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            suffix=""
          />
      </Card>
    </Col>
    {isAdmin&& <Col {...topColResponsiveProps}>
      <Card
        loading={loading}
      >
        <Statistic
            title="商户账户余额"
            value={visitData.merchantBanlance}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix=""
          />
      </Card>
    </Col>}
   

    
  </Row>
);



const Welcome: React.FC = () => {
  const { data, error, loading } = useRequest(homeIndex);
  const {initialState:{currentUser}} =useModel('@@initialState');
  console.log(currentUser,'-----currentUser')
  return (
    <PageContainer>
      <IntroduceRow loading={loading} visitData={data} isAdmin={currentUser.access}/>
      <Table/>
    </PageContainer>
  );
};

export default Welcome;
