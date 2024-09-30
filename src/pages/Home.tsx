import {
  Badge,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
// import LocalStorageService from "../services/localStorageService";
import { useAuthStore, User } from "../store";
// import Icon from "@ant-design/icons";
// import { useAuthStore } from "../store";
// import { ComponentType, useState } from "react";
const { Title } = Typography;

// xs: <576px (extra small, mobile)
// sm: ≥576px (small, tablet)
// md: ≥768px (medium, small desktop)
// lg: ≥992px (large desktop)
// xl: ≥1200px (extra-large desktop)

// const list = [
//   {
//     OrderSummary: "Peperoni, Margarita ...",
//     address: "Bandra, Mumbai",
//     amount: 1200,
//     status: "preparing",
//     loading: false,
//   },
//   {
//     OrderSummary: "Paneer, Chicken BBQ ...",
//     address: "Balurghat, West bengal",
//     amount: 2000,
//     status: "on the way",
//     loading: false,
//   },
//   {
//     OrderSummary: "Paneer, Chicken BBQ ...",
//     address: "Balurghat, West bengal",
//     amount: 2000,
//     status: "on the way",
//     loading: false,
//   },
//   {
//     OrderSummary: "Paneer, Chicken BBQ ...",
//     address: "Balurghat, West bengal",
//     amount: 2000,
//     status: "on the way",
//     loading: false,
//   },
//   {
//     OrderSummary: "Paneer, Chicken BBQ ...",
//     address: "Balurghat, West bengal",
//     amount: 2000,
//     status: "on the way",
//     loading: false,
//   },
//   {
//     OrderSummary: "Paneer, Chicken BBQ ...",
//     address: "Balurghat, West bengal",
//     amount: 2000,
//     status: "on the way",
//     loading: false,
//   },
// ];

// const dumyDetails: unknown = {
//   partnerName: "Esther Howard",
//   contactNumber: "(406) 555-0120",
//   email: "esther.howard@example.com",
//   address: "4517 Washington Ave. Manchester, 39495",
//   walletBalance: 15.0,
//   currentStatus: "Active",
//   lastLogin: "August 15, 2024, 01:00 pm",
// };

//
const dumyDetails: unknown = {
  accountNumber: "DEF2305000004",
  accountName: "Besmira Kuqi", //Partner Name done
  phoneNumber: "355222255555", //Contact Number // done
  email: "mailto:besmira.kuqi@one.al", //Email done
  accountType: "RESELLER", //Account Type // done
  partnerType: "L4 EXCLUSIVE", //Partner Type
  accountStatusId: "ACS01", //Status    ACS01-- ActiveXObject, Deactivate
  walletBalance: 15.0,

  accountId: "ACC000009692", //Account Id

  userName: "def2305000004",
  systemGenrated: "N",
  tenantArea: "Default", // x
  parentAccountNumber: "1-WYHVOB0",
};

// interface CardTitleProps {
//   title: string;
//   PrefixIcon: ComponentType<unknown>;
// }

// const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
//   return (
//     <Space>
//       <Icon component={PrefixIcon} />
//       {title}
//     </Space>
//   );
// };

function Home() {
  const { user, setUser } = useAuthStore();
  const [form] = Form.useForm();
  const [addToWalletform] = Form.useForm();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [modal1Open, setModal1Open] = useState(false);
  const [details, setDetails]: any = useState({
    partnerName: "",
    contactNumber: "",
    email: "",
    address: "",
    walletBalance: "",
    currentStatus: "",
    lastLogin: "",
  });

  const onFinish = (values: unknown) => {
    console.log(values);
    setDetails(dumyDetails);
    form.resetFields();
  };

  interface WalletDetails {
    walletBalance: number;
  }

  const addToWallet = ({ amount }: { amount: number }) => {
    if (!user) {
      alert("User not found");
      return;
    }

    const { balance } = user;

    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }

    // Update user's balance
    const updatedUser: User = {
      ...user,
      balance: balance - amount,
    };

    // Update state and modal
    setUser(updatedUser);
    setModal1Open(true);

    // Update wallet details
    setDetails((prev: WalletDetails) => ({
      ...prev,
      walletBalance: Number(prev.walletBalance) + amount,
    }));

    // Reset the form
    addToWalletform.resetFields();
  };

  const searchBtnWidth = () => {
    if (screens.xs) return "100%";
    if (screens.xl) return "15%";
    if (screens.lg) return "15%";
    if (screens.md) return "23%";
    if (screens.sm) return "25%";
    return "15%";
  };

  const getFontSize = () => {
    if (screens.xs) return "18px";
    if (screens.sm) return "22px";
    if (screens.md) return "32px";
    if (screens.lg) return "36px";
    return "32px";
  };

  return (
    <div>
      <Title level={2} style={{ margin: "20px 2px" }}>
        Partner Admin
      </Title>
      <Card bordered={true}>
        <Form
          form={form}
          name="layout-multiple-vertical"
          layout="vertical"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Row gutter={[24, 8]}>
            <Col xs={24} sm={24} lg={12} md={12} xl={12}>
              <Form.Item
                layout="vertical"
                label="Partner Name"
                name="partner_name"
                rules={[
                  {
                    required: false,
                    validator: (_, value, callback) => {
                      if (!value && !form.getFieldValue("Partner ID")) {
                        callback("Please fill in at least one field.");
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input size="large" placeholder="Enter partner name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12} md={12} xl={12}>
              <Form.Item
                layout="vertical"
                label="Partner ID"
                name="Partner ID"
                rules={[
                  {
                    required: false,
                    validator: (_, value, callback) => {
                      if (!value && !form.getFieldValue("partner_name")) {
                        callback("Please fill in at least one field.");
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input size="large" placeholder="Enter partner ID" />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px 0px",
            }}
          >
            <Button
              style={{
                width: searchBtnWidth(),
              }}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Search
            </Button>
          </div>
        </Form>
      </Card>

      {/* details */}
      <Card style={{ margin: "20px 0px" }} bordered={true}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={24} md={24} lg={12}>
            <Title level={2}>Details</Title>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Partner Name:{"  "}
              <div style={{ fontWeight: "lighter" }}>
                {"  "}
                {details.accountName}
              </div>
            </Title>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Contact Number:{"  "}
              <div style={{ fontWeight: "lighter" }}>{details.phoneNumber}</div>
            </Title>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Email:{"  "}
              <div style={{ fontWeight: "lighter" }}>{details.email}</div>
            </Title>
            {/* <Title
              level={4}
              style={{ display: "flex", gap: "3px", fontSize: getFontSize() }}
            >
              Address:{" "}
              <div style={{ fontWeight: "lighter" }}>{details.address}</div>
            </Title> */}
            <Title
              level={4}
              style={{ display: "flex", gap: "3px", fontSize: getFontSize() }}
            >
              Account Type:{"  "}
              <div style={{ fontWeight: "lighter" }}>{details.accountType}</div>
            </Title>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Wallet Balance:{"  "}
              <div style={{ fontWeight: "lighter" }}>
                {`${details.walletBalance ? "€" : ""}
                ${
                  parseFloat(details.walletBalance).toFixed(2) !== "NaN"
                    ? parseFloat(details.walletBalance).toFixed(2)
                    : ""
                }`}
              </div>
            </Title>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Partner Type:{"  "}
              <div style={{ fontWeight: "lighter" }}>{details.partnerType}</div>
            </Title>

            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Account Id:{"  "}
              <div style={{ fontWeight: "lighter" }}>{details.accountId}</div>
            </Title>
            <Title
              level={4}
              style={{ display: "flex", gap: "4px", fontSize: getFontSize() }}
            >
              Status :{"  "}
              <div style={{ fontWeight: "lighter" }}>
                {details.accountStatusId === "ACS01" ? (
                  <Badge status="success" text="Active" />
                ) : details.accountStatusId === "" ? (
                  <Badge status="error" text="Deactivate" />
                ) : (
                  ""
                )}
              </div>
            </Title>

            <Row justify="end">
              <Col xs={24} sm={7} md={6} lg={7} xl={7}>
                <Space
                  direction="vertical"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  {/* <Button type="primary" size="large" block>
                    Search
                  </Button> */}
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Add amount */}
      <Card bordered={true}>
        <Form
          form={addToWalletform}
          name="layout-multiple-vertical"
          layout="vertical"
          onFinish={addToWallet}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Row gutter={[24, 8]}>
            <Col xs={24} sm={24} lg={12} md={12} xl={8}>
              <Form.Item
                layout="vertical"
                label="Add Amount"
                name="amount"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input size="large" placeholder="Enter Amount" />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "30px 0px",
            }}
          >
            <Button
              style={{
                width: searchBtnWidth(),
              }}
              type="primary"
              disabled={details?.partnerName === ""}
              // onClick={() => addToWallet()}
              htmlType="submit"
              size="large"
            >
              Add to Wallet
            </Button>
          </div>
        </Form>
      </Card>
      <MyModal modal1Open={modal1Open} setModal1Open={setModal1Open} />
    </div>
  );
}

export default Home;

const MyModal = (props: any) => {
  const { modal1Open, setModal1Open } = props;
  return (
    <>
      <Modal
        // title="20px to Top"
        centered
        style={{ top: 20 }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
      >
        <Flex justify="center" align="center">
          <div>
            <img src="/assets/thanks.svg" width={300} height={300} />

            <Title
              style={{
                textAlign: "center",
                margin: "5px 0 0 0",
              }}
              level={2}
            >
              Thank You
            </Title>
            <Title
              style={{
                textAlign: "center",
                margin: "5px 0 0 0",
                fontWeight: "lighter",
              }}
              level={3}
            >
              Wallet has been updated
            </Title>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => setModal1Open(false)}
                style={{
                  width: "40%",
                  margin: "0",
                  textAlign: "center",
                }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                OK
              </Button>
            </div>
          </div>
        </Flex>
      </Modal>
    </>
  );
};

// {
//   "accountNumber": "DEF2305000004",
//   "accountName": "Besmira Kuqi", Partner Name
//   "accountType": "RESELLER", Account Type
//   "tenantArea": "Default", // x
//   "partnerType": "L4 EXCLUSIVE", Partner Type
//   "accountStatusId": "ACS01", Status    ACS01-- ActiveXObject, Deactivate
//   "accountId": "ACC000009692", Account Id
//   "userName": "def2305000004",
//   "systemGenrated": "N",
//   "phoneNumber": "355222255555", Contact Number
//   "email": "mailto:besmira.kuqi@one.al", Email
//   "parentAccountNumber": "1-WYHVOB0"
// }
