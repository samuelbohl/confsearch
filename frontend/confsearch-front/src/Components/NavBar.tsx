import { Layout, theme, Image } from 'antd';
import Logo from '../Components/Logo';

const { Header, Content, Footer } = Layout;


const NavBar = ({ children }: { children: React.ReactNode }) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: "100vh" }}>
            <Header className='NavBarContainer' style={{ background: colorBgContainer }}>
                <Logo />

            </Header>

            <Content style={{
                padding: '2rem',
                background: "var(--white)"
            }}>
                {children}
            </Content>

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