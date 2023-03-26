import React, { Component } from 'react'

export default class Hello extends Component {
  constructor(props) {
    super(props);

    // 判断是否有参数传入
    const hasParams = props.params && Object.keys(props.params).length > 0;

    // 初始化 state
    this.state = {
      obj: {},
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
    const { rows } = this.state;
    if (rows.length > 1) {
      this.setState((prevState) => ({
        rows: prevState.rows.filter((row, i) => i !== index),
      }));
    }

  };

  handleInputChange = (index, e) => {
    const { value, name } = e.target;
    this.setState((prevState) => {
      const { rows } = prevState;
      rows[index][name] = value; // 更新指定行的指定 key 的值
      return { rows };
    });
  };

  // 提交数据
  handleSubmit = () => {
    const { rows } = this.state;

    // 判断是否所有行的 input 均为空
    const isAllEmpty = rows.every((row) => row.key === "" && row.value === "");

    if (isAllEmpty) {
      // 如果所有行的 input 均为空，则重置 rows 数组为只有一行
      this.setState({ rows: [{ key: "", value: "" }] });
    } else {
      // // 否则，筛选出 input 不为空的行，更新 rows 数组
      // const nonEmptyRows = rows.filter((row) => row.key !== "" && row.value !== "");
      // this.setState({ rows: nonEmptyRows });

      
      // 否则，筛选出 input 不为空的行，更新 rows 数组
      const nonEmptyRows = rows.filter((row) => row.key !== "" && row.value !== "");
      // 筛选出key不相等的行
      const uniqueRows = nonEmptyRows.filter((row, index, self) => {
        return self.findIndex((r) => r.key === row.key) === index;
      });
      this.setState({ rows: uniqueRows });
    }

    // 把rows整合成对象
    const { obj } = this.state;
    const newObj = rows.reduce((acc, row) => {
      if (row.key && row.value) {
        acc[row.key] = row.value;
      }
      return acc;
    }, {});
    this.setState({ obj: { ...obj, ...newObj } });
  };

  render() {
    const { rows } = this.state;
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