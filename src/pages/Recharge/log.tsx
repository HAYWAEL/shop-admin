import { Button, Space, Drawer, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, ProCard, BetaSchemaForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { addMerchantChannel, rechargeLog, rechargeLogS, updateMerchantChannel, rechargeMerchant } from '@/services/ant-design-pro/api';

type GithubIssueItem = {
  "id": number;// 8805,
  "merchantId": number;//10005,
  "type": number;//0,
  "amount": number;//1508326,
  "admin": string;//"Admin",
  "createTime": string;//"Admin", "2022-08-04 10:26:09",
  "payChannelId": string;//"Admin", 161,
  "remark": string;//"Admin",""
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
  const formRef2 = useRef<ProFormInstance>();
  const [formState, setFormState] = useState<FormDrawerProps>({
    title: '',
    open: false,
    onClose: () => { setFormState({ ...formState, open: false }) },
    columns: [],

  })

  const valueEnum = {
    代收: { text: '代收', status: 'Default' },
    代付: { text: '代付', status: 'Default' },
  };



  const changeStatus = async (record) => {
    await updateMerchantChannel({
      id: record.id,
      status: record.status === 0 ? 1 : 0
    })
    if (formRef.current) {
      formRef.current.submit()
    }
  }
  const deleteItem = async (record) => {
    await updateMerchantChannel({
      id: record.id,
      valid: 0
    })
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  const add = () => {
    const columns: ProFormColumnsType[] = [
      {
        title: '类型',
        dataIndex: 'payType',
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
        valueType: 'select',
        valueEnum
      },


      {
        title: '日限额',
        dataIndex: 'dayPayLimit',
        formItemProps: {

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
      title: '创建',
      open: true,
      columns,
      initValue: { merchantId },
      submit: addMerchantChannel,
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


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '商户Id',
      dataIndex: 'merchantId',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'type',
      ellipsis: true,
      search: false,
    },

    {
      title: '金额',
      dataIndex: 'amount',
      ellipsis: true,
      search: false,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      ellipsis: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ start: value[0], end: value[1] }),
      },
      render:(text,record)=>{
        console.log(record)
        return record.createTime
      }

      
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      search: false,
    },
  ];

  const columns2: ProColumns<GithubIssueItem>[] = [
   
    {
      title: '商户Id',
      dataIndex: 'merchantId',
      ellipsis: true,
      
    },
    {
      title: '操作',
      dataIndex: 'type',
      ellipsis: true,
      search: false,
    },

    {
      title: '金额',
      dataIndex: 'total_amount',
      ellipsis: true,
      search: false,
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      ellipsis: true,
      valueType: 'dateRange',
      hideInTable:true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      search: {
        transform: (value: any) => ({ start: value[0], end: value[1] }),
      },
    },
  ];

  const handleCount=()=>{
    if(formRef.current){
      console.log(formRef.current);
      const values=formRef.current.getFieldsValue();
      if(formRef2.current){
        formRef2.current.setFieldsValue(values)
        formRef2.current.submit()
      }
    }
  }

  return (
    <div>
      <ProCard split="vertical">
        <ProCard colSpan={16} ghost>
          <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            formRef={formRef}
            cardBordered
            request={async (params = {}, sort, filter) => {
              console.log(sort, filter, params);
              const data = await rechargeLog({
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
            rowKey="id"
            // search={{
            //   optionRender: false,
            //   collapsed: false,
            // }}
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 'auto',
              optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                <Button key="out" onClick={handleCount}>
                  统计
                </Button>,
              ],
            }}
            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            }}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="充值记录"
            toolBarRender={() => [

            ]}
          />
        </ProCard>
        <ProCard ghost >
          <ProTable<GithubIssueItem>
            columns={columns2}
            // actionRef={actionRef}
            formRef={formRef2}
            cardBordered
            request={async (params = {}, sort, filter) => {
              if(!params.start) return {
                data: [],
                success: true,
                total: 0
              }
              const data = await rechargeLogS({
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
            rowKey="id"
            // search={{
            //   optionRender: false,
            //   collapsed: false,
            // }}
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            search={{
              defaultCollapsed: false,
              labelWidth: 'auto',
              optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                
              ],
            }}
            form={{
              ignoreRules: false,
            }}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="统计数据"
            toolBarRender={() => [

            ]}
          />
        </ProCard>
      </ProCard>



      <FormDrawer {...formState} />
    </div>
  );
};