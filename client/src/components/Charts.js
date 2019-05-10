import React, { PureComponent } from 'react'

import { PieChart, Pie, Sector, Cell } from 'recharts';

class Charts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            colors: ['#0088fe', '#00c49f', '#ffbb28', '#ff8042']
        }
    }

    // componentDidMount(){
    //     const {categoryItems} = this.props
    //     category.Items
    // }


    render() {
        return (
            <>
                {
                    this.props.allData.map(info => (

                        <>
                            <div>{info.category}</div>
                            <PieChart width={800} height={400}>
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
                                >
                                    {
                                        info.value.map((entry, index) =>
                                            <Cell key={index}
                                                fill={this.state.colors[index % this.state.colors.length]} />)
                                    }



                                </Pie>
                            </PieChart>
                        </>
                    ))

                }
            </>
        )
    }



}

export default Charts