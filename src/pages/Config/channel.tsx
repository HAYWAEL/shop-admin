import { Button, Space, Drawer, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown, BetaSchemaForm, } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { addMerchant, updateMerchant, switchChannel as channelSwitch, channel as fetchChannel, channelType, addChannel, updateChannel } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';

import ChannelM from './components/ChannelM';

type GithubIssueItem = {
  "id": number,
  "adminId": number,
  "merchantName": string,
  "appSecret": string;//"2jk8sTWQrj3uJYay",
  "appBg": string;//"lmFkSdhv",
  "appName": string;//"10",
  "status": string;//1,
  "settleRatio": string;// 0.07,
  "payoutRatio": string;//0.07,
  "addTime": string;//"2022-11-23 12:31:03",
  "username": string;//"sh10007",
  "agencyId": string;//0,
  "backstage": string;//"",
  "created_at": string;//"2022-11-23 12:31:03",
  "updated_at": string;//"2022-11-23 12:31:03"
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
  const [currentItem, setCurrentItem] = useState({ open: false, channelId: '', title: '', channelList: [] })

  const [channelTypes, setChannelType] = useState<{ value: string, label: string }[]>([])
  const [formState, setFormState] = useState<FormDrawerProps>({
    title: '',
    open: false,
    onClose: () => { setFormState({ ...formState, open: false }) },
    columns: [],

  })

  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const data = await channelType();
      console.log(data, 'data---')
      setChannelType(data.map(item => ({ label: item, name: item })))
      const data2 = await fetchChannel({
        page:1,size:1000000
      });
      console.log(data2, 'data---')
      setChannelList(data2.data.map(item => ({ label: item.name, name: item.id,value:item.id })))
    }
    getList()
  }, [])



  const changeStatus = async (record) => {
    await updateChannel({
      ...record,
      status: record.status === 0 ? 1 : 0
    })
    if (formRef.current) {
      formRef.current.submit()
    }

  }

  const add = () => {
    console.log(channelType, 'channelType')
    const columns: ProFormColumnsType[] = [
      {
        title: '??????????????????',
        dataIndex: 'type',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'select',
        fieldProps: {
          options: channelTypes
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '????????????',
        dataIndex: 'name',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
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
        title: '????????????',
        dataIndex: 'payType',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'select',
        fieldProps: {
          options: [{ value: '??????', label: '??????' }, { value: '??????', label: '??????' }, { value: '????????????', label: '????????????' }]
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '????????????',
        dataIndex: 'channelFee',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
        valueType: 'digit',
        fieldProps: {
          precision: 3,
          max: 1,
          min: 0
        },
      },
      {
        title: '????????????',
        dataIndex: 'channelSingleTrans',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'digit',
        fieldProps: {
          precision: 0,
          min: 0
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '??????????????????',
        dataIndex: 'extra',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },

      {
        title: '??????',
        dataIndex: 'remark',
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
      title: '??????',
      open: true,
      columns,
      initValue: {},
      submit: addChannel,
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
        title: '??????????????????',
        dataIndex: 'type',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'select',
        fieldProps: {
          options: channelTypes
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '????????????',
        dataIndex: 'name',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
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
        title: '????????????',
        dataIndex: 'payType',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'select',
        fieldProps: {
          options: [{ value: '??????', label: '??????' }, { value: '??????', label: '??????' }, { value: '????????????', label: '????????????' }]
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '????????????',
        dataIndex: 'channelFee',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
        valueType: 'digit',
        fieldProps: {
          precision: 3,
          max: 1,
          min: 0
        },
      },
      {
        title: '????????????',
        dataIndex: 'channelSingleTrans',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        valueType: 'digit',
        fieldProps: {
          precision: 0,
          min: 0
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },
      {
        title: '??????????????????',
        dataIndex: 'extra',
        formItemProps: {

        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
      },

      {
        title: '??????',
        dataIndex: 'remark',
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
      title: '??????',
      open: true,
      columns,
      initValue: record,
      submit: updateChannel,
      callback: () => {
        console.log('call', actionRef.current)
        if (formRef.current) {
          formRef.current.submit();
        }
      }
    })

  }

  const switchChannel = (record) => {
    const columns: ProFormColumnsType[] = [

      {
        title: '????????????',
        dataIndex: 'channelId',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
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
        title: '????????????',
        dataIndex: 'toChannelId',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '??????????????????',
            },
          ],
        },
        width: 'xl',
        colProps: {
          xs: 24,
          md: 24,
        },
        valueType:'select',
        fieldProps:{
          options:channelList
        }
      },


    ];
    setFormState({
      ...formState,
      title: '????????????',
      open: true,
      columns,
      initValue: { channelId: record.id },
      submit: channelSwitch,
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
      channelId: record.id,
      title: '????????????',
      channelList
    })
  }


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '??????????????????',
      dataIndex: 'type',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: channelTypes
      },

    },
    {
      title: '????????????',
      dataIndex: 'payType',
      ellipsis: true,
      search: false,
    },
    {
      title: '????????????',
      dataIndex: 'name',
      ellipsis: true,
      search: false,
    },
    // {
    //   title: '????????????',
    //   dataIndex: 'name',
    //   ellipsis: true,
    //   search: false,
    // },
    {
      title: '??????',
      dataIndex: 'status',
      // ellipsis: true,
      search: false,
      render: (text, record) => <> <Switch checked={text === 1 ? true : false} checkedChildren="??????" unCheckedChildren="??????" onChange={() => { changeStatus(record) }} /> </>
    },
    {
      title: '????????????',
      dataIndex: 'createTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '??????',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => { update(record) }}
        >
          ??????
        </a>,
        <a key="view" onClick={() => { channel(record) }}>
          ??????
        </a>,
        <a key="view" onClick={() => { switchChannel(record) }}>
          ????????????
        </a>,

      ],
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
          const data = await fetchChannel({
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
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // ??????????????? transform????????????????????????????????????????????????????????????
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="????????????"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={add}>
            ??????
          </Button>,
        ]}
      />
      <FormDrawer {...formState} />

      <Drawer open={currentItem.open} title={currentItem.open} width={900} placement='left'
        closable onClose={() => { setCurrentItem({ ...currentItem, open: false }) }} key={currentItem.channelId}>
        <ChannelM {...currentItem}></ChannelM>
      </Drawer>
    </div>
  );
};