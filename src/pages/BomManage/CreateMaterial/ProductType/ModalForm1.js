import React, {Component} from 'react';
import {Form, Input, Modal,Button} from 'antd';
const FormItem = Form.Item;

class ModalAccredit extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsvalue) => {
            if (err) {
                return false;
            }
            this.props.onOk(
                {...this.props.modalData, ...fieldsvalue}
            )
        })
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const {modalData,modalType} = this.props;
        const input = <Input autoComplete="off"/>;
        return (
            <Modal
              visible={this.props.visible}
              title={modalType==="add"?'新增分类':'编辑分类'}
              onCancel={this.props.onCancel}
              onOk={this.handleSubmit}
              footer={null}
            >
                <Form>
                    <FormItem hasFeedback {...formItemLayout} label='编码' key='code'>
                        {getFieldDecorator('code', {
                            initialValue: modalData['code'],
                            rules: [
                                {required: true, message: "编码不能为空", whitespace: true},
                            ]
                        })(input)}
                    </FormItem>
                    <FormItem hasFeedback {...formItemLayout} label='分类名称' key='name'>
                        {getFieldDecorator('name', {
                            initialValue: modalData['name'],
                            rules: [
                              {required: true, message: "分类名称不能为空", whitespace: true},
                            ]
                        })(input)}
                    </FormItem>
                    <div style={{textAlign:"center"}}><Button type="primary" onClick={this.handleSubmit}>保存</Button></div>
                </Form>
            </Modal>
        )
    }
}

const ModalForm1 = Form.create()(ModalAccredit);
export default ModalForm1