import React, { useContext } from 'react';
import { Menu, Layout } from 'antd';
import { UserContext } from '../context/UserContext';
import '../components/Header.css';
import school from '../assets/hcmut.png'

const { Header } = Layout;


interface User {
  isSPSO: boolean;
  isStudent: boolean;
}
const CustomHeader: React.FC = () => {
  // const { user } = useContext(UserContext); 
  // if (!user) {
  //   return null;
  // }
  // const items = user.isSPSO
  //   ? new Array(15).fill(null).map((_, index) => ({
  //       key: index + 1,
  //       label: `SPSO nav ${index + 1}`,
  //     }))
  //   : new Array(10).fill(null).map((_, index) => ({
  //       key: index + 1,
  //       label: `Customer nav ${index + 1}`,
  //     }));
  const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <div className="demo-logo" >
        <img src={school} alt="bklogo" />
      </div>
      <Menu theme="dark" mode="horizontal" items={items} style={{ flex: 1, minWidth: 0 }} />
    </Header>
  );
};

export default Header;
