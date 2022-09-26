import React from 'react';
import { Linking, View } from 'react-native';
import { MenuItem } from '../../components/MenuItem';

import { Wrapper, ContainerScroll } from './styles';

export const UserSettings: React.FC = () => {
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
        <MenuItem
          key={'1'}
          text='Acesso de influenciador'
          description='Solicite acesso como influenciador'
          icon='thumbs-up'
          cb={() => Linking
            .openURL(
              `mailto:marketing@klubbs.com.br
              ?subject=Solicitar acesso de influenciador
              &body=Conta um pouquinho sobre você . Ah , diz também as suas redes sociais de trabalho para gente ;)                                     
          `)}
        />
      </ContainerScroll>
    </Wrapper>
  );
}
