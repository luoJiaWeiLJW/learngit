/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import {  Menu, Icon } from 'antd';
import { Link } from 'react-router';


import './style.less'
const SubMenu = Menu.SubMenu;
class SiderCustom extends Component {

    state = {
        theme: 'dark',
        current: '1',
    }
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    handleClick = (e) => {
       
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (

            <div >
                <div style={{width:'256px',height:'100%',overflow:'auto',backgroundColor:'rgba(0, 0, 0, 0.65)'}}>
                               
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 256,marginTop:'65px' }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="1"><Link to={'/WarehousingRevenue'}>入库统计</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={'/SalesRevenue'}>销售统计</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={'/Spending'}>支出</Link></Menu.Item>
                    <Menu.Item key="4"><Link to={'/Financial'}>财务</Link></Menu.Item>
                    <Menu.Item key="5"><Link to={'/Setup'}>设置</Link></Menu.Item>
                </Menu>
                </div>
            </div>
            
        )
    }
}

export default SiderCustom;