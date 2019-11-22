import { CurrencyFormatter } from '@/components';
import { Oil_Name } from '@/lib/enum';

export function listFilter(_self) {
    return [
        {
            type: 'rangepicker',
            name: 'time',
            label: '创建时间',
            props: {
                showTime: false,
                format: 'YYYY-MM-DD'
            },
        },
        {
            type: 'input',
            name: 'consumePlaceName',
            label: '加油站名称'
        },
        {
            type: 'input',
            name: 'consumeOrderNo',
            label: '订单编号'
        },
        {
            type: 'select',
            name: 'consumeGoods',
            label: '油品名称',
            selectOptions: [{ value: '', label: '全部' }].concat(Oil_Name)
        },
        {
            type: 'numrange',
            name: 'price',
            label: '订单金额（实付）'
        },
    ];
}

export function listColumn(_self) {
    return [
        {
            title: '订单编号',
            dataIndex: 'consumeOrderNo',
            key: 'consumeOrderNo',
        },
        {
            title: '油品名称',
            dataIndex: 'consumeGoods',
            key: 'consumeGoods',
        },
        {
            title: '客户姓名',
            dataIndex: 'driverRealName',
            key: 'driverRealName',
        },
        {
            title: '手机号',
            dataIndex: 'driverPhone',
            key: 'driverPhone',
        },
        {
            title: '加油站名称',
            dataIndex: 'consumePlaceName',
            key: 'consumePlaceName',
        },
        {
            title: '订单金额',
            dataIndex: 'listingConsumeAmount',
            key: 'listingConsumeAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>
        },
        {
            title: '订单金额（实付）',
            dataIndex: 'consumeAmount',
            key: 'consumeAmount',
            render: number => <CurrencyFormatter>{number}</CurrencyFormatter>
        },
        {
            title: '加油量（L）',
            dataIndex: 'consumeQuantity',
            key: 'consumeQuantity',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <a className="mr10" href={`/boss/#/order/detail?consumeOrderNo=${record.consumeOrderNo}`} target="_blank">详情</a>
                );
            }
        },
    ];
}