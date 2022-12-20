
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { payoutList } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { Button,List,Typography } from 'antd';
import trans from '@/assets/trans.png'
import { downloadExl } from '@/utils/excle';

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

let columns: ProColumns<GithubIssueItem>[] = [
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
    proFieldProps:{
      showTime:{ format: 'HH:mm:ss' },
      format:"YYYY-MM-DD HH:mm:ss"
    },
    hideInTable:true
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const {initialState} =useModel('@@initialState')
  if(initialState){
    if(initialState.currentUser?.access==='admin'){
      columns=columns.concat([{
        title: '代理ID',
        dataIndex: 'agencyId',
        ellipsis: true,
        search: false,
      },
      {
        title: '代理费用',
        dataIndex: 'agencyFee',
        ellipsis: true,
        search: false,
        copyable: true,
      },
      {
        title: '平台费用',
        dataIndex: 'channelFee',
        ellipsis: true,
        search: false,
      }])
    }
  }
  const ExpandedRowRender=({record})=>{
    console.log(record)
    return <List
    
    bordered
    dataSource={
      [
        {key:'转账类型',value:record.payoutAccountType},
        {key:'转账对象名',value:record.payoutContactName},
        {key:'转账对象邮箱',value:record.payoutContactEmail},
        {key:'转账对象联系方式',value:record.payoutContact},
        {key:'转账对象vpa地址',value:record.payoutVpaAddress},
        {key:'转账时间',value:record.payoutTime}
      ]
    }
    renderItem={(item) => (
      <List.Item>
        <Typography.Text mark>{item.key}</Typography.Text>:<Typography.Text strong>{item.value}</Typography.Text> 
      </List.Item>
    )}
  />
  }

  
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      scroll={{ x: 1000 }}
      cardBordered
      expandable={{ expandedRowRender:(record)=><ExpandedRowRender record={record}></ExpandedRowRender> }}
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
      rowKey="id"
      // search={{
      //   labelWidth: 'auto',
      //   defaultCollapsed: false,
      // }}
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
      // dateFormatter="string"
      headerTitle="代付订单"
      dateFormatter={(value, valueType) => {
        console.log('====>', value, valueType);
        return value.format('YYYY-MM-DD HH:mm:ss');
      }}

      search={{
        defaultCollapsed: false,
        labelWidth: 'auto',
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <span>
            <Button
              key="out"
              onClick={async () => {
                const values = searchConfig?.form?.getFieldsValue();
                console.log(values);
                const data = await payoutList({
                  page: 1,
                  size: 10000000,
                  ...values
                })
                console.log(data.data)
                const keyMap = {}
                columns.forEach(item => {
                  keyMap[item.dataIndex || 'unknown'] = item.title;
                })
                const arr = data.data.map(item => {
                  const newObj = {}
                  Object.keys(item).forEach(key => {
                    if (keyMap[key]) {
                      newObj[keyMap[key]] = item[key]
                    } else {
                      newObj[key] = item[key]
                    }
                  })
                  return newObj
                })
                downloadExl(arr, 'xlsx', '代付订单')
                console.log(values)
              }}
            >
              导出

            </Button><a id="hf" style={{ display: 'none' }}></a></span>,
        ],
      }}

      
    />
  );
};