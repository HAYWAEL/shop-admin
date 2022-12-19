import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import { homeIndex,merchantBanlance } from '@/services/ant-design-pro/api';
import request from 'umi-request';

type GithubIssueItem = {
  merchantId: string;
  channelId: number;
  amount: number;
  
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '商户ID',
    dataIndex: 'merchantId',
    ellipsis: true,
  },
  {
    title: '通道Id',
    dataIndex: 'channelId',
    ellipsis: true,
  },
  {
    title: '金额',
    dataIndex: 'amount',
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
        console.log(sort, filter,params);
        const data= await merchantBanlance({
          page:params.current,
          size:params.pageSize,
          ...params
        })
        return {
          data:data.data,
          success:true,
          total:data.total
        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="merchantId"
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
      headerTitle="商户余额明细"
    />
  );
};