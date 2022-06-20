import {
  AreaChartOutlined,
  ExportOutlined,
  FileSearchOutlined,
  FormOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../../context/AuthContext";

const { Content, Footer, Sider } = Layout;

const LayoutComp = ({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[router.asPath]}
            // items={items}
          >
            <Menu.Item
              key={"/"}
              onClick={() => {
                router.push("/");
              }}
              icon={<HomeOutlined />}
            >
              Home
            </Menu.Item>
            <Menu.Item
              key={"/profile"}
              onClick={() => {
                router.push("/profile");
              }}
              icon={<UserOutlined />}
            >
              Perfil
            </Menu.Item>

            {user.privilege === "admin" ? (
              <>
                <Menu.Item
                  key={"/admin/solicitudes"}
                  onClick={() => {
                    router.push("/admin/solicitudes");
                  }}
                  icon={<FileSearchOutlined />}
                >
                  Gestionar solicitudes
                </Menu.Item>
                <Menu.Item
                  key={"/admin/estadisticas"}
                  onClick={() => {
                    router.push("/admin/estadisticas");
                  }}
                  icon={<AreaChartOutlined />}
                >
                  Estadísticas
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                key={"/solicitudes"}
                onClick={() => {
                  router.push("/solicitudes");
                }}
                icon={<FormOutlined />}
              >
                Solicitudes
              </Menu.Item>
            )}

            <Menu.Item
              onClick={async () => await logOut()}
              icon={<ExportOutlined />}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ padding: "30px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Universidad Nacional de Colombia, Ingeniería de Software
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComp;
