import React, { PureComponent } from 'react'
import '../stylesheets/Charts.css'


import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';

class Charts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            colors: ['#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#00539C', '#001F3A', '#00886E', '#004E40', '#ECA101', '#9E6B01', '#F35001', '#B83B00'],
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
                        <div key={Math.random()} className='individual-chart'>
                            <h3>{info.category}</h3>
                            <PieChart width={175} height={200}>
                                <Tooltip />
                                <Pie
                                    data={info.value}
                                    cx={80}
                                    cy={100}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey='value'
                                >
                                    {
                                        info.value.map((entry, index) =>
                                            <Cell key={index} fill={this.state.colors[index % this.state.colors.length]} fillOutline={this.state.activeIndex === index ? 1 : 0.25} />)
                                    }
                                </Pie>
                            </PieChart>
                        </div>
                    ))


                }
            </>
        )
    }



}

export default Charts