
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Button } from 'antd';
import { statisticPayout } from '@/services/ant-design-pro/api';
import { downloadExl } from '@/utils/excle';

type GithubIssueItem = {

  "date": "2022-08-01",
    "channelId":number;// 161,
    "merchantId": number;//10005,
    "orderAmount":number;// 677710,
    "orderFee": number;//3660,
    "agencyIdFee": number;//3660,
    "channelFee":number;// 3660,
    "profit": number;//""
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '结算日期',
    dataIndex: 'date',
    ellipsis: true,
    valueType: 'dateRange',
    search: {
      transform: (value: any) => ({ start: value[0], end: value[1] }),
    },
    render:(text,record)=>{
      return record.date
    },
    proFieldProps:{
      showTime:{ format: 'HH:mm:ss' },
      format:"YYYY-MM-DD HH:mm:ss"
    },
  },
  {
    title: '通道编号',
    dataIndex: 'channelId',
    ellipsis: true,
  },
  {
    title: '商户编号',
    dataIndex: 'merchantId',
    ellipsis: true,
    copyable: true,
    
  },
  {
    title: '订单金额',
    dataIndex: 'orderAmount',
    ellipsis: true,
    search: false,
  },
  {
    title: '订单手续费',
    dataIndex: 'orderFee',
    ellipsis: true,
    search: false,
    copyable: true,
  },
  {
    title: '代理费用',
    dataIndex: 'agencyIdFee',
    ellipsis: true,
    search: false,
  },
  {
    title: '通道费用',
    dataIndex: 'channelFee',
    ellipsis: true,
    search: false,
  },
  
  {
    title: '利润',
    dataIndex: 'profit',
    ellipsis: true,
    search: false,
  },
  {
    title: '代理ID',
    dataIndex: 'agencyId',
    ellipsis: true,
    search: false,
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
        if(!params.start) return {
          data: [],
          success: true,
          total: 0
        }
        const data = await statisticPayout({
          page: params.current,
          size: params.pageSize,
          ...params
        })
        return {
          data: data,
          success: true,
          total: data.length
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
      // search={{
      //   labelWidth: 'auto',
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
                const data = await statisticPayout({
                  page: 1,
                  size: 10000000,
                  ...values
                })
                console.log(data)
                const keyMap = {}
                columns.forEach(item => {
                  keyMap[item.dataIndex || 'unknown'] = item.title;
                })
                const arr = data.map(item => {
                  const newObj = {}
                  Object.keys(item).forEach(key => {
                    if (keyMap[key]) {
                      newObj[keyMap[key]] = item[key]
                    } else {
                      // newObj[key] = item[key]
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