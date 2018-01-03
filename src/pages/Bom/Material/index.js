import React, {Component} from 'react';
// import Table1 from './Table1';
import BreadcrumbCustom from '../../../components/BreadcrumbCustom';
import {Row,Col,Card} from 'antd';

class  Material extends Component {
  render () {
    return (
      <div className="gutter-example">
        <BreadcrumbCustom first="bom管理" second="物料列表" />
        <div>
          <h1>hello word</h1>
        </div>
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <div className="gutter-box">
              <Row>
                <Card bordered={false} style={{minHeight:300}}>
                  {/*<Table1/>*/}
                </Card>
              </Row>
            </div>
            <div className="gutter-box">
              <Row>
                <Card bordered={false} style={{minHeight:350}}>
                  {/*<Table1/>*/}
                </Card>
              </Row>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card bordered={false} style={{minHeight:665}}>
                {/*<Table1/>*/}
              </Card>
            </div>
          </Col>
        </Row>
        <style>
          {`
            .gutter-box{
              margin-bottom:16px;
             }
          `}
        </style>
      </div>

    )
  }

}

export default Material;