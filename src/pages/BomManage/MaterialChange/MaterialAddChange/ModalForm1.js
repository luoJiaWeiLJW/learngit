import React, {Component} from 'react';
import {Modal, Form, Input, Select, message, Row, Col,TreeSelect,Button} from 'antd';
import axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class ModalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsvalue) => {
      if (err) {
        return false;
      }
      const data = {};
      Object.keys(fieldsvalue).forEach(key => {
        data[key] = fieldsvalue[key]
      });
      this.props.onOk(data)

    })
  };
  state = { //以下几个数据都是需要用到的下拉框选项
    treeData: [],
    groups: [],
    users: [],
    csgUsers: []
  };
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
    onLoadData = (treeNode) => {
         console.log(treeNode.props.value,'555')

        return new Promise((resolve) => {
            console.log(treeNode)
            if (treeNode.props.children) {
                resolve();
                return;
            }
            axios({
                url: '/tree/material_category/pid/'+ treeNode.props.value +'/children',
                method: 'get'
            }).then(res => {

                if (res.data.code !== "200") {
                    message.success('网络异常,请稍后重试');
                    return
                }
                treeNode.props.dataRef.children = (res.data.data ? res.data.data : []);

                this.setState({
                    treeData: [...this.state.treeData],
                })
               
                resolve();
            }).catch(e => {
                message.warning('网络异常,请稍后重试');
                this.setState({
                })
            })
        });
    }

  handleCancel = (e) => {
    this.props.onCancel();
  };
  onSelect=()=>{
      console.log('1')
  }
  render() {
    const {treeData}=this.state;
      const {modalData, modalType} = this.props;
    // const {modalData} = this.props;
    const {getFieldDecorator} = this.props.form;
    const FormItems = [];
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const formItemLayoutReset = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const repeat = data => data.map((item) => {
      let child = [];
      if (!item.children) {
        return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} />;
      }
      return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} disabled>{repeat(item.children, child)}</TreeNode>;
    });

    Object.keys(modalData).forEach((key) => {
      let config = {
        rules: [{
          required: true,
          message: "请输入" + this.props.modalData[key].title,
          whitespace: true
        }, {max: 32, message: "请不要超过最大长度32位"}]
      };
      let input = <Input autoComplete="off" style={{width: '100%'}}/>;
     
      switch (key) {
        case "categoryId":
          FormItems.push(
            <Col xs={24} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                {getFieldDecorator(key, config)(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    loadData={this.onLoadData}
                    onChange={this.onSelect}
                    treeDefaultExpandAll
                    >
                {repeat(treeData)}
                    </TreeSelect>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "code":
          FormItems.push(
            <Col xs={24} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                {getFieldDecorator(key, config)(input)}
              </FormItem>
            </Col>
          );
          break;
        case "name":
        case "unit":
        case "model":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key, config)(input)}
              </FormItem>
            </Col>
          );
          break;
        case "common":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key, config)(
                  <Select
                  >
                    <Option value="0">通用</Option>
                    <Option value="1">非通用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "source":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key, config)(
                  <Select>
                    <Option value="0">外购</Option>
                    <Option value="1">自制</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "processing":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "seriesId":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "color":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "expirationType":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;

        case "origin":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "level":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "semiType":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "note":
          FormItems.push(
            <Col xs={24} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                {getFieldDecorator(key)(input)}
              </FormItem>
            </Col>
          );
          break;
        default:
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(input)}
              </FormItem>
            </Col>
          );
          break;
      }
    });
    {
      modalType === "add" ?
        FormItems.push(
          <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
            <Button onClick={this.handleSubmit}>保存</Button>&nbsp;&nbsp;
            <Button onClick={this.handleCancel}>取消</Button>
          </Col>
        )
        :
        FormItems.push(
          <Col xs={24} key={'edit'} style={{textAlign: 'center'}}>
            {/*<Button onClick={this.handleSubmit}>审核通过</Button>&nbsp;&nbsp;*/}
            {/*<Button onClick={this.handleSubmit}>驳回</Button>*/}
            {/*<Button onClick={this.handleSubmit}>否决</Button>*/}
            <Button onClick={this.handleCancel}>取消</Button>
          </Col>
        );
    }
    return (
      <Modal
        visible={this.props.visible}
        title={[
        <span style={{marginLeft:'430px',fontSize:'23px'}} key='exid'>新增物料</span>,
      ]}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        style={{minWidth: 1000}}
        footer={null}
      >
        <Form>
          <Row gutter={40}>
            {FormItems}
          </Row>
        </Form>
      </Modal>
    )
  }
}

const ModalForm1 = Form.create(
  {
    mapPropsToFields(props) {
      const obj = {};
      Object.keys(props.modalData).forEach((key) => {
        const value = props.modalData[key].value;
        obj[key] = {value}
      });

      return obj
    }
  }
)(ModalForm);
export default ModalForm1