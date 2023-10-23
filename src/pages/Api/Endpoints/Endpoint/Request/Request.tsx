import { observer } from "mobx-react-lite";
import React from "react";
import TableKeyValue from "../../../../../components/TableKeyValue/TableKeyValue";

type Props = {
    store: any;
};

const Request = observer(({ store }: Props) => {
    return (
        <React.Fragment>
            <TableKeyValue
                store={store}
                type="Query parameters"
                dataSource={store.tableDataQuery}
            />

            <TableKeyValue
                store={store}
                type="Headers"
                dataSource={store.tableDataHeaders}
            />

            <TableKeyValue
                store={store}
                type="Variables"
                dataSource={store.tableVariables}
            />
        </React.Fragment>
    );
});

export default Request;
