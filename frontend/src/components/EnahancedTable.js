import { Button, Col, Divider, Row, Space, Table, Tag, Typography } from "antd";
import { uniqueId } from "lodash";
import { useEffect, useState } from "react";
import Utils from "./utils";
import {
  CloudDownloadOutlined
} from "@ant-design/icons";

const EnhancedTable = (props) => {
  const [uid, setUid] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setUid(uniqueId('dd_'));
  }, []);

  useEffect(() => {
    if (!props.loading) {
      const drawerBody = document.querySelector(`.${uid} .ant-table-body`);
      if (drawerBody) {
        drawerBody.scrollTop = 0;
        drawerBody.scrollLeft = 0;
      }
    }
  }, [uid, props.loading]);

  const { columns, scroll } = Utils.getDynamicTableProps({...props, fields});
  const dynamicProps = {...props, columns, scroll, size: "medium" };
  return (
    <Table
      className={uid}
      title={() => (
        <Row justify="space-between" align="center" style={{ borderBottom: '1px #eee solid' }}>
          <Col>
            <Space align="center" style={{ height: 50 }}>
              <Typography.Text><Tag>Total of {props?.pagination?.total} records</Tag></Typography.Text>
            </Space>
          </Col>
          <Col>
            <Space align="center" split={<Divider type="vertical" />} style={{ height: 50 }}>
            </Space>
          </Col>
        </Row>
      )}
      {...dynamicProps}
    />
  );
}

export default EnhancedTable;
