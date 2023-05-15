class Utils{
static getDynamicTableProps(tableProps) {
    const { columns, fields } = tableProps;
    let { scroll } = tableProps;
    let width = 0;
    const filteredColumns = fields.length === 0 ? columns : [];
    if (fields.length > 0) {
        each(columns, column => {
            if (fields.includes(column.dataIndex)) {
                filteredColumns.push(column);
                width += column.width ? column.width : 100;
            }
        });
    }

    if (scroll) {
        scroll.x = width > scroll.x ? scroll.x : width; 
    } else {
        scroll = {
            x: width,
            y: '50vh'
        };
    }

    return { columns: filteredColumns, scroll };
}
}
export default Utils;






