import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { Wrapper, ContainerLeft, Line, Dot, RightContainer, Name, Points, Percent, Box, ContainerText } from './styles';

const CouponsTimeline: React.FC = () => {

  const TimelineItem: React.FC = () => {
    return (
      <Wrapper >
        <ContainerLeft >
          <Percent>15%</Percent>
          <Dot />
          <Line />
        </ContainerLeft>
        <RightContainer >
          <Box>
            <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: "https://pbs.twimg.com/profile_images/1402367254067568641/LTLk2lAL.jpg" }} />
          </Box>
          <ContainerText>
            <Name>Restaurante Don Juan</Name>
            <Points>100 pontos</Points>
          </ContainerText>
        </RightContainer>
      </Wrapper>
    )
  }

  return (
    <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FFF" }}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => <TimelineItem />}
    />

  );
}

export default CouponsTimeline;
