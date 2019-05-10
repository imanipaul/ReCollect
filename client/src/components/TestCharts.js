// import React, { PureComponent } from 'react';
// import {
//     PieChart, Pie, Sector, Cell, Tooltip
// } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
//     { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
// ];
// function getIntroOfPage(label) {
//     if (label === 'Page A') {
//         return 'Page A is about men\'s clothing';
//     } if (label === 'Page B') {
//         return 'Page B is about women\'s dress';
//     } if (label === 'Page C') {
//         return 'Page C is about women\'s bag';
//     } if (label === 'Page D') {
//         return 'Page D is about household goods';
//     } if (label === 'Page E') {
//         return 'Page E is about food';
//     } if (label === 'Page F') {
//         return 'Page F is about baby food';
//     }
// }

// function CustomTooltip({ payload, label, active }) {
//     if (active) {
//         return (
//             <div className="custom-tooltip">
//                 <p className="label">{`${label} : ${payload[0].value}`}</p>
//                 <p className="intro">{getIntroOfPage(label)}</p>
//                 <p className="desc">Anything you want can be displayed here.</p>
//             </div>
//         );
//     }

//     return null;
// }

// export default class Example extends PureComponent {
//     static jsfiddleUrl = 'https://jsfiddle.net/alidingling/pb1jwdt1/';

//     render() {
//         return (
//             <PieChart width={400} height={400}>
//                 <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
//                 {/* <Tooltip content={<CustomTooltip />} /> */}
//             </PieChart>
//         );
//     }
// }


import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts'

const data = [
    { name: 'Milk', value: 1 },
    { name: 'Butter', value: 2 },
    { name: 'Coffee', value: 2.5 },
    { name: 'Eggs', value: 4 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class TestCharts extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';

    render() {
        return (
            <PieChart width={800} height={400} >
                <Pie
                    data={data}
                    cx={420}
                    cy={300}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    // fill='black'
                    paddingAngle={3}
                    dataKey='value'
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }


                </Pie>

            </PieChart>
        )
    }
}

