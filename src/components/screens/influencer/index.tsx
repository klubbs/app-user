import React, { useState } from 'react';
import { MenuItem } from '../../component/menuItem';
import { Wrapper, Container, SocialMediaContainer, SocialMediaSubtitle, Instagram, Twitter } from './styles';
import { ModalSaveCoupon } from '../../modals/modalAddCoupon';
import { ModalInfluencerCoupons } from '../../modals/modalInfluencerCoupon';
import { useNavigation } from '@react-navigation/native';

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
        <MenuItem key={'3'} icon={'divide'} text={'Cupons disponíveis'} description={'Cupons de estabelecimentos'} cb={() => navigation.navigate('MasterCoupons')} />
      </Container>
      <ModalInfluencerCoupons visible={visibleInfluencerCoupon} onClose={() => setVisibleInfluencerCoupon(false)} />
      <ModalSaveCoupon visible={visibleCreateCoupon} onClose={() => setVisibleCreateCoupon(false)} isInfluencer={true} />
    </Wrapper>
  );
}
