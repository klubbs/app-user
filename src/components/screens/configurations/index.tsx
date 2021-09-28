import React from 'react';
import { Linking, View } from 'react-native';
import { MenuItem } from '../../components/menuItem';

import { Wrapper, ContainerScroll } from './styles';

export const ConfigurationsScreen: React.FC = () => {
  return (
    <Wrapper>
      <ContainerScroll>
        <MenuItem
          key={'0'}
          text='Permissões'
          description='Conceda permissões ao app'
          icon='toggle-right'
          cb={() => Linking.openSettings()}
        />
      </ContainerScroll>
    </Wrapper>
  );
}
