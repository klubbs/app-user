import React, { useState } from 'react';
import { MenuItem } from '../../components/MenuItem';
import { Wrapper, Container, SocialMediaContainer, SocialMediaSubtitle, Instagram, Twitter } from './styles';
import { AddCouponModal } from '../../screensModals/addCouponModal';
import { InfluencerCouponsModal } from '../../screensModals/influencerCouponsModal';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behaviorUtils';

export const Influencer: React.FC = () => {

  const navigation = useNavigation()

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
        <MenuItem key={'3'} icon={'divide'} text={'Estabelecimentos disponíveis'} description={'Associe seus cupons'} cb={() => navigation.navigate('MasterCoupons')} />
      </Container>
      <KeyboardAvoidingView behavior={'position'}>
        <InfluencerCouponsModal visible={visibleInfluencerCoupon} onClose={() => setVisibleInfluencerCoupon(false)} />
      </KeyboardAvoidingView>
      <AddCouponModal visible={visibleCreateCoupon} onClose={() => setVisibleCreateCoupon(false)} isInfluencer={true} />
    </Wrapper>
  );
}
