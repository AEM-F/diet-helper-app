import * as React from 'react';

export default function CarouselItem(props)
{
    return (
      <div className={'item-wrapper'}>
          <h1 className={'item-title'}>{props.title}</h1>
          <div className={'item-progress-wrapper'}>
              <div className={'item-progress-normal'}>
                  <span className={'progress-normal'}/>
              </div>
              <div className={'item-progress-over'}>
                  <span className={'progress-over'}/>
              </div>
          </div>
          <div className={'item-details'}>
              <div className={'details-item'}>
                  <p>BUDGET</p>
                  <p>{props.budget}</p>
              </div>
              <div className={'details-item'}>
                  <p>CONSUMED</p>
                  <p>{props.consumed}</p>
              </div>
              <div className={'details-item-remaining'}>
                  <p>UNDER</p>
                  <p>100</p>
              </div>
          </div>
      </div>
    );
}
