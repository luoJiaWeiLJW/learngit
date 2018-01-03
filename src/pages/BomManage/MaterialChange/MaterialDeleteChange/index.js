import React, {Component} from 'react';
import {message, Table, Button,Modal,Input,Select} from 'antd';

import axios from 'axios';
import checkCode from '../../../../config/codeTips';
import SearchForm from './searchForm';
import './style.css'
const Option = Select.Option;
class MaterialDeleteChange extends Component {
  constructor(props) {
    super(props);
    const visible = false;
    const dataSource = [];
    const editIndex = -1;
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const loading = false;
    const sorter = {order: ""};
    const searchData = {};
    const modalData = {
      categoryId:{value:"",title:"产品分类"},
      code:{value:"",title:"物料编码"},
      name:{value:"",title:"物料名称"},
      model:{value:"",title:"规格型号"},
      unit:{value:"",title:"单位"},
      common:{value:"",title:"配置属性"},
      source:{value:"",title:"来源"},
      processing:{value:"",title:"加工类型"},
      seriesId:{value:"",title:"产品系列"},
      color:{value:"",title:"颜色"},
      expirationType:{value:"",title:"质保期"},
      storage:{value:"",title:"存放要求"},
      origin:{value:"",title:"产地"},
      level:{value:"",title:"材质等级"},
      semiType:{value:"",title:"半制品种类"},
      oilPaint:{value:"",title:"油漆面积"},
      note:{value:"",title:"备注"},
    };
    const modalType = "";
    const modalKey = "";
    const changeCode=[];
    const codeData=[];
    this.state = {
      visible,
      pagination,
      loading,
      dataSource,
      editIndex,
      sorter,
      modalData,
      searchData,
      modalType,
      modalKey,
        changeCode,
        codeData,
    };
    //初始化columns
    const columns = [
      {title: "序号", key: "order", render: (text, record, index) => index + 1},
      {title: "物料编码", dataIndex: "code", key: "code"},
      {title: "物料名称", dataIndex: "name", key: "name"},
      {title: "删除时间", dataIndex: "updateTime", key: "updateTime"},

      {title: "操作人", dataIndex: "pic", key: "pic"},
    ];
    this.columns = columns;

  }
  statusRender = (text, record) => {
    if(text === "0"){
      return "未提交";
    }else if(text === "1"){
      return "待审核";
    }else if(text === "2"){
      return "审核通过";
    }else if(text === "-1"){
      return "被拒";
    }else if(text === "-2"){
      return "驳回";
    }
  }

  handleSearch = (data) =>{//按条件搜索
    const {pagination} = this.state;
    pagination.current = 1;
    pagination.total=0;
    this.setState({
      searchData:data,
      pagination
    })
    this.axios({
      ...data,
      pagesize:this.state.pagination.pagesize||10,
      pageindex:1,
      sortField:this.state.sorter.field,
      sortOrder:this.state.sorter.order
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    let pageindex = 1;
    if (sorter.field !== this.state.sorter.field) {
      pageindex = 1;
    } else {
      pageindex = pagination.current
    }
    pager.current = pageindex;
    pager.pagesize = pagination.pageSize;
    const sort = {};
    sort.field = sorter.field;
    sort.order = sorter.order;
    this.setState({
      pagination: pager,
      sorter: sort
    });
  };
  axios = (params = {}) => {

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
      url: "/new/materials",
      method: "get",
      params: {
        pagesize: 10,
        ...params
      }
    }).then(res => {
      if (!checkCode(res.data.code)) {
        const pagination = {...this.state.pagination};
        pagination.total = 0;
        if (res.data.code === "607") {
          this.setState({
            loading: false,
            dataSource: [],
            pagination
          })
        } else {
          this.setState({pagination, loading: false, dataSource: []})
        }
        return
      }
      ;
      const pagination = {...this.state.pagination};
      pagination.total = parseInt(res.data.total,0) || 0;
      let dataSource = [];
      if (res.data.data instanceof Array) {
        dataSource = res.data.data;
      }
      this.setState({
        pagination,
        loading: false,
        dataSource,
          treeData:[],
          codeData:[],
          onBlur:false,
      })
    }).catch(e => {
      message.error("系统出错,请重新尝试");
      this.setState({loading: false})
    })
  };
  //
  componentDidMount() {
    this.axios({pageindex: 1});
  }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {

        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
      
        this.setState({
            visible: false,
        });
    }
    //查询数据
    search=(e)=>{
        console.log(e)
        this.setState({
            codeData:[],
        })
        if(e.length>0){
            axios({
                url: '/keyword/'+e+'/materials',
                method: 'get',
                params: {
                    keyword:e,
                }
            }).then(res=>{
                this.setState({
                    codeData:res.data.data,
                })
                console.log(res.data.data)
            })
        }

    }
    changeCode1=()=>{
        if(this.state.changeCode.length>0){
            axios({
                url: '/material/code/'+this.state.changeCode,
                method: 'get',
            }).then(res=>{
                console.log(res.data.data,'AAAAAAAAAAAAAAAAAAAAAAA')
            })
        }
    }
    handleChange=(value)=> {
        this.setState({
            changeCode:value,
        })
    }

    handleBlur=()=> {

    }

    handleFocus=()=> {

    }

    render = () => {
         const {codeData}=this.state
    return (
      <div>
        <SearchForm onSearch = {this.handleSearch}/>
        <Button  onClick={this.showModal} className='Delete'>删除物料</Button>
        <Modal
            title={[
              <span style={{marginLeft:'190px',fontSize:'23px'}} key='delete1'>删除物料</span>,
            ]}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit"  className='Preservation1' onClick={this.changeCode1}>确定删除</Button>,
              <Button key="back"  className='Cancel1'onClick={this.handleCancel} >取消</Button>
            ]}
        >
          <div className='Idinput1'>
            <span className='Materialid'>物料编码:</span>
            <Select
                showSearch
                style={{ width:"350px",marginLeft:"15px" }}
                placeholder="请输入物料编码"
                optionFilterProp="children"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onSearch={this.search}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {codeData.map((item,index)=>{
                    return(
                        <Option value={item.code} key={index}>{item.code}</Option>
                    )
                })}
            </Select>
          </div>
          <div className='Idinput1'>
            <span className='Materialid'>物料名称:</span> 
            <Input  className='Input1' disabled/>
          </div>
          
        </Modal>
        <Table className="components-table-nested" columns={this.columns} pagination={this.state.pagination}
               onChange={this.handleTableChange} loading={this.state.loading} rowKey={record => record.id}
                style={{clear:'both'}}/>

        
      </div>

    )

  }


}

export default MaterialDeleteChange;