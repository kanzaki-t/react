import React, { Component } from 'react'

export default class Hello extends Component {
  constructor(props) {
    super(props);
    
    // 判断是否有参数传入
    const hasParams = props.params && Object.keys(props.params).length > 0;

    // 初始化 state
    this.state = {
      obj:  {},
      rows: hasParams ? Object.entries(props.params).map(([key, value]) => ({ key, value })) : [{ key: "", value: "" }]
    };

    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddRow = () => {
    this.setState((prevState) => ({
      rows: [...prevState.rows, { key: "", value: "" }],
    }));
  };

  handleDeleteRow = (index) => {
    this.setState((prevState) => ({
      rows: prevState.rows.filter((row, i) => i !== index),
    }));
  };

  handleInputChange = (index, e) => {
    const { value,name } = e.target;
    this.setState((prevState) => {
      const { rows } = prevState;
      rows[index][name] = value; // 更新指定行的指定 key 的值
      return { rows };
    });
  };

  // 提交数据
  handleSubmit = () => {
    const { obj, rows } = this.state;
    const newObj = {};
    rows.forEach((row) => {
      if (row.key && row.value) {
        newObj[row.key] = row.value;
      }
    });
    this.setState({ obj: { ...obj, ...newObj }, rows: [{ key: "", value: "" }] });
  };

  render() {
    const {  rows } = this.state;
    return (
      <div>
        {
          rows.map((row, index) => (
            <div key={index}>
              <input
                name="key"
                value={row.key}
                placeholder="Key"
                onChange={(e) => this.handleInputChange(index, e)}
              />
              <input
                name="value"
                value={row.value}
                placeholder="Value"
                onChange={(e) => this.handleInputChange(index, e)}
              />
              <button onClick={() => this.handleAddRow()}>+</button>
              <button onClick={() => this.handleDeleteRow(index)}>-</button>
            </div>
          ))}
          <button onClick={() => this.handleSubmit()}>handleSubmit</button>
      </div>
    );
  }
}