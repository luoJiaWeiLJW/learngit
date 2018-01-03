import React, {Component} from 'react';
import {Row,Table,Card, Col,Button,Breadcrumb } from 'antd'
import './style.css'

class DetailTable extends Component {

  constructor(props) {
    super(props);
    const dataSource = [];
    const loading = false;
    this.state = {dataSource, loading};
  }
    handleClick=()=>{
       
        window.history.go(-1);
    }
    titles=(categoryId)=>{
    
        return(
            categoryId.map((items,index)=>{
                return(
                    <Breadcrumb.Item key={index}>{items.name}</Breadcrumb.Item>
                )

            })
        )

       
    }
   

  render() {
    const {loading,dataSource,categoryId}=this.props;
   
   
    const detailColumnTop= [
      {title: '物料编码', dataIndex: 'code',width:'10%'},
      {title: '物料名称', dataIndex: 'name',width:'10%'},
      {title: '规格型号', dataIndex: 'model',width:'10%'},//
      {title: '单位', dataIndex: 'unit',width:'10%'},
      {title: '配置属性', dataIndex: 'common',width:'10%'},
      {title: '来源', dataIndex: 'source',width:'10%'},
      {title: '加工类型', dataIndex: 'processing',width:'10%'},
      {title: '产品系列', dataIndex: 'type',width:'10%'},
      {title: '颜色', dataIndex: 'color',width:'10%'},
      {title: '产品型号', dataIndex: 'productSize',width:'10%'},//
    ];
    const detailColumnBotton=[
      {title: '产地', dataIndex: 'origin',width:'10%'},
      {title: '等级', dataIndex: 'level',width:'10%'},
      {title: '半制品种类', dataIndex: 'semiType',width:'10%'},
      {title: '油漆面积', dataIndex: 'oilPaint',width:'10%'},
      {title: '保质期', dataIndex: 'expirationType',width:'10%'},
      {title: '存放要求', dataIndex: 'storage',width:'10%'},
      {title: '备注', dataIndex: 'note',width:'10%'},
      {title: '审核人', dataIndex: 'type',width:'10%'},//
      {title: '备用属性', dataIndex: 'ext',width:'20%'},
    ];
    return (
      <div className="gutter-box">

        <Card bordered={false} style={{minHeight: 350}}>
          <Row>
            <Col span={12}>

              <Button onClick={this.handleClick} className='back' >返回</Button>
              <Breadcrumb className='title'>
                  {this.titles(categoryId)}
              </Breadcrumb>
              <h2 style={{marginBottom:"20px"}}>物料详情</h2>
            </Col>
            <Col span={24}>
              <Table
                columns={detailColumnTop}
                dataSource={dataSource}
                loading={loading}
                axios={this.axios}
                pagination={false}
                size="middle" />
              <Table
                columns={detailColumnBotton}
                dataSource={dataSource}
                loading={loading}
                axios={this.axios}
                pagination={false}
                size="middle"
              />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }

}

export default DetailTable;