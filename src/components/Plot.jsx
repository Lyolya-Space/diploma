import React, {useEffect, useState} from 'react'
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    MarkSeries,
    Hint
  } from 'react-vis'

function Plot({ testName, result, tests}) {

    const [data, setData] = useState([])
    const [res, setRes] = useState([])
    
    var max = 4

    useEffect(() => {
        var array = [{x: 0, y: 0}]
        tests.forEach( test => {
            test.t_results.forEach( r => {
                var found = false
                array.forEach(d => {
                    if(d.x===Math.round(r.t_result)  && test.t_name===testName){
                        d.y++
                        if(d.y>max){
                            max=d.y
                        }
                        found=true
                    }
                })
                if(found===false && test.t_name===testName)
                    array.push({x: Math.round(r.t_result), y: 1})
            })
        })
        array.forEach(a => {
            if (a.x===result){
                setRes([{x: a.x, y: a.y}])
            }
        })
        array.sort(function(a,b){ 
            return (a.x - b.x)
          })
        array.push({x: 100, y: 0})
        setData(array)
    }, [])
    
    
    useEffect(() => {
    }, [data, res])
    
    
    return (<>
     <p>{testName}</p>
        <XYPlot width={300} height={300} yDomain={[0,max]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="%"/>
            <YAxis title="Количество человек"/>

            <LineSeries
                data={data}
            />
            <MarkSeries
                data={res}/>
            <Hint
                value={res[0]}
                horizontalAlign={Hint.ALIGN.RIGHT}
                verticalAlign={Hint.ALIGN.BOTTOM}
            >
                <div className="custom-hint">Ваш результат</div>
            </Hint>
            </XYPlot>
    </>
       
    );
  }
  
  export default Plot