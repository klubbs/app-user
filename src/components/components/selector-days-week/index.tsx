import React, { useEffect, useState } from 'react';
import { Selector } from '../Selector';

import { Wrapper, Container, Text, WrapperSelector } from './styles';

export const SelectorDaysWeek: React.FC<{
  cbSelectDay?: (day: number) => void;
  hasSelector?: boolean;
  initSelectedDays?: number[];
}> = ({ cbSelectDay, hasSelector = true, initSelectedDays = [] }) => {
  const [days, setDays] = useState([
    { txt: 'SEG', selected: false, value: 1 },
    { txt: 'TER', selected: false, value: 2 },
    { txt: 'QUA', selected: false, value: 3 },
    { txt: 'QUI', selected: false, value: 4 },
    { txt: 'SEX', selected: false, value: 5 },
    { txt: 'SAB', selected: false, value: 6 },
    { txt: 'DOM', selected: false, value: 0 },
  ]);

  useEffect(() => {
    if (initSelectedDays.length > 0) {
      setDays(
        days.map((item) => {
          const match = initSelectedDays.find((i) => i === item.value);

          if (match !== undefined) {
            item.selected = true;
          }

          return item;
        }),
      );
    }
  }, []);

  function handleSelect(item: { txt: string; selected: boolean; value: number }, index: number) {
    if (cbSelectDay) {
      cbSelectDay(item.value);
    }

    let newState = [...days];

    newState[index].selected = !item.selected;

    setDays(newState);
  }

  return (
    <Wrapper autoSpacing={initSelectedDays.length > 0}>
      {initSelectedDays.length === 0 &&
        days.map((item, index) => {
          return (
            <WrapperSelector key={index}>
              <Container active={item.selected}>
                <Text>{item.txt}</Text>
              </Container>

              {hasSelector && <Selector onPress={() => handleSelect(item, index)} />}
            </WrapperSelector>
          );
        })}
      {initSelectedDays.length > 0 &&
        days.map((item, index) => {
          if (item.selected) {
            return (
              <WrapperSelector key={index} autoSpacing={true}>
                <Container active={item.selected}>
                  <Text>{item.txt}</Text>
                </Container>

                {hasSelector && <Selector onPress={() => handleSelect(item, index)} />}
              </WrapperSelector>
            );
          }
        })}
    </Wrapper>
  );
};
