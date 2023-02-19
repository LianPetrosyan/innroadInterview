// DOCS: https://ant.design/components/form/
import { Button, Form, Input, Select } from 'antd';
import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddPost.css';

const AddPost = ({ users, onSubmit }) => {
  const [form] = Form.useForm();
  const handleSubmit = (formValues) => {
    form.resetFields();
    onSubmit({ ...formValues, id: uuidv4() });
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="form" layout="inline">
      <Form.Item label="User" name="userId" rules={[{ required: true }]}>
        <Select placeholder="Select a user">
          {users?.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Body" name="body" rules={[{ required: true }]}>
        <Input.TextArea className="body" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(AddPost);
