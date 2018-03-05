import React from 'react';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines';
import _ from 'lodash';

export default (props) => {
  const {data, color, units} = props;

  const renderAverage = (data) => {
    return _.round(_.sum(data)/data.length);
  };

  return (
    <div>
      <Sparklines
        height={120}
        width={180}
        data={data}
      >
        <SparklinesLine color={color}/>
        <SparklinesReferenceLine type="avg"/>
      </Sparklines>
      <div>
        {renderAverage(data)} {units}
      </div>
    </div>
  );
}