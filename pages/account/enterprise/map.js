import { CurrencyFormatter } from '@/components';

export function listFilter(_self) {
    return [
        {
            type: 'input',
            name: 'departmentName',
            label: '企业名称'
        },
        {
            type: 'rangepicker',
            name: 'time',
            label: '时间',
            props: {
                showTime: false,
                format: 'YYYY-MM-DD'
            },
        }
    ];
}

export function listColumn(_self) {
    return [
        {
            title: '企业名称',
            dataIndex: 'departmentName',
            width: 300,
            render(text) {
                return (
                    <div className="ellipsis" style={{ width: '300px' }} title={text}>{text}</div>
                );
            },
        },
        {
            title: '传化会员名',
            dataIndex: 'partyName',
            key: 'partyName',
        },
        {
            title: '充值金额',
            dataIndex: 'depositAmount',
            key: 'depositAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>,
            sorter: true,
        },
        {
            title: '消费金额',
            dataIndex: 'oilConsumeMoney',
            key: 'oilConsumeMoney',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>,
            sorter: true,
        },
        {
            title: '账户余额',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>,
            sorter: true,
        },
        {
            title: '订单数',
            dataIndex: 'oilConsumeCnt',
            key: 'oilConsumeCnt',
            sorter: true,
        },
        {
            title: '加油量（L）',
            dataIndex: 'oilConsumeMl',
            key: 'oilConsumeMl',
        },
        {
            title: '操作',
            key: 'action',
            width: 320,
            render: (text, record) => {
                return (
                    <div>
                        <a className="mr10" href={`/boss/#/account/enterprise/order?departmentId=${record.departmentId}&depositEntityName=${record.departmentName}`} target="_blank">订单</a>
                        <a className="mr10" href={`/boss/#/finance/recharge?depositEntityName=${record.departmentName}`} target="_blank">充值记录</a>
                        <a className="mr10" href={`/boss/#/assign/driver?outMan=${record.departmentName}`} target="_blank">企业司机分配记录</a>
                        <a className="mr10" href={`/boss/#/account/enterprise/detail?departmentId=${record.departmentId}`} target="_blank">账户明细</a>
                    </div>
                );
            }
        },
    ];
}
