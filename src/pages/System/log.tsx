
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { sysLog } from '@/services/ant-design-pro/api';

type GithubIssueItem = {
    admin: string;
    ip: number;
    type: number;
    action:string;
    status:string;
    result:string;
    comment:string;
    created_at:string
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '操作管理员',
    dataIndex: 'admin',
    ellipsis: true,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作时间',
    dataIndex: 'created_at',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作类别',
    dataIndex: 'type',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作动作',
    dataIndex: 'action',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作状态',
    dataIndex: 'status',
    ellipsis: true,
    search: false,
  },
  {
    title: '操作结果',
    dataIndex: 'result',
    ellipsis: true,
    search: false,
  },
  {
    title: '备注信息',
    dataIndex: 'comment',
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
        const data= await sysLog({
          page:params.current,
          size:params.pageSize,
          opt:params.admin||'',
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
      headerTitle="操作日志"
    />
  );
};