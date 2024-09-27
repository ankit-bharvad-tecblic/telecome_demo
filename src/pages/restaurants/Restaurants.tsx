import {
    Breadcrumb,
    Button,
    Drawer,
    Flex,
    Form,
    Space,
    Spin,
    Table,
    Typography,
    theme,
  } from "antd";
  import {
    RightOutlined,
    PlusOutlined,
    LoadingOutlined,
  } from "@ant-design/icons";
  import { Link, Navigate } from "react-router-dom";
  import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import { createTenant, createUser, getTenants, updateTenant, updateUser } from "../../http/api";
  import { CreateUserData, FieldData, Tenant } from "../../types";
  import { useAuthStore } from "../../store";
  import RestaurantsFilter from "./RestaurantsFilters";
  import React from "react";
  import RestaurantForm from "./forms/RestaurantForm";
  import { PER_PAGE } from "../../constants";
  import { debounce } from "lodash";
  
  const Restaurants = () => {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentEditingTenant, setCurrentEditingTenant] =
    React.useState<Tenant | null>(null);
  
  
    const {
      token: { colorBgLayout },
    } = theme.useToken();
  
    const [queryParams, setQueryParams] = React.useState({
      perPage: PER_PAGE,
      currentPage: 1,
    });
  
    const {
      data: tenants,
      isFetching,
      isError,
      error,
    } = useQuery({
      queryKey: ["tenants", queryParams],
      queryFn: () => {
        const filteredParams = Object.fromEntries(
          Object.entries(queryParams).filter((item) => !!item[1])
        );
  
        const queryString = new URLSearchParams(
          filteredParams as unknown as Record<string, string>
        ).toString();
  
        return getTenants(queryString).then((res) => res.data);
      },
      placeholderData : keepPreviousData
    });
  
    const {mutate: createTenantMutation, isPending : isCreating} = useMutation({
      mutationKey : ['tenant'],
      mutationFn : async (data : Tenant) => createTenant(data).then(res => res.data),
      onSuccess : async () => {
        form.resetFields();
        queryClient.invalidateQueries({ queryKey : ['tenants'] })
        setDrawerOpen(false);
      }
    })
  
    const {mutate: updateTenantMutation, isPending : isUpdating} = useMutation({
      mutationKey : ['tenant'],
      mutationFn : async (data : Tenant) => updateTenant(data).then(res => res.data),
      onSuccess : async () => {
        form.resetFields();
        setCurrentEditingTenant(null);
        setDrawerOpen(false);
        queryClient.invalidateQueries({ queryKey : ['tenants'] })
      }
    })
  
  
    const onHandleSubmit = async () => { 
      await form.validateFields();
      const isEditMode = !!currentEditingTenant;
      console.log(currentEditingTenant)
      console.log(form?.getFieldsValue())
      if (isEditMode) {
        await updateTenantMutation({...form.getFieldsValue(), id : currentEditingTenant.id });
      } else {
        await createTenantMutation(form.getFieldsValue());
      }
    };
  
    React.useEffect(() => {
      if (currentEditingTenant) {
        setDrawerOpen(true);
        form.setFieldsValue({
          ...currentEditingTenant
        });
      }
    }, [currentEditingTenant, form]);
  
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (_text: string, record: Tenant) => {
          return (
            <div>
              {record.name}
            </div>
          );
        },
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (_text: string, record: Tenant) => {
          return <div>{record.address}</div>;
        },
      },
    ];
  
    const debouncedQUpdate = React.useMemo(() => {
      return debounce((value: string | undefined) => {
        setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
      }, 500);
    }, []);
  
    const onFilterChange = (changedFields: FieldData[]) => {
  
      const changedFilterFields = changedFields
        .map((item) => ({
          [item.name[0]]: item.value,
        }))
        .reduce((acc, item) => ({ ...acc, ...item }), {});
  
      if ("q" in changedFilterFields) {
        debouncedQUpdate(changedFilterFields.q);
      } else {
        setQueryParams((prev) => ({
          ...prev,
          ...changedFilterFields,
          currentPage: 1,
        }));
      }
    };
  
    if (user?.role !== "admin") {
      return <Navigate to="/" replace={true} />;
    }
  
    return (
      <>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Flex justify="space-between">
            <Breadcrumb
              separator={<RightOutlined />}
              items={[
                { title: <Link to="/">Dashboard</Link> },
                { title: "Restaurants" },
              ]}
            />
            {isFetching && (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            )}
            {isError && (
              <Typography.Text type="danger">{error.message}</Typography.Text>
            )}
          </Flex>
          <Form form={filterForm} onFieldsChange={onFilterChange}>
            <RestaurantsFilter>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setDrawerOpen(true)}
              >
                Add Restaurants
              </Button>
            </RestaurantsFilter>
          </Form>
  
          <Table
            columns={[
              ...columns,
              {
                title: "Actions",
                render: (_: string, record: Tenant) => {
                  return (
                    <Space>
                      <Button
                        type="link"
                        onClick={() => {
                          setCurrentEditingTenant(record);
                        }}
                      >
                        Edit
                      </Button>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={tenants?.data}
            rowKey={"id"}
            pagination={{
              total: tenants?.total,
              pageSize: queryParams.perPage,
              current: queryParams.currentPage,
              onChange: (page) => {
                setQueryParams((prev) => {
                  return {
                    ...prev,
                    currentPage: page,
                  };
                });
              },
              showTotal: (total: number, range: number[]) => {
                return `Showing ${range[0]}-${range[1]} of ${total} items`;
              },
            }}
          />
  
          <Drawer
            title={currentEditingTenant ? "Edit Tenant" : "Add Tenant"}
            width={720}
            styles={{ body: { backgroundColor: colorBgLayout } }}
            destroyOnClose={true}
            open={drawerOpen}
            onClose={() => {
              form.resetFields();
              setCurrentEditingTenant(null);
              setDrawerOpen(false);
            }}
            extra={
              <Space>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setDrawerOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button loading={isCreating || isUpdating} type="primary" onClick={onHandleSubmit}>
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" form={form}>
              <RestaurantForm />
            </Form>
          </Drawer>
        </Space>
      </>
    );
  };
  
  export default Restaurants;
  