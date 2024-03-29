import React, { useState } from 'react';
import logo from './logo.svg'
import 'antd/dist/antd.css';
import './App.scss';
import {Form, Input, Button, Space, Select, Checkbox} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function App() {

  const [gpa, setGpa] = useState(0);

  const onFinish = (values: any) => {
    var total = 0;
    var totalCredits = 0;
    for (var i = 0; i < values.class_list.length; i++) {
      var currTotal = 0;
      currTotal += values.class_list[i].grade
      if (values.class_list[i].isAP) {
        currTotal += 0.25
      }
      totalCredits += values.class_list[i].credits
      total += (currTotal * values.class_list[i].credits)
    }
    setGpa(Math.round((total / totalCredits) * 100) / 100)
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='form-header'>
        <h1>ASD GPA Calculator</h1>
      </div>
      <div className='form-container'>
        <Form className="form-class-list" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <Form.List name="class_list">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} className='form-horz-container' align="baseline" size={"small"} >
                    <Form.Item
                      {...restField}
                      name={[name, 'class']}
                      className="class-name-container"
                      rules={[{ message: 'Missing Class Name' }]}
                    >
                      <Input placeholder="Class Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'credits']}
                      className="credits-container"
                      rules={[{ required: true, message: '', type: 'number' }]}
                    >
                      <Select
                        placeholder="Course Length"
                        allowClear
                      >
                        <Option value={1}>Full-Year</Option>
                        <Option value={0.5}>Semester</Option>
                        
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'grade']}
                      className="grade-container"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Select
                        placeholder="Grade"
                        allowClear
                      >
                        <Option value={4}>A</Option>
                        <Option value={3.7}>A-</Option>
                        <Option value={3.3}>B+</Option>
                        <Option value={3}>B</Option>
                        <Option value={2.7}>B-</Option>
                        <Option value={2.3}>C+</Option>
                        <Option value={2}>C</Option>
                        <Option value={1.7}>C-</Option>
                        <Option value={1.3}>D+</Option>
                        <Option value={1}>D</Option>
                        <Option value={0.5}>D-</Option>
                        <Option value={0}>F</Option>
                        
                      </Select>
                    </Form.Item>
                    <Form.Item valuePropName="checked"
                      {...restField}
                      name={[name, 'isAP']}
                    >
                      <Checkbox>is AP?</Checkbox>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button className="add-field-button" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add class
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='GPA-container'>
        <h1>GPA: {gpa.toFixed(2)}</h1>
      </div>
      <div className='footer-container'>
        <h2>Made with ❤️ by <a href='https://github.com/msorial44' target="_blank" rel="noreferrer">Mark Sorial</a></h2> 
      </div>
    </div>
  );
}

export default App;
