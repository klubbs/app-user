import React, { useCallback, useEffect, useState } from 'react';
import { Selector } from '../Selector';

import { Wrapper, Container, Text, WrapperSelector } from './styles';

export const DaysOfWeek: React.FC<{ cb?: (day: number) => void, hasSelector?: boolean, initSelectedDays?: number[] }> =
  ({ cb, hasSelector = true, initSelectedDays = [] }) => {

    const [days, setDays] = useState([
      { txt: 'SEG', selected: false, value: 1 },
      { txt: 'TER', selected: false, value: 2 },
      { txt: 'QUA', selected: false, value: 3 },
      { txt: 'QUI', selected: false, value: 4 },
      { txt: 'SEX', selected: false, value: 5 },
      { txt: 'SAB', selected: false, value: 6 },
      { txt: 'DOM', selected: false, value: 0 }
    ])

    useEffect(() => {

      if (initSelectedDays.length > 0) {
        const temp = days.map(item => {
          const match = initSelectedDays.find(i => i === item.value)

          if (match !== undefined) {
            item.selected = true
          }

          return item;
        })

        setDays(temp)

      }

    }, [])


    return (
      <Wrapper autoSpacing={initSelectedDays.length > 0}>
        {
          initSelectedDays.length === 0 && days.map((item, index) => {
            return (
              <WrapperSelector key={index}>
                <Container active={item.selected}>
                  <Text>{item.txt}</Text>
                </Container>

                {hasSelector &&
                  <Selector onPress={() => {
                    if (cb) {
                      cb(item.value)
                    }
                    let newState = [...days];

                    newState[index].selected = !item.selected;

                    setDays(newState)
                  }} />
                }
              </WrapperSelector>
            )

          })
        }
        {
          initSelectedDays.length > 0 && days.map((item, index) => {
            if (item.selected) {
              return (
                <WrapperSelector key={index} autoSpacing={true}>
                  <Container active={item.selected}>
                    <Text>{item.txt}</Text>
                  </Container>

                  {hasSelector &&
                    <Selector onPress={() => {
                      if (cb) {
                        cb(item.value)
                      }
                      let newState = [...days];

                      newState[index].selected = !item.selected;

                      setDays(newState)
                    }} />
                  }
                </WrapperSelector>
              )
            }

          })
        }
      </Wrapper>
    );
  }
