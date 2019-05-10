import React, { PureComponent } from 'react'

import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';

class Charts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            colors: ['#0088fe', '#00c49f', '#ffbb28', '#ff8042'],
        }
    }

    componentDidMount() {
        console.log('allData', this.props.allData)
    }



    render() {
        return (
            <>
                {

                    this.props.allData.map(info => (
                        <React.Fragment key={Math.random()}>
                            <div>{info.category}</div>
                            <PieChart width={800} height={400}>
                                <Tooltip />
                                <Pie
                                    data={info.value}
                                    cx={420}
                                    cy={300}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey='value'
                                    onMouseEnter={(e, activeIndex) => this.setState({ activeIndex })}
                                    onMouseLeave={() => this.setState({ activeIndex: -1 })}
                                >
                                    {
                                        info.value.map((entry, index) =>
                                            <Cell key={index} fill={this.state.colors[index % this.state.colors.length]} fillOutline={this.state.activeIndex === index ? 1 : 0.25} />)
                                    }
                                </Pie>
                            </PieChart>
                        </React.Fragment>
                    ))


                }
            </>
        )
    }



}

export default Charts