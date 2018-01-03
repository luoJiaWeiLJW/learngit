import React, {Component} from 'react';

import DetailTable from './DetailTable';
import ProcessTable from './ProcessTable';
import {Row,Col,message,Breadcrumb} from 'antd';

import axios from 'axios';

class  MaterialDetail extends Component {
  constructor(props){
    super(props);
    const dataSource = [];
    const loading = false;
    const categoryId = [];
    this.state = {
      dataSource,
      loading,
        categoryId,

    }
  }

  componentDidMount() {
    this.axios();
  }

  axios = (params = {}) => {
    
    this.setState({loading: true});

    axios({
      url: '/materials',
      method: 'get',
      params: {
        code: this.props.params.code
      }
    }).then(res => {
      if (res.data.code !== "200") {
        message.warning("未查找到物料数据");
        this.setState({loading: false});
        return
      }
      this.setState({
        dataSource: res.data.data || [],
        loading: false
      })
       
        axios({
            url:'/category/'+this.state.dataSource[0].categoryId+'/upper_nodes',
            method:'get',

        }).then(res=>{
          
            this.setState({
                categoryId:res.data.data,
            })
           
            return
        })
    }).catch(e => {
      message.warning("网络异常,请稍后重试");
      this.setState({loading: false})
    })
  };

  render () {
    const {dataSource, loading,categoryId} = this.state;
   
    return (
      <div className="gutter-example">
        <Breadcrumb style={{margin:"20px",marginLeft:"-3px",fontSize:"15px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>Bom管理</Breadcrumb.Item>
          <Breadcrumb.Item>物料列表</Breadcrumb.Item>
          <Breadcrumb.Item>物料详情</Breadcrumb.Item>
        </Breadcrumb>
        
        <Row gutter={25}>
          <Col className="gutter-row" span={25}>
            <DetailTable
              columns={this.columns}
              dataSource={dataSource}
              loading={loading}
              axios={this.axios}
              categoryId={categoryId}
            />
            <ProcessTable
              columns={this.columns}
              dataSource={dataSource}
              loading={loading}
              axios={this.axios}
            />
          </Col>
          
        </Row>
      </div>
    )
  }

}

export default MaterialDetail;