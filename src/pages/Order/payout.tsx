
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { payoutList } from '@/services/ant-design-pro/api';

type GithubIssueItem = {

  "id": number;//4582889393390592,
  "merchantId": number;//10005,
  "merchantPayoutId": "7_16595994623442",
  "payoutAccountType": "vpa",
  "payoutContactName": "MIRTHIPATI ESWARARAO",
  "payoutContactEmail": "Merchant.acemagic@gmail.com",
  "payoutContact": "9912206983",
  "payoutVpaAddress": "9912206983@upi",
  "channelId": number;//161,
  "channelType": number;//5,
  "channelPayoutId": "656420732",
  "status": number;//2,
  "amount": number;//950.00,
  "fee": number;//0.00,
  "agencyId": number;//0,
  "agencyIdFee": number;//0.00,
  "channelFee": number;//0.00,
  "tax": number;// 0.00,
  "createTime": "2022-08-04 13:21:02",
  "payoutTime": "2022-08-04 13:21:03",
  "pushStatus": number;//1,
  "pushTime": "2022-11-23 21:08:28",
  "merchantNotifyUrl": "http://65.2.30.0:7311/ldy/payout",
  "remark": "DISABLED_MODE",
  "payoutType": number;//0,
  "ip": "65.2.30.0",
  "detail": "MIRTHIPATI ESWARARAO"
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '订单id',
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: '商户id',
    dataIndex: 'merchantId',
    ellipsis: true,
  },
  {
    title: '商户订单号',
    dataIndex: 'merchantPayoutId',
    ellipsis: true,
    copyable: true,
    
  },
  {
    title: '转账类型',
    dataIndex: 'payoutAccountType',
    ellipsis: true,
    search: false,
  },
  {
    title: '渠道平台订单号',
    dataIndex: 'channelPayoutId',
    ellipsis: true,
    search: false,
    copyable: true,
  },
  {
    title: '订单创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    search: false,
  },
  {
    title: '渠道编号',
    dataIndex: 'channelId',
    ellipsis: true,
    
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: { text: '已提现', status: 'Success', },
      2: {
        text: '待提现',
        status: 'Processing',

      },
      3: {
        text: '已解决',
        status: 'Error',
      },
    },
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    ellipsis: true,
    search: false,
  },
  {
    title: '订单手续费',
    dataIndex: 'fee',
    ellipsis: true,
    search: false,
  },
  {
    title: '推送状态',
    dataIndex: 'pushStatus',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: { text: '已推送', status: 'Success', },
      2: {
        text: '未推送',
        status: 'Processing',

      },
      3: {
        text: '推送失败',
        status: 'Error',
      },
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    
  },
  {
    title: '时间',
    dataIndex: 'payoutTime',
    ellipsis: true,
    valueType: 'dateRange',
    search: {
      transform: (value: any) => ({ start: value[0], end: value[1] }),
    },
    hideInTable:true

    
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter, params);
        const data = await payoutList({
          page: params.current,
          size: params.pageSize,
          opt: params.admin || '',
          ...params
        })
        return {
          data: data.data,
          success: true,
          total: data.total
        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="created_at"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="代付订单"
    />
  );
};