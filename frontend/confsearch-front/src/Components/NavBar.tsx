import { Layout, theme, Image } from 'antd';
import Logo from '../Components/Logo';

const { Header, Content, Footer } = Layout;


const NavBar = ({ children }) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{
                background: colorBgContainer,
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                borderBottom: "2px solid var(--main_color)",
            }}>
                <Logo />

            </Header>

            <Content style={{ padding: '2rem' }}>
                {children}
            </Content>
            
            <Footer style={{
                background: colorBgContainer,
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-around",
                borderTop: "2px solid var(--main_color)"
            }}>
                <Image
                    width={200}
                    src={"/confsearch-logo.png"}
                    preview={false}
                />
                <Image
                    width={200}
                    src={"/distributed-computing-logo.png"}
                    preview={false}
                />
            </Footer>
        </Layout>
    );
}

export default NavBar;