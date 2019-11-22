import { CurrencyFormatter } from '@/components';

export function listFilter(_self) {
    return [
        {
            type: 'input',
            name: 'realName',
            label: '司机姓名'
        },
        {
            type: 'input',
            name: 'partyName',
            label: '传化会员名'
        },
    ];
}

export function listColumn(_self) {
    return [
        {
            title: '司机姓名',
            dataIndex: 'realName',
            key: 'realName',
        },
        {
            title: '传化会员名',
            dataIndex: 'partyName',
            key: 'partyName',
        },
        {
            title: '账户余额',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>,
            sorter: true,
        },
        {
            title: '消费金额',
            dataIndex: 'consumeAmount',
            key: 'consumeAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>,
            sorter: true,
        },
        {
            title: '订单数',
            dataIndex: 'consumeCnt',
            key: 'consumeCnt',
            sorter: true,
        },
        {
            title: '加油量（L）',
            dataIndex: 'consumeQuantity',
            key: 'consumeQuantity',
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => {
                return (
                    <div>
                        <a className="mr10" href={`/boss/#/order/list?driverRealName=${record.realName}`} target="_blank">订单</a>
                        <a className="mr10" href={`/boss/#/assign/driver?inMan=${record.realName}`} target="_blank">企业司机分配记录</a>
                    </div>
                );
            }
        },
    ];
}
