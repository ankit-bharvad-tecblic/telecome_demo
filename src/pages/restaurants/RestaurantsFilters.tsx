import { Card, Col, Form, Input, Row, Select } from "antd";

type UsersFilterProps = {
  children?: React.ReactNode;
};
const RestaurantsFilter = ({ children }: UsersFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={20}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="q">
                <Input.Search allowClear={true} placeholder="Search" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={4} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default RestaurantsFilter;
