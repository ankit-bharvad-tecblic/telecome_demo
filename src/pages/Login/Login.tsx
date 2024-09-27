// import {
//   Layout,
//   Card,
//   Space,
//   Form,
//   Input,
//   Checkbox,
//   Button,
//   Flex,
//   Alert,
// } from "antd";
// import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
// import Logo from "../../components/icons/Logo";
// import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "../../types";
// import { login, self, logout } from "../../http/api";
// import { useAuthStore } from "../../store";
// import { usePermission } from "../../hooks/usePermission";
// import { Content } from "antd/es/layout/layout";

// import { login, self, logout } from "../../http/api";
import { useAuthStore } from "../../store";
// import { usePermission } from "../../hooks/usePermission";

import { Form, Input, Button, Row, Col, Typography, Space, Grid } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";

const { Title, Link } = Typography;

// dumy user credentials
const DUMY_USER_CREDENTIALS = {
  username: "DEF2112000010",
  password: "12345",
};

const Login = () => {
  // const { isAllowed } = usePermission();
  const { setUser } = useAuthStore();
  // const { setUser, logout: logoutFromStore } = useAuthStore();

  const loginUser = async (userData: Credentials) => {
    if (
      userData.username === DUMY_USER_CREDENTIALS.username &&
      userData.password === DUMY_USER_CREDENTIALS.password
    ) {
      const selfDataPromise = {
        data: {
          id: 1,
          name: "ankit",
          firstName: "ankit",
          lastName: "bharvad",
          email: "ankit@gmail.com",
          role: "manager",
        },
      };
      setUser(selfDataPromise?.data);
      <Navigate to="/" />;
    } else {
      alert("Username and Password do not match");
      // throw Error("Username And Password does not match");
    }

    // const { data } = await login(userData);
    // console.log(data);
    // return data;
  };

  // const getSelf = async () => {
  //   const { data } = await self();
  //   return data;
  // };

  // const { data: selfData, refetch } = useQuery({
  //   queryKey: ["self"],
  //   queryFn: getSelf,
  //   enabled: false,
  // });

  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationKey: ["login"],
  //   mutationFn: loginUser,
  //   onSuccess: async () => {
  //     const selfDataPromise = await refetch();
  //     console.log(selfDataPromise);
  //     // const selfDataPromise = {
  //     //   data: {
  //     //     id: 1,
  //     //     firstName: "ankit",
  //     //     lastName: "bharvad",
  //     //     email: "ankit@gmail.com",
  //     //     role: "manager",
  //     //   },
  //     // };

  // if (!isAllowed(selfDataPromise.data)) {
  //   await logout();
  //   logoutFromStore();
  //   return;
  // }

  //     setUser(selfDataPromise.data);
  //   },
  // });
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const getScreenSize = (): boolean => {
    if (screens.lg) return false;
    if (screens.md) return false;
    if (screens.sm) return true;
    if (screens.xs) return true;
    return false;
  };

  const getSpaceSize = () => {
    if (screens.xs) return "small";
    if (screens.sm) return "large";
    return "large";
  };

  return (
    <>
      {getSpaceSize()}
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Col
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Space direction="vertical" size={getSpaceSize()}>
            <Title
              level={1}
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              Login
            </Title>
            <Form
              name="login"
              initialValues={{
                username: "DEF2112000010",
                password: "12345",
              }}
              //initialValues={{ remember: true }}
              onFinish={loginUser}
              layout="vertical"
            >
              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  size="large"
                  defaultValue="DEF2112000010"
                  prefix={<UserOutlined />}
                  placeholder="User name"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Form.Item valuePropName="checked" noStyle>
                      {/* <Checkbox>Remember me</Checkbox> */}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Link href="">Forgot your password?</Link>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  // onClick={() => <Navigate to="/" />}
                  block
                  style={{ marginTop: "16px" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>

        <Col
          lg={12}
          md={12}
          sm={24}
          xs={12}
          hidden={getScreenSize()}
          style={{
            backgroundColor: "#EEEEFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            minHeight: "100vh",
          }}
        >
          <img
            src="/src/assets/login_img.svg"
            alt="Illustration"
            style={{ maxWidth: "70%" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Login;

// <Layout
// style={{ height: "100vh", display: "grid", placeItems: "center" }}
// >
// <Space direction="vertical" align="center" size="large">
//   <Layout.Content
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <Logo />
//   </Layout.Content>

//   <Card
//     bordered={false}
//     style={{ width: 300 }}
//     title={
//       <Space
//         style={{
//           width: "100%",
//           fontSize: 16,
//           justifyContent: "center",
//         }}
//       >
//         <LockFilled />
//         Sign in
//       </Space>
//     }
//   >
//     <Form
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={(values: any) => {
//         mutate({ email: values.username, password: values.password });
//       }}
//     >
//       {isError && (
//         <Alert
//           style={{ marginBottom: 24 }}
//           type="error"
//           message={error?.message}
//         />
//       )}
//       <Form.Item
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: "Please input your Username",
//           },
//           {
//             type: "email",
//             message: "Email is not valid",
//           },
//         ]}
//       >
//         <Input prefix={<UserOutlined />} placeholder="Username" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Please input your password",
//           },
//         ]}
//       >
//         <Input.Password
//           prefix={<LockOutlined />}
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Flex justify="space-between">
//         <Form.Item name="remember" valuePropName="checked">
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>
//         <a href="" id="login-form-forgot">
//           Forgot password
//         </a>
//       </Flex>
//       <Form.Item>
//         <Button
//           type="primary"
//           htmlType="submit"
//           style={{ width: "100%" }}
//           loading={isPending}
//         >
//           Log in
//         </Button>
//       </Form.Item>
//     </Form>
//   </Card>
// </Space>
// </Layout>
