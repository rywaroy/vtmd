import { CurrencyFormatter } from '@/components';
import { Account_FundFlow_Type, Account_FundFlow_Direction } from '@/lib/enum';

export function listFilters(_self) {
    return [
        {
            type: 'input',
            name: 'fundFlowCode',
            label: '账户交易流水号',
        },
        {
            type: 'select',
            name: 'fundFlowType',
            label: '交易类型',
            initialValue: '',
            selectOptions: Account_FundFlow_Type,
        },
        {
            type: 'select',
            name: 'direction',
            label: '资金方向',
            initialValue: '',
            selectOptions: Account_FundFlow_Direction,
        },
        {
            type: 'input',
            name: 'inMan',
            label: '收款方',
        },
        {
            type: 'input',
            name: 'outMan',
            label: '付款方',
        },
        {
            type: 'rangepicker',
            name: 'transactionsTime',
            label: '交易时间',
            initialValue: [],
        },
    ];
}


export function listColumn(_self) {
    return [
        {
            title: '交易时间',
            dataIndex: 'gmtFundFlow',
        },
        {
            title: '账户交易流水号',
            dataIndex: 'fundFlowCode',
        },
        {
            title: '交易类型',
            dataIndex: 'fundFlowType',
        },
        {
            title: '金额',
            dataIndex: 'assignAmount',
            render(assignAmount) {
                return <CurrencyFormatter>{assignAmount}</CurrencyFormatter>;
            },
        },
        {
            title: '资金方向',
            dataIndex: 'direction',
        },
        {
            title: '交易后账户余额',
            dataIndex: 'myRestBalance',
            render(myRestBalance) {
                return <CurrencyFormatter>{myRestBalance}</CurrencyFormatter>;
            },
        },
        {
            title: '收款方',
            dataIndex: 'inMan',
        },
        {
            title: '付款方',
            dataIndex: 'outMan',
        },
    ];
}
