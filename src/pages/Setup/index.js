import React, {Component} from 'react';
import {Button,Modal,Table} from 'antd';
import AddForm3 from './AddForm3';
class Setup extends Component {
  constructor(props){
    super(props);
    let visible=false;
    let dataSource= [];
    this.state={
      visible,
      dataSource
    }
  };
  //修改Modal
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
    const detailColumnTop= [
      {title: '月固定成本系数', dataIndex: 'code',width:'10%'},
      {title: '每月利润目标', dataIndex: 'name',width:'10%'},
      {title: '每月现金流增量目标', dataIndex: 'model',width:'10%'}
    ];
    return (
      <div>
        <div>
          <Table
              dataSource={dataSource}
              columns={detailColumnTop}
              axios={this.axios}
              pagination={false}
              />
          <Button type="primary" onClick={this.showModal}>修改</Button>
          </div>
          <AddForm3
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            />
      </div>
    )
  }
}

export default Setup;