import { Button, Modal, Drawer, Switch } from 'antd';
import { ShareAltOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown, BetaSchemaForm, } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { addMerchant, merchant, updateMerchant, rechargeMerchant, channel as fetchChannel } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';

import Channel from './components/Channel';

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
  const [currentItem, setCurrentItem] = useState({ open: false, merchantId: '', title: '', channelList: [] })
  const [formState, setFormState] = useState<FormDrawerProps>({
    title: '',
    open: false,
    onClose: () => { setFormState({ ...formState, open: false }) },
    columns: [],

  })

  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const data = await fetchChannel({ page: 1, size: 999 })
      setChannelList(data.data)
    }
    getList()
  }, [])



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
        title: '????????????',
        dataIndex: 'settleRatio',
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
        dataIndex: 'payoutRatio',
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
        title: '??????id',
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
        title: '????????????',
        dataIndex: 'payoutSingleTrans',
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
        title: '????????????',
        dataIndex: 'agencySingleTrans',
        formItemProps: {

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
        title: '????????????',
        dataIndex: 'agencyRatio',
        formItemProps: {

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
      // {
      //   title: '????????????',
      //   dataIndex: 'channelRatio',
      //   formItemProps: {

      //   },
      //   width: 'xl',
      //   colProps: {
      //     xs: 24,
      //     md: 24,
      //   },
      //   valueType: 'digit',
      //   fieldProps: {
      //     precision: 3,
      //     max: 1,
      //     min: 0
      //   },
      // },
      // {
      //   title: '?????????',
      //   dataIndex: 'channelFee',
      //   formItemProps: {

      //   },
      //   width: 'xl',
      //   colProps: {
      //     xs: 24,
      //     md: 24,
      //   },
      // },
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
      title: '??????',
      open: true,
      columns,
      initValue: {},
      submit: addMerchant,
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
        title: '????????????',
        dataIndex: 'settleRatio',
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
        dataIndex: 'payoutRatio',
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
        title: '??????id',
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
        title: '????????????',
        dataIndex: 'payoutSingleTrans',
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
        title: '????????????',
        dataIndex: 'agencySingleTrans',
        formItemProps: {

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
        title: '????????????',
        dataIndex: 'agencyRatio',
        formItemProps: {

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
        dataIndex: 'channelRatio',
        formItemProps: {

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
        title: '?????????',
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
      title: '??????',
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
      
      // {
      //   title: '????????????',
      //   dataIndex: 'ramount',
      //   formItemProps: {
      //     rules: [
      //       {
      //         required: true,
      //         message: '??????????????????',
      //       },
      //     ],
      //   },
      //   valueType: 'money',
      //   width: 'xl',
      //   colProps: {
      //     xs: 24,
      //     md: 24,
      //   },
      //   dependencies: ['amount'],
      //   fieldProps: (form) => {
      //     const amount = form.getFieldValue('amount');
      //     const rate = form.getFieldValue('payoutRatio');
      //     form.setFieldValue('ramount',amount * rate,);
      //     return {
      //       placeholder: '',
      //       value: amount * rate,
      //       disabled:true
      //     };
      //   },
      // },
      // {
      //   title: '????????????',
      //   dataIndex: 'payoutRatio',
      //   formItemProps: {
      //     rules: [
      //       {
      //         required: true,
      //         message: '??????????????????',
      //       },
      //     ],
      //   },
      //   fieldProps: {
      //     disabled: true
      //   },
      //   width: 'xl',
      //   colProps: {
      //     xs: 24,
      //     md: 24,
      //   },
      // },
      {
        title: '????????????',
        valueType: 'money',
        dataIndex: 'amount',
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
        title: '??????',
        dataIndex: 'remark',
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


    ];
    setFormState({
      ...formState,
      title: '??????',
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
      title: '????????????',
      channelList
    })
  }

  const ShowDetai=(record)=>{
    Modal.info({
      title: '????????????',
      content: (
        <div>
          <p>????????????: {window.location.origin}</p>
          <p>????????????: {record.merchantName}</p>
          <p>????????????: {record.appBg}</p>
          <p>??????ID: {record.id}</p>
          <p>????????????: {record.appSecret}</p>
          <p>?????????????????????????????????,??????????????????????????????????????????ip?????????</p>

        </div>
      ),
      onOk() {},
    });
  }


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '?????????',
      dataIndex: 'id',
      ellipsis: true,
      render:(text,record)=>(<a onClick={()=>ShowDetai(record)}>{record.id}<ShareAltOutlined /></a>)
    },
    {
      title: '??????????????????',
      dataIndex: 'merchantName',
      ellipsis: true,
      search: false,
    },
    {
      title: '??????',
      dataIndex: 'status',
      // ellipsis: true,
      search: false,
      render: (text, record) => <> <Switch checked={text === 1 ? true : false} checkedChildren="??????" unCheckedChildren="??????" onChange={() => { changeStatus(record) }} /> </>
    },
    {
      title: '????????????',
      dataIndex: 'settleRatio',
      ellipsis: true,
      search: false,
    },
    {
      title: '????????????',
      dataIndex: 'payoutSingleTrans',
      ellipsis: true,
      search: false,
    },
    {
      title: '????????????',
      dataIndex: 'payoutRatio',
      ellipsis: true,
      search: false,
    },
    {
      title: '??????id',
      dataIndex: 'agencyId',
      ellipsis: true,
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
        <a key="view" onClick={() => { recharge(record) }}>
          ??????
        </a>,
        <a key="view" onClick={() => { channel(record) }}>
          ??????
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
          const data = await merchant({
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

      <Drawer open={currentItem.open} title={currentItem.open} key={currentItem.merchantId} width={900} placement='left'
        closable onClose={() => { setCurrentItem({ ...currentItem, open: false }) }}>
        <Channel {...currentItem}></Channel>
      </Drawer>
    </div>
  );
};