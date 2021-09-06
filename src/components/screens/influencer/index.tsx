import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, ClipboardStatic } from 'react-native';
import { MenuItem } from '../../component/menuItem';

import { Wrapper, Container, SocialMediaContainer, SocialMediaSubtitle, Instagram, Twitter } from './styles';
import { ModalSaveCoupon } from '../../componentHeavy/modalAddCoupon';
import { MotiView } from '@motify/components';
import colors from '../../../../assets/constants/colors';
import { ModalInfluencerCoupons } from '../../componentHeavy/modalInfluencerCoupon';

export const Influencer: React.FC = () => {

  const [visibleCreateCoupon, setVisibleCreateCoupon] = useState(false)
  const [visibleInfluencerCoupon, setVisibleInfluencerCoupon] = useState(false)

  return (
    <Wrapper>

      <SocialMediaSubtitle>Minhas redes</SocialMediaSubtitle>
      <SocialMediaContainer>
        <Instagram />
        <Twitter />
      </SocialMediaContainer>
      <Container>
        <MenuItem key={'1'} icon={'plus'} text={'Novo cupom'} description={'Crie um código só seu'} cb={() => setVisibleCreateCoupon(true)} />
        <MenuItem key={'2'} icon={'archive'} text={'Meus cupons'} description={'Cupons criados por você'} cb={() => setVisibleInfluencerCoupon(true)} />
      </Container>
      {/* <MotiView
        style={{ width: '90%', height: 100, backgroundColor: colors.COLOR_BLACK10, position: 'absolute', borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}
      >
        <Text>ADONISDODA</Text>
        <Feather color={colors.COLOR_SECUNDARY_BLACK} size={20} name='copy' />
      </MotiView> */}
      <ModalInfluencerCoupons visible={visibleInfluencerCoupon} onClose={() => setVisibleInfluencerCoupon(false)} />
      <ModalSaveCoupon visible={visibleCreateCoupon} onClose={() => setVisibleCreateCoupon(false)} isInfluencer={true} />
    </Wrapper>
  );
}
