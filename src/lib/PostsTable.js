// DOCS: https://ant.design/components/table/
import { Table } from 'antd';
import { memo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// RENDER POST USER NAME, TITLE AND BODY
const PostsTable = ({ records, onRecordsChange }) => {
  useEffect(() => {
    if (records?.length) onRecordsChange(uuidv4());
  }, [records, onRecordsChange]);

  return (
    <Table className="table" dataSource={records} rowKey="id" pagination={{ pageSize: 8 }}>
      <Table.Column title="User Name" dataIndex="userName" width={200} />
      <Table.Column title="Title" dataIndex="title" />
      <Table.Column title="Body" dataIndex="body" />
    </Table>
  );
};

export default memo(PostsTable);
