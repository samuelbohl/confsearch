import { Layout, theme, Image } from 'antd';
import Logo from './Logo';
import Sider, { SiderTheme } from 'antd/es/layout/Sider';
import { ReactNode } from 'react';

const { Header, Content, Footer } = Layout;


const NavBar = ({ children, sider, siderTheme }: { children: React.ReactNode, sider?: ReactNode, siderTheme?: SiderTheme }) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh" }}>
            <Header className='NavBarContainer' style={{ background: colorBgContainer }}>
                <Logo />
            </Header>

            <Layout>

                {
                    sider == undefined ?
                        <></>
                        :
                        <Sider theme={siderTheme}>
                            {sider}
                        </Sider>
                }



                <Content style={{
                    background: "var(--white)",
                    overflowY: "auto"
                }}>
                    {children}
                </Content>

            </Layout>
            <Footer className='Footer' style={{ background: colorBgContainer }}>
                <Image
                    width={200}
                    src={"/confsearch-logo-removebg-preview.png"}
                    preview={false}
                />
                <Image
                    width={200}
                    src={"/distributed-computing-logo-removebg-preview.png"}
                    preview={false}
                />
            </Footer>
        </Layout >
    );
}

export default NavBar;