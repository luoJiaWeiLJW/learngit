import React, {Component} from 'react';
import {Form, Modal} from 'antd';
// import axios from "axios";
import ProcessDetailTable1 from './ProcessDetailTable1'


class ModalForm extends Component {
    // state = {
    //     resourceData: [],
    // };
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, fieldsvalue) => {
    //         if (err) {
    //             return false;
    //         }
    //         this.props.onOk(
    //             {...this.props.modalData, ...fieldsvalue}
    //         )
    //     })
    // };
    // componentDidMount = () => {
    //     axios({
    //         url: "/session/group/tree",
    //         method: "get"
    //     }).then(res => {
    //         if (res.data.code != 200) return;
    //         const treeData = [];
    //         let data = res.data.data;
    //         const repeat = (data, treeData) => {
    //             for (let i = 0; i < data.length; i++) {
    //                 let child = [];
    //                 if (!data[i].groups) {
    //                     treeData.push(<TreeNode title={data[i].name} value={data[i].id} key={data[i].id} isLeaf={true}/>);
    //                 }
    //                 else {
    //                     treeData.push(<TreeNode title={data[i].name} value={data[i].id} key={data[i].id}>{repeat(data[i].groups, child)}</TreeNode>);
    //                 }
    //             }
    //             return treeData;
    //         };
    //         const resourceData = repeat(data, treeData);
    //         this.setState({resourceData})
    //     }).catch(e => {
    //         message.error("系统出错,请重新尝试")
    //     })
    // };
    render() {
        // const {getFieldDecorator} = this.props.form;
        // const {resourceData} = this.state;
        // const FormItems = [];
        // const formItemLayout = {
        //     labelCol: {
        //         xs: {span: 24},
        //         sm: {span: 6},
        //     },
        //     wrapperCol: {
        //         xs: {span: 24},
        //         sm: {span: 14},
        //     },
        // };
        // const {modalType, modalData} = this.props;
        // const input =<Input autoComplete="off"/>;
        // const disinput=<Input disabled={true} autoComplete="off"/>;
        return (
            <Modal
                visible={this.props.visible}
                title={'工序详情'}
                style={{textAlign:'center',minWidth:1000}}
                onCancel={this.props.onCancel}
                // onOk={modalType !== 'detail' ? this.handleSubmit : this.props.onCancel}
            >
                <ProcessDetailTable1 />
            </Modal>
        )
    }
}

const ModalForm1 = Form.create()(ModalForm);
export default ModalForm1