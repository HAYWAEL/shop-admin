import { Button, Space, Drawer, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown, BetaSchemaForm, } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { addAgency, agency, updateMerchant, rechargeMerchant, channel as fetchChannel } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';

import Channel from './components/ChannelM';

type GithubIssueItem = {
    "id": number;//8805,
    "agencyName": number;//0,
    "createTime": string;//"2022-08-04 10:26:09",
    "remark": string;//""
};

type FormDrawerProps = {
  title: string,
  open: boolean,
  onClose: () => void,
  columns: ProFormColumnsType[],
  submit?: (params: any) => Promise<any> | null,
  callback?: () => void,
  initValue?: any,
  key?: string
}

const FormDrawer: React.FC<FormDrawerProps> = ({ title, open, onClose, columns, submit, callback, initValue = {}, key }) => {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  const [submiting, setSubmiting] = useState(false)

  return <Drawer
    title={title}
    width={720}
    placement='left'
    closable
    onClose={onClose}
    open={open}
    bodyStyle={{ paddingBottom: 80 }}
    key={key || initValue.id || 'create'}
  // extra={
  //   <Space>
  //     <Button onClick={onClose}>Cancel</Button>
  //     <Button onClick={onClose} type="primary">
  //       Submit
  //     </Button>
  //   </Space>
  // }
  >
    <BetaSchemaForm
      rowProps={{
        gutter: [16, 16],
      }}
      initialValues={initValue}
      colProps={{ span: 14, offset: 4 }}
      grid={layoutType !== 'LightFilter' && layoutType !== 'QueryFilter'}
      onFinish={async (values) => {
        if (submit) {
          await submit({ ...initValue, ...values })
          if (callback) callback()
        }
        onClose()
      }}
      columns={columns}
    />
  </Drawer >
}



export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [currentItem, setCurrentItem] = useState({ open: false, merchantId: '', title: '',channelList:[] })
  const [formState, setFormState] = useState<FormDrawerProps>({
    title: '',
    open: false,
    onClose: () => { setFormState({ ...formState, open: false }) },
    columns: [],

  })

  const [channelList,setChannelList] =useState([])

 useEffect(()=>{
  const getList=async ()=>{
    const data=await fetchChannel({page:1,size:999})
    setChannelList(data.data)
  }
  getList()
 },[])



  const changeStatus = async (record) => {
    await updateMerchant({
      ...record,
      status: record.status === 0 ? 1 : 0
    })
    if (formRef.current) {
      formRef.current.submit()
    }

  }

  const add = () => {
    const columns: ProFormColumnsType[] = [
      {
        title: '代理名称',
        dataIndex: 'agencyName',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
       
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      

    ];
    setFormState({
      ...formState,
      title: '创建',
      open: true,
      columns,
      initValue: {},
      submit: addAgency,
      callback: () => {
        console.log('call', actionRef.current)
        if (formRef.current) {
          formRef.current.submit();
        }
      }
    })
  }



  const update = (record) => {
    const columns: ProFormColumnsType[] = [
      {
        title: '代收费率',
        dataIndex: 'settleRatio',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '代付费率',
        dataIndex: 'payoutRatio',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '代理id',
        dataIndex: 'agencyId',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '代理单笔',
        dataIndex: 'agencySingleTrans',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '代理费率',
        dataIndex: 'agencyRatio',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '平台费率',
        dataIndex: 'channelRatio',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '平台费',
        dataIndex: 'channelFee',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: 'ips',
        dataIndex: 'ips',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },

    ];
    setFormState({
      ...formState,
      title: '编辑',
      open: true,
      columns,
      initValue: record,
      submit: updateMerchant,
      callback: () => {
        console.log('call', actionRef.current)
        if (formRef.current) {
          formRef.current.submit();
        }
      }
    })

  }

  const recharge = (record) => {
    const columns: ProFormColumnsType[] = [
      {
        title: '充值金额',
        dataIndex: 'amount',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '到账金额',
        dataIndex: 'ramount',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '商户费率',
        dataIndex: 'payoutRatio',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        fieldProps: {
          disabled: true
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },


    ];
    setFormState({
      ...formState,
      title: '充值',
      open: true,
      columns,
      initValue: { ...record, merchantId: record.id },
      submit: rechargeMerchant,
      key: 're' + record.id,
      callback: () => {
        console.log('call', actionRef.current)
        if (formRef.current) {
          formRef.current.submit();
        }
      }
    })

  }

  const channel = (record) => {
    setCurrentItem({
      open: true,
      merchantId: record.id,
      title: '商户通道',
      channelList
    })
  }


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      ellipsis: true,
      search: false,
    },
    {
      title: '代理名称',
      dataIndex: 'agencyName',
      ellipsis: true,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      search: false,
    },

  ];

  return (
    <div>


      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter, params);
          const data = await agency({
            page: params.current,
            size: params.pageSize,
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
            optionRender: false,
            collapsed: false,
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
        headerTitle="代理管理"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={add}>
            新建
          </Button>,
        ]}
      />
      <FormDrawer {...formState} />
    </div>
  );
};