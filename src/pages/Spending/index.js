import React, {Component} from 'react';
import {message, Table, Button} from 'antd';
import SearchForm from './searchForm';
import AddForm3 from './AddForm3';
import axios from 'axios';

class Spending extends Component {
    constructor(props) {
        super(props);
        let visible=false;
        let dataSource= [];
        const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
        this.state = {
            pagination,
            visible,
            dataSource
        }
        const columns = [
            {title: "ID", key: "order", render: (text, record, index) => index + 1},
            {title: "时间", dataIndex: "code", key: "code"},
            {title: "种类", dataIndex: "name", key: "name"},
            {title: "名称", dataIndex: "addType", key: "addType"},
            {title: "部门", dataIndex: "createUserId", key: "createUserId"},
            {title: "金额", dataIndex: "updateTime", key: "updateTime"},
            {title: "是否摊销", dataIndex: "status", key: "status", render: (text, record) => this.statusRender(text, record)},
            {title: "每月摊销金额", dataIndex: "approvalUserId", key: "approvalUserId"},
            {title: "系统反馈意见", dataIndex: "code1", key: "code1"},
            {title: "是否通过特批", dataIndex: "code2", key: "code2"},
            {title: "", dataIndex: "pic", key: "pic",render:(text,record, index)=>{
                return (
                    <div>
                      <Button>删除</Button>
                      <Button>修改</Button>
                    </div>
                )
            }},
        ];
        this.columns = columns;
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
  render() {
    const {visible,dataSource}=this.state;
    return (
      <div>
        <div>
            <SearchForm onSearch = {this.handleSearch} />
            <Button onClick={this.showModal}>新增</Button>
        </div>
        <Table className="components-table-nested" columns={this.columns} pagination={this.state.pagination} dataSource={dataSource}
               />
        <AddForm3
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          />
      </div>
    )
  }
}

export default Spending;