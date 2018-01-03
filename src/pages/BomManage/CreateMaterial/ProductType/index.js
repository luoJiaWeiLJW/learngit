import React, {Component} from 'react';
import Table1 from './Table1';
import SiderTree from './SiderTree';
import {Row, Col, Card,message,Breadcrumb} from 'antd';
// import { Link } from 'react-router';
// import BreadcrumbCustom from '../../../../components/BreadcrumbCustom';
import { Layout} from 'antd';
import axios from 'axios';
const {  Content } = Layout;

class ProductType extends Component {
  constructor(props) {
    super(props);
    const dataSource = [];
    const loading = false;
    const treeData=[];
    const treeLoading=true;
    const pagination = {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => '共 ' + total + ' 条'
    };
    const searchData={
      code:null,
      name:null,
      parentId:null,
    };
    this.state = {
      dataSource,
      loading,
      pagination,
      searchData,
      treeData,
      treeLoading,
    }
  }
  axios = (params = {}) => {
    this.setState({loading: true});
    const pageIndex = this.state.pagination.current;
    const pageSize = this.state.pagination.pageSize;
    const {searchData}=this.state;
    axios({
      url: '/categories',
      method: 'get',
      params: {
        pageIndex,
        pageSize,
        ...searchData,
        ...params
      }
    }).then(res => {
      if (res.data.code !== "200") {
        message.warning("网络异常,请稍后重试");
        this.setState({loading: false});
        return
      }
      this.setState({
        dataSource: res.data.data || [],
        loading: false,
        pagination: {...this.state.pagination, total: Number(res.data.total) || 0}
      })

    }).catch(e => {
      message.warning("网络异常,请稍后重试");
      this.setState({loading: false})
    });

    axios({
      url: '/tree/material_category/pid/0/children',
      method: 'get'
    }).then(res => {
        console.log(res)
      if (res.data.code !== "200") {
        message.success('网络异常,请稍后重试');
        return
      }
      const treeData = (res.data.data ? res.data.data : []);
      this.setState({
        treeData,
        treeLoading: false,
      })
    }).catch(e => {
      message.warning('网络异常,请稍后重试');
      this.setState({
        treeLoading: false
      })
    })
  };
  componentDidMount() {
    this.axios();
  }
  handleSearch = (text, data) => {
      
    const {pagination, searchData} = this.state;
    pagination.current = 1;
    pagination.total = 0;
    if (text !== 'search') {
      console.log(data[0]);
      searchData.parentId = (data ? data[0] : null);
    }
    else if (text === 'search') {
      searchData.name = (data.name ? data.name : null);
      searchData.code = (data.code ? data.code : null);
    }
    this.setState({
      searchData,
      pagination
    });
    this.axios({
      pageSize: this.state.pagination.pagesize || 10,
      pageIndex: 1,
      name: this.state.searchData.name,
      parentId: this.state.searchData.parentId,
      code: this.state.searchData.code,
    });
  };
  handleTableChange = (pagination) => {
    const {current, pageSize} = pagination;
    this.setState({
      pagination: {...this.state.pagination, current, pageSize},
    }, this.axios)
  };
  render() {
    const {dataSource, loading,pagination,searchData,treeData,treeLoading} = this.state;
    return (
      <div className="gutter-example">
        <Breadcrumb style={{margin:"20px",fontSize:"15px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>Bom管理</Breadcrumb.Item>
          <Breadcrumb.Item>物料分类设置</Breadcrumb.Item>

        </Breadcrumb>
       
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight: 830,maxHeight:830,overflowY:'auto'}}>
                <Layout style={{minHeight:730, backgroundColor: '#fff' }}>
                  <Content>
                    <SiderTree
                      handleSearch={this.handleSearch}
                      treeData={treeData}
                      treeLoading={treeLoading}
                    />
                  </Content>
                  <footer>

                  </footer>
                </Layout>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={18}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight: 750}}>
                <Table1
                  columns={this.columns}
                  dataSource={dataSource}
                  loading={loading}
                  handleTableChange={this.handleTableChange}
                  pagination={pagination}
                  axios={this.axios}
                  handleSearch={this.handleSearch}
                  searchData={searchData}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProductType;