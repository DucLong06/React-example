import { observer } from "mobx-react-lite";
import React from "react";
import TableKeyValue from "../../../../../components/TableKeyValue/TableKeyValue";

type Props = {
    store: any;
};

const Response = observer(({ store }: Props) => {
    return (
        <TableKeyValue
            store={store}
            type="Headers"
            dataSource={store.tableDataHeadersResponse}
        />
    );
});

export default Response;
