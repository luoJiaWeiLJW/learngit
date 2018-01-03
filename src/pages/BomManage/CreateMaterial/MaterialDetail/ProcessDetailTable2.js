import React, {Component} from 'react';
import { Table, message} from 'antd';
import checkCode from "../../../../config/codeTips.js";
import axios from "axios";

class Table2 extends Component{
  constructor(props){
    super(props);
    const pagination = {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => '共 '+total+' 条'
    };
    const sorter = {
      field: null,
      sorter: null
    };
    const dataSource = [];
    const loading = false;
    this.state = {
      dataSource,
      loading,
      pagination,
      sorter,
    }
  }
  axios = () =>{
    this.setState({loading:true});
    const pageindex = this.state.pagination.current;
    const pagesize = this.state.pagination.pageSize;
    const sortField = this.state.sorter.field;
    let sortOrder = this.state.sorter.order;
    sortOrder = sortOrder === "ascend" ? "A" : "sortOrder" === "descend" ? "D" : null;
    axios({
      url: '/transfer/' + this.props.id + '/items',
      method: 'get',
      params: {
        pageindex,
        pagesize,
        sortField,
        sortOrder,
      }
    }).then(res=>{
      if(!checkCode(res.data.code)){
        this.setState({
          loading:false,
        });
        return
      }
      let dataSource = res.data.data;
      if(dataSource instanceof Array){
        dataSource.map((item,index) => {
          return(
              Object.keys(item).forEach(key => {
                  item[key] = item[key]||""
              })
          )

        })
      }else{
        dataSource = [];
      }
      this.setState({
        dataSource,
        loading: false,
        pagination: {...this.state.pagination, total: Number(res.data.total)||0}
      })

    }).catch(e=>{
      message.error("系统出错,请重新尝试");
      this.setState({
        loading:false,
      })
    })
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    this.setState({
      pagination: {...this.state.pagination, current, pageSize},
      sorter: sorter ? sorter : { field:null, sorter:null }
    },this.axios)
  };
  componentDidMount(){
    this.axios();
  }

  render = () => {
    const columns = [
      {title:"序号",key:"order",render:(text,record,index) => index+1},
      {title:"物料编码",dataIndex:"materialCode",key:"materialCode"},
      {title:"物料名称",dataIndex:"metarialName",key:"materialName"},
      {title:"物料序列编码",dataIndex:"materialOrder",key:"materiaOrder"},
      {title:"批号",dataIndex:"batchNumber",key:"batchNumber"},
      {title:"规格型号",dataIndex:"standard",key:"standard"},
      {title:"单位",dataIndex:"unit",key:"unit"},
      {title:"包装",dataIndex:"packingCode",key:"packingCode"},
      {title:"质量要求",dataIndex:"qr",key:"qr"},
    ];
      return(
        <div style={{textAlign:"left"}}>
          <Table columns={columns} loading={this.state.loading} size="middle" onChange={this.handleTableChange} dataSource ={this.state.dataSource} rowKey={record=>record.id} pagination={this.state.pagination} />
        </div>
      )
  }
}
export default Table2;