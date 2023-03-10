import { Button, Space, Drawer, Switch } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormColumnsType, ProFormLayoutType, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown, BetaSchemaForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { addMerchantChannel, channelMerchant, updateMerchantChannel, rechargeMerchant } from '@/services/ant-design-pro/api';

type GithubIssueItem = {
    "id": number;//999,
    "merchantName": string;//"sh999",
    "settleRatio": number;//0.08,
    "payoutRatio": number;//0.03,
    "createTime": string;//"2022-07-11 15:05:29",
    "updateTime": string;//"2022-07-11 15:05:29",
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



export default ({ channelId }) => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [formState, setFormState] = useState<FormDrawerProps>({
        title: '',
        open: false,
        onClose: () => { setFormState({ ...formState, open: false }) },
        columns: [],

    })

    const valueEnum = {
        ??????: { text: '??????', status: 'Default' },
        ??????: { text: '??????', status: 'Default' },
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
                title: '??????',
                dataIndex: 'payType',
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
                valueType: 'select',
                valueEnum
            },
            {
                title: '??????',
                dataIndex: 'payChannelId',
                valueType: 'select',
                formItemProps: {
                    rules: [
                        {
                            required: true,
                            message: '??????????????????',
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
                title: '?????????',
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
                title: '????????????',
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
                title: '????????????',
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
            {
                title: '????????????',
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
                title: '????????????',
                dataIndex: 'ramount',
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
                dataIndex: 'payoutRatio',
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


    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '?????????',
            dataIndex: 'merchantName',
            ellipsis: true,
            search: false,
        },
        {
            title: '????????????',
            dataIndex: 'settleRatio',
            ellipsis: true,
            search: false,
        },
        {
            title: '????????????',
            dataIndex: 'payoutRatio',
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
                    const data = await channelMerchant({
                        page: params.current,
                        size: params.pageSize,
                        channelId,
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
                    // ??????????????? transform????????????????????????????????????????????????????????????
                }}
                pagination={{
                    pageSize: 10,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="????????????"
               
            />
            <FormDrawer {...formState} />
        </div>
    );
};