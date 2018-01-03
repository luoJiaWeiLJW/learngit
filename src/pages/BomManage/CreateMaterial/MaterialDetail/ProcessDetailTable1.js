import React, {Component} from 'react';
import { Table} from 'antd';
import Table2 from './ProcessDetailTable2';
// import axios from 'axios';
// import checkCode from '../../../../config/codeTips';
// import ModalForm from './ModalForm1'

class BasicTable extends Component{
  constructor(props){
    super(props);
    const dataSource = [];
    const editIndex = -1;
    const pagination = {showSizeChanger:true,showQuickJumper:true,showTotal:total =>'共 '+total+' 条'};
    const loading = false;
    const sorter = {order:""};
    this.state={pagination,loading,dataSource, editIndex, sorter,};
    //初始化columns
    const columns = [
      {title: "序号", key: "voucherDate", render: (text, record, index) => index + 1},
      {title: "工序名称", dataIndex: "intoCode", key: "intoCode"},
      {title: "标准工时", dataIndex: "carNumber", key: "carNumber"},
      {title: "模具", dataIndex: "provideGroupName", key: "provideGroupName"},
      {title: "刀具", dataIndex: "provideUserName", key: "provideUserName"},
      {title: "备注", dataIndex: "warehouseName", key: "warehouseName"},
      {title: "设备", dataIndex: "consigneeUserName", key: "consigneeUserName"},
      {title: "图纸", dataIndex: "cz", key: "logisticsCompany"},
      {title: "加工说明", dataIndex: "product", key: "product"},
    ];

    this.columns = columns;

  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    let pageindex = 1;
    if(sorter.field !== this.state.sorter.field){
      pageindex = 1;
    }else{
      pageindex = pagination.current
    }

    pager.current = pageindex;
    pager.pagesize = pagination.pageSize;
    const sort = {};
    sort.field = sorter.field;
    sort.order = sorter.order;
    this.setState({
      pagination: pager,
      sorter:sort
    });

    const searchData = this.state.searchData;
    setTimeout(()=>{
      this.axios({
        pagesize: pagination.pageSize,
        pageindex,
        sortField:sorter.field,
        sortOrder: sorter.order,
        ...filters,
        ...searchData
      });
    },0)

  };
  // axios = (params = {}) =>{
  //
  //   this.setState({ loading: true});
  //   if(params.sortOrder){
  //     if(params.sortOrder instanceof Array){
  //       params.sortOrder=params.sortOrder.map(item=>{
  //         return item=="ascend"?"A":"D";
  //       })
  //     }else{
  //       params.sortOrder = params.sortOrder == "ascend"?"A":"D";
  //     }
  //
  //   }
  //   axios({
  //     url:"/transfers",
  //     method:"get",
  //     params:{
  //       pagesize:10,
  //       ...params
  //     }
  //
  //   }).then(res =>{
  //     if(!checkCode(res.data.code)){
  //       const pagination = {...this.state.pagination};
  //       pagination.total=0;
  //       if(res.data.code == "607"){
  //         this.setState({
  //           loading:false,
  //           dataSource:[],
  //           pagination
  //         })
  //       }else{
  //         this.setState({pagination,loading:false,dataSource:[]})
  //       }
  //       return
  //     };
  //     const pagination = {...this.state.pagination};
  //     pagination.total = parseInt(res.data.total)||0;
  //     let dataSource = [];
  //     if(res.data.data instanceof Array){
  //       dataSource = res.data.data;
  //     }
  //     this.setState({
  //       pagination,
  //       loading:false,
  //       dataSource
  //     })
  //   }).catch(e =>{
  //     message.error("系统出错,请重新尝试");
  //     this.setState({loading:false})
  //   })
  // };
  // componentDidMount() {
  //   this.axios({pageindex:1});
  // }

  render = ()=> {
    const expandedRowRender = (record,index) => {
      return <Table2 index={index} id={record.id} />;
    };
    return (
      <div>
        <Table  className="components-table-nested" columns={this.columns} pagination={this.state.pagination} onChange={this.handleTableChange} loading={this.state.loading} rowKey={record => record.id} dataSource ={this.state.dataSource} expandedRowRender={expandedRowRender}/>
      </div>

    )

  }



}
export default BasicTable;