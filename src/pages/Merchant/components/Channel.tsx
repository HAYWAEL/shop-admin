import { Button, Space, Drawer, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown, BetaSchemaForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { addMerchantChannel, merchantChannel, updateMerchantChannel, rechargeMerchant } from '@/services/ant-design-pro/api';

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



export default ({ merchantId,channelList }) => {
    console.log(channelList,'-----------')
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
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
            id:record.id,
            status: record.status === 0 ? 1 : 0
        })
        if (formRef.current) {
            formRef.current.submit()
        }
    }
    const deleteItem = async (record) => {
        await updateMerchantChannel({
            id:record.id,
            valid:  0
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
                title: '通道',
                dataIndex: 'payChannelId',
                valueType: 'select',
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '此项为必填项',
                        },
                    ],
                },
                fieldProps:{
                    options:channelList.map(item=>({
                        value: item.id,
                        label: item.name,
                      }))
                },
                width: 'xl',
                colProps: {
                    xs: 24,
                    md: 24,
                },
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
            initValue: {merchantId},
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
            title: '商户号',
            dataIndex: 'merchantId',
            ellipsis: true,
            search: false,
        },
        {
            title: '通道',
            dataIndex: 'payChannelId',
            ellipsis: true,
            search: false,
        },
        {
            title: '状态',
            dataIndex: 'status',
            // ellipsis: true,
            search: false,
            render: (text, record) => <> <Switch checked={text === 1 ? true : false} checkedChildren="1" unCheckedChildren="0" onChange={() => { changeStatus(record) }} /> </>
        },
        {
            title: '日限额',
            dataIndex: 'dayPayLimit',
            ellipsis: true,
            search: false,
        },
        {
            title: '类型',
            dataIndex: 'payType',
            ellipsis: true,
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
              <Button
                key="editable"
                danger
                type='primary'
                onClick={() => { deleteItem(record) }}
              >
            删除
              </Button>,
              
      
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
                    const data = await merchantChannel({
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
                headerTitle="商户通道"
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