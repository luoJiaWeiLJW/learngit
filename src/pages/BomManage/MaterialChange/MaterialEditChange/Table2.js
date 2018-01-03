import React, {Component} from 'react';
import { Table, Button, message} from 'antd';
import checkCode from "../../../../config/codeTips.js";
import axios from "axios";
import ModalForm2 from './ModalForm2';

class Table2 extends Component{
    constructor(props){
        super(props);
        const visible = false;
        const option = 0;
        const editIndex = -1;
        const record = {};
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
        const modalType = "add";
        const modalKey = '';

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
          visible,
          modalData,
          modalType,
          modalKey,
          editIndex,
          dataSource,
          loading,
          pagination,
          sorter,
          record,
          option
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
            url: "/appr_process/apid/"+ this.props.record.apprProcessId +"/approvals",
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

    showModal = (type,record) => {
        //此处只有新增功能所以简写,若有编辑功能时请参照其他Table组件那样写
        console.log(record)
        axios({
            url: "/approval/"+ record.id +"/detail",
            method: 'get',
            params: {
            }
        }).then(res=>{
            if(!checkCode(res.data.code)){
              this.setState({
                loading:false,
              });
              return
            }
            const data = res.data.data;
            const {modalData}  = this.state;
            Object.keys(modalData).forEach(key=>{
                modalData[key].value = data[key];
            });

            let modalKey = 1000*Math.random()+ new Date(0).toUTCString();
            let editIndex = -1;
            this.state.dataSource.forEach((item,index)=>{
                if(item === record){editIndex = index}
            })
            this.setState({
                modalType:type,
                visible:true,
                editIndex:editIndex,
                record,
                modalData,
                modalKey
            })

        }).catch(e=>{
            message.error("系统出错,请重新尝试");
            this.setState({
              loading:false,
            })
        })


    };

    handleOk = (data, option) => {
        console.log('option ====='+option)
        const apprData = this.state.dataSource[this.state.editIndex];
        this.setState({
            visible: false,
        });
        axios({
            url:"/new/approval/"+ apprData.id +"/approve",
            method:"put",
            data:{
                id: apprData.id,
                name: apprData.name,
                apprProcessId: apprData.apprProcessId,
                sourceId: apprData.sourceId,
                opinion: option,
                description: data.note
            }
        }).then(res =>{
            console.log(res.data.code);
            if(res.data.code !=="200"&& res.data.code !=="201"&&res.data.code !=="204"){
                message.warning(res.data.msg||"操作失败");

                return;
            }
            message.success("操作成功");

            this.axios()

        }).catch(e=>{
            message.error("系统出错,请重新尝试");
        })
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    handleAppr = (record) => {
      console.log(record)
      axios({
        url:"/new/approval/"+ record.id +"/submit",
        method:"put",
        data:{
        }
      }).then(res =>{
        console.log(res.data.code);
        if(res.data.code !=="200"&& res.data.code !=="201"&&res.data.code !=="204"){
          message.warning(res.data.msg||"操作失败");
          return;
        }
        message.success("操作成功");
        this.axios()
      }).catch(e=>{
        message.error("系统出错,请重新尝试");
      })
    }
    statusRender = (text, record) => {
        if(text === "0"){
          return <span>未提交&nbsp;&nbsp;<Button onClick={()=>{this.handleAppr(record)}}>提交审核</Button></span>;
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
    render = () => {
        const columns = [
            {title:"序号",key:"order",render:(text,record,index) => index+1},
            {title:"修改时间",dataIndex:"approvalTime",key:"approvalTime"},
            {title:"审核状态",dataIndex:"opinion",key:"opinion", render: (text,record) => this.statusRender(text, record)},
            {title:"审核人",dataIndex:"approvalUserId",key:"approvalUserId"}
        ];
      
        columns.push({
            title:"操作",key:"operation",render:(text,record)=>{
                return(
                  <Button onClick={()=>{this.showModal('edit',record)}}>查看</Button>
                )}
        })

        return (
            <div style={{textAlign:'left'}}>
                <Table size="middle" columns={columns} dataSource ={this.state.dataSource} rowKey={record=>record.id} loading={this.state.loading} pagination={this.state.pagination} onChange={this.handleTableChange}/>
                <ModalForm2 bindRecord={this.state.record}  modalType={this.state.modalType}  visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}  modalData={this.state.modalData}></ModalForm2>
            </div>
        )

    }

}
export default Table2;