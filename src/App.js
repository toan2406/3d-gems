import React, { Component } from 'react';
import styled from 'styled-components';
import Gems3D from './Gems3D';

class App extends Component {
  render() {
    return (
      <main>
        <Top>
          <Float direction="left">
            <Gems3D width={60} height={60} />
            <Title>3D Gems</Title>
          </Float>

          <Float direction="right">
            <Link href="https://github.com/toan2406/3d-gems">
              <i className="fa fa-github fa-lg" /> Github
            </Link>
          </Float>
        </Top>

        <Content>
          <Header>
            React Component of{' '}
            <Highlight>
              <Link href="https://gems.org">Gems</Link>
            </Highlight>{' '}
            Logo
          </Header>
          <SubHeader>Powered by Three.js</SubHeader>

          <Showcase>
            <Gems3D width={240} height={240} color="#6fffe9" rotate={0.01} />
          </Showcase>

          <Button href="https://gems.org">Read more about Gems</Button>
        </Content>
      </main>
    );
  }
}

const Top = styled.div`
  height: 60px;
  padding: 30px 40px;
  color: #fff;
`;

const Float = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  float: ${props => props.direction};
`;

const Title = styled.span`
  margin-left: 8px;
  font-size: 28px;
  vertical-align: middle;
  color: #ff7092;
`;

const Content = styled.div`
  padding: 20px 10px;
  text-align: center;
`;

const Header = styled.h1`
  margin: 0.2em 0;
  font-size: 39px;
  font-weight: 400;
  color: #fff;
`;

const SubHeader = styled.h2`
  margin: 0.2em 0;
  font-size: 26px;
  font-weight: 400;
  color: #ff7092;
`;

const Highlight = styled.span`
  color: #ff7092;
`;

const Link = styled.a.attrs({
  target: '_blank'
})`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 16px;
  color: #fff;
  &:before {
    content: '|';
  }
`;

const Showcase = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const Button = styled.a.attrs({
  target: '_blank'
})`
  display: inline-block;
  padding: 8px 32px;
  font-weight: 500;
  text-decoration: none;
  color: #3a506b;
  background: #6fffe9;
  border-radius: 4px;
`;

export default App;
