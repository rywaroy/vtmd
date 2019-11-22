
export function listFilterGas(_self) {
    return [
        {
            type: 'select',
            name: 'name',
            label: '加油站名称',
            models: ['name', 'name'],
            selectOptions: _self.props.gasStationAccount.gasStationList,
            props: {
                showSearch: true,
                filterOption: (input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                },
            },
        },
        {
            type: 'select',
            name: 'status',
            label: '结算油费警戒状态',
            selectOptions: [
                { value: '正常', label: '正常' },
                { value: '警戒', label: '警戒' },
            ],
        },
    ];
}

export function listColumnGas(_self) {
    return [
        {
            title: '加油站名称',
            dataIndex: 'name',
        },
        {
            title: '销售额',
            dataIndex: 'salesAmount',
        },
        {
            title: '结算油费余额',
            dataIndex: 'settlementBalance',
        },
        {
            title: '结算油费警戒状态',
            dataIndex: 'status',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <a className="mr10" href={`/boss/#/order/list?consumePlaceName=${record.name}`} target="_blank">订单</a>
                        <a className="mr10" href="javascript:;" onClick={() => {_self.openModal(record.stationId);}}>添加结算油费</a>
                    </div>
                );
            }
        },
    ];
}

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

export function modalFormGas(_self) {
    return [
        {
            type: 'input',
            name: 'stationId',
            colClass: 'hide',
            initialValue: _self.props.gasStationAccount.stationId,
            span: 24,
            formItemLayout,
        },
        {
            type: 'inputnumber',
            name: 'amount',
            label: '结算油费',
            rules: [
                { required: true, message: '请输入结算油费' },
            ],
            props: {
                precision: 2,
                style: {
                    width: '200px'
                }
            },
            span: 24,
            formItemLayout,
        }
    ];
}


export function listFilterOil(_self) {
    return [
        {
            type: 'select',
            name: 'name',
            label: '加油站名称',
            models: ['name', 'name'],
            selectOptions: _self.props.gasStationAccount.gasStationList,
            props: {
                showSearch: true,
                filterOption: (input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                },
            },
        },
    ];
}

export function listColumnOil(_self) {
    return [
        {
            title: '加油站名称',
            dataIndex: 'name',
        },
        {
            title: '结算油费',
            dataIndex: 'amount',
        },
        {
            title: '添加时间',
            dataIndex: 'gmtCreate',
        },
    ];
}