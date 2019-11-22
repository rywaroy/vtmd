import styles from './index.less';

/**
 * 金额格式转化
 */
export default function CurrencyFormatter(props) {
    const { className = '', ...other } = props;
    let txt = props.children;

    if (txt && !isNaN(txt)) {
        txt = _formater(Number(txt));
    }

    return <i className={`${styles.defaultWrapper} ${className}`} {...other}>{txt}</i>;
}

function _formater(val){
    val = val.toFixed(2);
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}