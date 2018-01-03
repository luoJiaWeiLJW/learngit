import React, {Component} from 'react';
import {Table} from 'antd';
// import axios from "axios";
import {Link} from 'react-router'

import SearchForm from './searchForm'

class Table1 extends Component {

  constructor(props) {
    super(props);
    const dataSource = [];
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const loading = false;
    const searchData = {};
    const sorter = {order: ""};
    this.state = {dataSource, pagination, loading, sorter, searchData};
    //初始化columns
    const columns = [
      {title: "序号", key: "voucherDate", render: (text, record, index) => index + 1},
      {title: "物料编码", dataIndex: "code", key: "code"},
      {title: "物料名称", dataIndex: "name", key: "name"},
      {title: "规格型号", dataIndex: "model", key: "model"},
      {title: "单位", dataIndex: "unit", key: "unit"},
      {title: "来源", dataIndex: "source", key: "source"},
      {title: "配置属性", dataIndex: "common", key: "common"},
      {title: "审核人", dataIndex: "approvalUserId", key: "approvalUserId"},
      {
        title: "操作", key: "cz", width: "10%", render: (text, record, index) => {
        return (
          <Link to={{pathname: '/BomManage/CreateMaterial/MaterialDetail/'+record.code}}>详情</Link>)
        }
      }
    ];
    this.columns = columns;
  }

  render = () => {
  	
    const {loading,dataSource,pagination}=this.props;
    return (
      <div>
        <SearchForm onSearch={this.props.handleSearch}/>
        <Table style={{marginTop: 15}}
               loading={loading}
               className="components-table-nested"
               columns={this.columns}
               pagination={pagination}
               rowKey={record => record.code}
               dataSource={dataSource}
               onChange={(pagination)=>this.props.handleTableChange(pagination)}
        />
      </div>
    )
  }
}

export default Table1;