import React, {Component} from 'react';
import {Button,Table,message} from 'antd';
import AddForm3 from './AddForm3';
import axios from 'axios';
class Setup extends Component {
  constructor(props){
    super(props);
    let visible=false;
    let dataSource= [];
    let amonth='now';
    let amonthFixedCost='0.8';
    let amonthTarget='8000';
    let amonthCashFlow='40000';
    this.state={
      visible,
      dataSource,
      amonth,
      amonthFixedCost,
      amonthTarget,
      amonthCashFlow
    }
    const columns= [
      {title: '月固定成本', dataIndex: 'monthFixedCost',width:'10%'},
      {title: '每月利润目标', dataIndex: 'monthTarget',width:'10%'},
      {title: '每月现金流增量目标', dataIndex: 'monthCashFlow',width:'10%'}
    ];
    this.columns = columns;
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    pager.pagesize = pagination.pageSize;
    const sort = {};
    sort.field = sorter.field;
    sort.order = sorter.order;
    this.axios({
      pageindex:pager.current,
      pagesize:pager.pagesize
    })
  };

  axios = (params = {}) => {
    const month=this.state.amonth;
    const  monthFixedCost = this.state.amonthFixedCost;
    const  monthTarget = this.state.amonthTarget;
    const monthCashFlow = this.state.amonthCashFlow;
    this.setState({loading: true});
    if (params.sortOrder) {
      if (params.sortOrder instanceof Array) {
        params.sortOrder = params.sortOrder.map(item => {
          return item === "ascend" ? "A" : "D";
        })
      } else {
        params.sortOrder = params.sortOrder === "ascend" ? "A" : "D";
      }
    }
    axios({
      url: "/target/6048ce49ba5d4ecfb0a8a4aabe84b2a1",
      method: "get",
      data: {
        month,
       monthFixedCost,
       monthTarget,
       monthCashFlow
      }
     }).then(res => {
       console.log('res',res);
       let dataSource = [res.data];
       //console.log(res.data.data instanceof Array)
       console.log('dataSource',dataSource);
       if(res.status !== 200){
         //console.log('xxx');
          const pagination = {...this.state.pagination};
          pagination.total = 0;
          if(res.data.data.code !== 200){
            this.setState({
                loading: false,
                pagination
            })
          }
       };
      const pagination = {...this.state.pagination};
      pagination.total = parseInt(res.data.total,0) || 0;
      this.setState({
        pagination,
        loading: false,
        dataSource
      })
      console.log('dataSource',dataSource)
    }).catch(e => {
      message.error("系统出错,请重新尝试");
      this.setState({loading: false})
    })
  };

  componentDidMount() {
    this.axios({pageindex: 1});
  }

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
  render=()=> {
    const {visible,dataSource,pagination}=this.state;
    return (
      <div>
        <div>
        <Table
            loading={this.state.loading}
            pagination={pagination}
            dataSource={dataSource}
            columns={this.columns}
            axios={this.axios}
            onChange={this.handleTableChange} 
            rowKey={record=>record.id}
            />
          <Button type="primary" onClick={this.showModal}>修改</Button>
          </div>
          <AddForm3
            visible={visible}
            //onOk={this.handleOk}
            onCancel={this.handleCancel}
            axios={this.axios}
            />
      </div>
    )
  }
}

export default Setup;