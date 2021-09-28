import React from 'react';
import { Linking, View } from 'react-native';
import { MenuItem } from '../../components/menuItem';

import { Wrapper, ContainerScroll } from './styles';

export const HelpScreen: React.FC = () => {
  return (
    <Wrapper>
      <ContainerScroll>
        <MenuItem
          key={'0'}
          description='Acesse o nosso tutorial'
          text='Dúvidas'
          icon='book-open'
          cb={
            () => Linking
              .openURL('https://enshrined-bubbler-645.notion.site/Klubbs-para-estabelecimentos-3052e0851f824962882da94b7705d02d')}
        />

        <MenuItem
          key={'1'}
          text='Fale conosco'
          description='Envie sugestões ou receba ajuda'
          icon='mail'
          cb={
            () => Linking
              .openURL('mailto: marketing@klubbs.com.br?subject=Oi, Klubbs tenho uma sugestão!')}
        />
      </ContainerScroll>
    </Wrapper>
  );
}
