import React, { useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LocationSelector } from '../../components/LocationSelector';
import { colors } from '../../../../assets/constants/colors';
import { ContainerLocation, SearchPressable, ContainerSearch, Input } from './styles';
// import { Container } from './styles';

const CommandUserBar: React.FC = () => {
  const [openSearch, setOpeanSerch] = useState(false);

  return (
    <>
      <ContainerSearch>
        <SearchPressable
          onPress={() => setOpeanSerch(true)}
          animate={{
            width: openSearch ? 250 : 35,
            marginRight: openSearch ? 40 : 0,
          }}
          transition={{
            type: 'spring',
          }}
        >
          {openSearch && <Input />}
          {!openSearch && <Feather name={'search'} size={16} color={colors.COLOR_BLACK40} />}
        </SearchPressable>
        {openSearch && (
          <Feather
            name={'x-circle'}
            size={16}
            color={colors.COLOR_BLACK40}
            onPress={() => setOpeanSerch(false)}
          />
        )}
      </ContainerSearch>
      {!openSearch && (
        <ContainerLocation>
          <LocationSelector />
        </ContainerLocation>
      )}
    </>
  );
};

export { CommandUserBar };
