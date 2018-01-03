import React, {Component} from 'react';
import {Modal,Button,Input,Select,message,TreeSelect} from 'antd';
import axios from 'axios';
import './style.css'
const  TextArea  = Input;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
class ModalForm3 extends Component {
    constructor(props) {
        super(props);
        this.state={
            treeData:[],
            codeData:[],
            onBlur:false,
            changeCode:[],
            code:"",  //获取物料编码的内容
            name:"",
            model:"",
            unit:"",
            common:"",
            source:"",
            processing:"",
            seriesId:"",
            color:"",
            expirationType:"",
            storage:"",
            origin:"",
            level:"",
            semiType:"",
            oilPaint:"",
            note:"",

            codeId:"",
            //改变物料编码内容
            common1:"",
            source1:"",
            processing1:"",
            seriesId1:"",
            color1:"",
            expirationType1:"",
            level1:"",
            semiType1:"",



        }
    }
    componentDidMount = () => {
        axios({
            url: '/tree/material_category/pid/0/children',
            method: 'get'
        }).then(res => {

            if (res.data.code !== "200") {
                message.success('网络异常,请稍后重试');
                return
            }
            const treeData = (res.data.data ? res.data.data : []);
            this.setState({
                treeData,
            })
        }).catch(e => {
            message.warning('网络异常,请稍后重试');
        })
    };
    handleCancel = () => {
        this.props.onCancel();
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //查询数据
    search=(e)=>{

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
                console.log(res.data.data.id)
                this.setState({
                    codeId:res.data.data.id,
                    code:res.data.data.code,
                    name:res.data.data.name,
                    model:res.data.data.model,
                    unit:res.data.data.unit,
                    common:res.data.data.common,
                    source:res.data.data.source,
                    processing:res.data.data.processing,
                    seriesId:res.data.data.seriesId,
                    color:res.data.data.color,
                    expirationType:res.data.data.expirationType,
                    storage:res.data.data.storage,
                    origin:res.data.data.origin,
                    level:res.data.data.level,
                    semiType:res.data.data.semiType,
                    oilPaint:res.data.data.oilPaint,
                    note:res.data.data.note,
                })
            })
        }
       
       
    }

     handleChange=(value)=> {
        this.setState({
            changeCode:value,
        })
    }
    //改变物料编码的值
    common=(value)=>{
        this.setState({
            common1:value
        })

    }
    source=(value)=>{
        this.setState({
            source1:value
        })
       
    }
    processing=(value)=>{
        this.setState({
            processing1:value,
        })
    }
    seriesId=(value)=>{
        this.setState({
            seriesId1:value,
        })
    }
    color=(value)=>{
        this.setState({
            color1:value,
        })
    }
    expirationType=(value)=>{
        this.setState({
            expirationType1:value,
        })
    }
    origin=(value)=>{
        this.setState({
            origin1:value,
        })
    }
    level=(value)=>{
        this.setState({
            level1:value,
        })
    }
    semiType=(value)=>{
        this.setState({
            semiType1:value,
        })
    }
    save=()=>{
        // console.log(this.state.codeId)
        // console.log(this.refs.code.refs.input.value)
        axios({
            url: '/change/material/'+this.state.codeId,
            method: 'post',
            data:
                {
                    code:this.refs.code.refs.input.value,
                name: this.refs.name.refs.input.value,
                model:this.refs.model.refs.input.value,
                unit:"132",
                common:this.state.common1,
                source:this.state.source1,
                processing:this.state.processing1,
                seriesId:this.state.seriesId1,
                color:this.state.color1,
                expirationType:this.state.expirationType1,
                storage:this.refs.storage.refs.input.value,
                origin:this.state.origin1,
                level:this.state.level1,
                semiType:this.state.semiType1,
                oilPaint:this.refs.oilPaint.refs.input.value,
                note:this.refs.note.refs.input.value
              }

        }).then( res=>{
            message.success('保存成功')
            this.props.onCancel();

            }

        )
    }


    render(){
        const {treeData,codeData}=this.state;
          console.log(this.state.common1)
        const repeat = data => data.map((item) => {
            let child = [];
            if (!item.children) {
                return <TreeNode title={item.name} key={item.id} value={item.id}/>;
            }
            return <TreeNode title={item.name} key={item.id} value={item.id}>{repeat(item.children, child)}</TreeNode>;
        });
        return(
            <Modal
                visible={this.props.visible}
                title={[
                    <span style={{marginLeft:'430px',fontSize:'23px'}} key='exid'>变更物料</span>,
                ]}
                style={{minWidth: 1000}}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <span className='Change' key='Change' >变更说明:</span>,
                    <TextArea type='textarea' key='TextArea1' className='TextArea1' rows={4}/>,
                    <Button key="submit"  className='Preservation' onClick={this.save}>保存</Button>,
                    <Button key="back"  className='Cancel'onClick={this.handleCancel} >取消</Button>
                ]}
            >
                <div className='Idinput'>
                    <span className='Materialid'>物料编码:</span>
                    <Select
                        showSearch
                        style={{ width:"780px",marginLeft:"35px" }}
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
                    <Button   className='Determine' onClick={this.changeCode1}>确定</Button>
                </div>

                <div className='Content'>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>*物料编码:</span>
                        <Input  className='Coding' disabled  value={this.state.code}/>
                        <Input  className='Coding1' ref="code" />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>*物料名称:</span>
                        <Input  className='Coding' disabled  value={this.state.name}/>
                        <Input  className='Coding1' ref="name" />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>*物料分类:</span>
                        <Input  className='Coding' disabled />
                        <TreeSelect style={{width:'350px',height:'400px',marginLeft:'80px'}}>
                            {repeat(treeData)}
                        </TreeSelect>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>*规格型号:</span>
                        <Input  className='Coding' disabled value={this.state.model} />
                        <Input  className='Coding1'  ref="model" />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*单位:</span>
                        <Input  className='Coding' disabled /> 
                        <Input  className='Coding1'  />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>*配置属性:</span>
                        <Input  className='Coding' disabled  value={this.state.common}/>
                        <Select   className='Source'
                                  onChange={this.common}
                        >
                            <Option value="通用">通用</Option>
                            <Option value="非通用">非通用</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*来源:</span>
                        <Input  className='Coding' disabled  value={this.state.source} />
                        <Select   className='Source'
                           onSelect={this.source}
                        >
                            <Option value="外购">外购</Option>
                            <Option value="自制">自制</Option>

                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;加工类型:</span>
                        <Input  className='Coding' disabled value={this.state.processing} />
                        <Select   className='Source'
                            onSelect={this.processing}
                        >
                            <Option value="普通" >普通</Option>
                            <Option value="细致" >细致</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;产品系列:</span>
                        <Input  className='Coding' disabled  value={this.state.seriesId}/>
                        <Select   className='Source'
                            onSelect={this.seriesId}
                        >
                            <Option value="苹果" >苹果</Option>
                            <Option value="华为" >华为</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颜色:</span>
                        <Input  className='Coding' disabled value={this.state.color} />
                        <Select   className='Source'
                            onSelect={this.color}
                        >
                            <Option value="红色" >红色</Option>
                            <Option value="蓝色" >蓝色</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;保质期:</span>
                        <Input  className='Coding' disabled  value={this.state.expirationType}/>
                        <Select   className='Source'
                            onSelect={this.expirationType}
                        >
                            <Option value="5年" >5年</Option>
                            <Option value="10年" >10年</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;存放要求:</span>
                        <Input  className='Coding' disabled value={this.state.storage}/>
                        <Input  className='Coding1'  ref="storage"/>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地:</span>
                        <Input  className='Coding' disabled  value={this.state.origin}/>
                        <Select   className='Source'
                            onSelect={this.origin}
                        >
                            <Option value="河北" >河北</Option>
                            <Option value="保定" >保定</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;材质等级:</span>
                        <Input  className='Coding' disabled  value={this.state.level}/>
                        <Select   className='Source'
                            onSelect={this.level}
                        >
                            <Option value="一级" >一级</Option>
                            <Option value="二级" >二级</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'style={{marginLeft:'-13px'}}>&nbsp;半制品种类:</span>
                        <Input  className='Coding' disabled  value={this.state.semiType}/>
                        <Select   className='Source'
                            onSelect={this.semiType}
                        >
                            <Option value="硬质" >硬质</Option>
                            <Option value="软质" >软质</Option>
                        </Select>
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;油漆面积:</span>
                        <Input  className='Coding' disabled value={this.state.oilPaint}/>
                        <Input  className='Coding1' ref="oilPaint" />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid'>&nbsp;备注说明:</span>
                        <Input  className='Coding' disabled value={this.state.note}/>
                        <Input  className='Coding1'  ref="note" />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;旧编码:</span>
                        <Input  className='Coding' disabled />
                        <Input  className='Coding1'  />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{marginLeft:'-25px'}}>&nbsp;&nbsp;&nbsp;&nbsp;ROHS属性:</span>
                        <Input  className='Coding' disabled />
                        <Input  className='Coding1'  />
                    </div>
                    <div className='Title-Materialid'>
                        <span className='Materialid' style={{width:'70.44px',testAlign:'right'}}>&nbsp;&nbsp;&nbsp;&nbsp;损耗性:</span>
                        <Input  className='Coding' disabled />
                        <Input  className='Coding1'  />
                    </div>




                </div>

            </Modal>
        )
    }
}
export default ModalForm3
