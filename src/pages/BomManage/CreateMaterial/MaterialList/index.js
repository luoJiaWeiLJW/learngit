import React, {Component} from 'react';
import Table1 from './Table1';
import SiderTree from './SiderTree';
import { Link } from 'react-router';
import {Row, Col, Card,message,Breadcrumb} from 'antd';
import { Button, Layout} from 'antd';
import axios from 'axios';
const {  Content } = Layout;

class MaterialList extends Component {
  constructor(props) {
    super(props);
    const dataSource = [];
    const loading = false;
    const Load =true;
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
      type:null,
    };
    this.state = {
      dataSource,
      loading,
      pagination,
      searchData,
        Load,
    }
  }
  axios = (params = {}) => {
    this.setState({loading: true});
         
    axios({
      url: '/materials',
      method: 'get',
      params: {
        pageIndex: this.state.Load ? 1: params.current,
          pageSize: this.state.Load ? 10: params.pageSize,
        code: params.code,
        name: params.name,
        categoryId: params.type
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
      searchData.type = (data ? data[0] : null);

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
      type: this.state.searchData.type,
      code: this.state.searchData.code,
    });
  };
  handleTableChange = (pagination) => {

    const {current, pageSize} = pagination;

    this.setState({
        Load:false,
      pagination: {...this.state.pagination, current, pageSize},
    }
    // console.log(pagination)
    , this.axios(pagination))
  };
  render() {
    const {dataSource, loading,pagination} = this.state;

    return (
      <div className="gutter-example">
        <Breadcrumb style={{margin:"20px",fontSize:"15px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>Bom管理</Breadcrumb.Item>
          <Breadcrumb.Item>物料列表</Breadcrumb.Item>
        </Breadcrumb>
       
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight: 750,maxHeight:750,overflowY:'auto'}}>
                <Layout style={{minHeight:700, backgroundColor: '#fff' }}>
                  <Content>
                    <SiderTree handleSearch={this.handleSearch}  loading={loading}></SiderTree>
                  </Content>
                  <footer>
                    <Col style={{textAlign: 'center',marginBottom: 30}} key="btn">
                      <Button type="primary" htmlType="button" >
                        <Link to={'/BomManage/CreateMaterial/ProductType'}>编辑分类</Link>
                      </Button>
                    </Col>
                  </footer>
                </Layout>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={18}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight: 750}}>
                <Table1
                  dataSource={dataSource}
                  loading={loading}
                  handleTableChange={this.handleTableChange}
                  pagination={pagination}
                  axios={this.axios}
                  handleSearch={this.handleSearch}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MaterialList;