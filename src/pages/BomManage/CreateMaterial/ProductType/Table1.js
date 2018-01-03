import React, {Component} from 'react';
import {message, Table, Button, Popconfirm} from 'antd';
import axios from "axios";
import { Link } from 'react-router';
import ModalForm1 from './ModalForm1'
import SearchForm from './searchForm'


class Table1 extends Component {
  constructor(props) {
    super(props);
    const visible = false;
    const modalData = {};
    const modalType = 'add';
    const modalKey = new Date().getTime() + Math.random();
    const dataSource = [];
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const loading = false;
    const searchData = {};
    const sorter = {order: ""};
    this.state = {
      dataSource,
      pagination,
      loading,
      sorter,
      searchData,
      visible,
      modalData,
      modalType,
      modalKey
    };
    //初始化columns
    const columns = [
      {title: "序号", key: "order", render: (text, record, index) => index + 1},
      {title: "编码", dataIndex: "code", key: "code"},
      {title: "分类名称", dataIndex: "name", key: "name"},
      {
        title: "操作", key: "operation", width: "15%", render: (text, record, index) => {
        return (
          <span>
            <Button size="small" type="primary" className="table-edit-btn" onClick={() => {this.showModal("edit", record)}}>编辑</Button>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(record)}>
              <Button size="small" type="danger" className="table-del-btn">删除</Button>
            </Popconfirm>
          </span>
        );
      }
      }
    ];
    this.columns = columns;
  }

  onDelete = (record) => {
    axios({
      url: '/category/' + record.id,
      method: 'delete',
    }).then(res => {
      if (res.data.code === "204" || res.data.code === "201") {
        message.success('操作成功');
        this.props.axios()
      } else {
        message.warning('操作失败')
      }
    }).catch(e => message.warning('网络异常,请稍后重试'))
  };

  showModal = (type, record) => {
    const modalData = record ? {...record} : {};
    let modalKey = new Date().getTime() + Math.random();
    this.setState({
      modalType: type,
      visible: true,
      modalData,
      modalKey,
    })
  };
  handleOk = (data) => {
    const modalType = this.state.modalType;
    const {searchData} = this.props;
    let parentId = searchData.parentId ? searchData.parentId:'0';
    if (modalType === 'add') {
        axios({
          url: '/category',
          method: 'post',
          data: {
            ...data,
            parentId:parentId,
          }
        }).then(res => {
          if (res.data.code === "201") {
            message.success('操作成功');
            this.setState({
              visible: false,
            }, this.props.axios);
          } else {
            message.warning('操作失败')
          }
        }).catch(e => message.warning('网络异常,请稍后重试'))
      }

    else {
        axios({
          url: '/category/' + data.id,
          method: 'put',
          data: {
            ...data,
          }
        }).then(res => {
          if (res.data.code === "201") {
            message.success('操作成功');
            this.setState({
              visible: false,
            }, this.props.axios);
          } else {
            message.warning('操作失败')
          }
        }).catch(e => message.warning('网络异常,请稍后重试'))
      }
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render = () => {
    const {loading,dataSource,pagination}=this.props;
    return (
      <div>
        <Button type="primary" htmlType="button"  style={{marginRight:'50px',marginBottom:'30px'}}>
          <Link to={'/BomManage/CreateMaterial/MaterialList'}>返回</Link>
        </Button>
        <Button className='table-add-btn' onClick={() => {this.showModal("add")}} type="primary">增加</Button>
        <SearchForm onSearch={this.props.handleSearch}/>
        <Table style={{marginTop: 15}}
               loading={loading}
               className="components-table-nested"
               columns={this.columns}
               pagination={pagination}
               rowKey={record => record.id}
               dataSource={dataSource}
               onChange={(pagination) => this.props.handleTableChange(pagination)}
        />
        <ModalForm1
          modalType={this.state.modalType}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          key={this.state.modalKey}
          modalData={this.state.modalData}
        />
      </div>
    )
  }
}

export default Table1;