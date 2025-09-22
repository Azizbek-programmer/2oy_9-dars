import { memo, useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Card,
  Typography,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Switch,
  Select,
} from "antd";
import { usePhone } from "../api/hooks/usePhone";
import type { FieldType } from "../types";

const { Title } = Typography;
const { Option } = Select;

const Phones: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getPhone, createPhone, deletePhone, updatePhone } = usePhone();
  const { data, isLoading } = getPhone();
  const [editingItem, setEditingItem] = useState<FieldType | null>(null);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (editingItem) {
        await updatePhone.mutateAsync({ id: editingItem.id, body: values });
      } else {
        await createPhone.mutateAsync(values);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      form.resetFields();
    } catch (err) {
      console.error("Saqlashda xatolik:", err);
    }
  };

  const handleUpdate = (item: FieldType) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg mb-6">
        <Title level={3}>Phones CRUD</Title>
        <Button
          type="primary"
          onClick={() => {
            setEditingItem(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          + Add Phone
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {data?.map((i: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={i.id}>
            <Card
              hoverable
              cover={
                <img
                  src={i.image || "https://via.placeholder.com/150"}
                  alt={i.title || "Phone"}
                  className="object-cover h-52 w-full"
                />
              }
            >
              <h3 className="text-lg font-semibold">{i.title}</h3>
              <p className="text-gray-600">
                {i.price ? `$${i.price}` : "No price"}
              </p>
              <p>{i.isDeliver ? "Delivery ✅" : "Delivery ❌"}</p>

              {i.memoriys && i.memoriys.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {i.memoriys.map((m: string) => (
                    <span
                      key={m}
                      className="bg-slate-200 px-3 py-1 text-xs rounded-xl"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button danger block onClick={() => deletePhone.mutate(i.id)}>
                  Delete
                </Button>
                <Button block onClick={() => handleUpdate(i)}>
                  Update
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onOk={() => form.submit()}
        title={editingItem ? "Update Phone" : "Add Phone"}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ isDeliver: false, memoriys: [] }}
        >
          <Form.Item<FieldType>
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone title" />
          </Form.Item>

          <Form.Item<FieldType>
            name="price"
            label="Price"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone price" />
          </Form.Item>

          <Form.Item<FieldType> name="image" label="Image URL">
            <Input placeholder="\" />
          </Form.Item>

          <Form.Item<FieldType> name="memoriys" label="Memories">
            <Select mode="multiple" allowClear placeholder="Choose memories">
              <Option value="128">128</Option>
              <Option value="256GB">256GB</Option>
              <Option value="512GB">512GB</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="isDeliver"
            label="Delivery"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {isLoading && <h2>Loading...</h2>}
    </div>
  );
};

export default memo(Phones);
