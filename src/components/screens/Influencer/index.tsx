import React, { useState, useRef } from 'react';
import { MenuItem } from '../../components/MenuItem';
import { Wrapper, Container, SocialMediaContainer, SocialMediaSubtitle, Instagram, Twitter } from './styles';
import { SaveOrCreateCoupon } from '../../modals/SaveOrCreateCoupon';
import { CouponsInfluencerModal } from '../../modals/CouponsInfluencer';
import { useNavigation } from '@react-navigation/native';
import { ISaveOrCreateCouponRef } from '../../modals/SaveOrCreateCoupon/@types';
import { IModalCouponsInfluencerRef } from '../../modals/CouponsInfluencer/@types';

export const Influencer: React.FC = () => {

  const navigation = useNavigation()

  const createCouponRef = useRef<ISaveOrCreateCouponRef>(null)
  const couponsInfluencerRef = useRef<IModalCouponsInfluencerRef>(null)

  return (
    <Wrapper>

      <SocialMediaSubtitle>Minhas redes</SocialMediaSubtitle>
      <SocialMediaContainer>
        <Instagram />
        <Twitter />
      </SocialMediaContainer>
      <Container>
        <MenuItem key={'1'} icon={'plus'} text={'Novo cupom'} description={'Crie um código só seu'} cb={() => createCouponRef.current?.show()} />
        <MenuItem key={'2'} icon={'archive'} text={'Meus cupons'} description={'Cupons criados por você'} cb={() => couponsInfluencerRef.current?.openModal()} />
        <MenuItem key={'3'} icon={'divide'} text={'Ofertas disponíveis'} description={'Associe seus cupons'} cb={() => navigation.navigate('Offers')} />
      </Container>
      <CouponsInfluencerModal ref={couponsInfluencerRef} />
      <SaveOrCreateCoupon ref={createCouponRef} isInfluencer={true} />
    </Wrapper>
  );
}
