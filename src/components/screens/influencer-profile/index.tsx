import React, { useState, useRef } from 'react';
import { MenuItem } from '../../components/MenuItem';
import { Wrapper, Container, SocialMediaContainer, SocialMediaSubtitle, Instagram, Twitter } from './styles';
import { ModalAddCoupon } from '../../modals/modal-add-coupon';
import { ModalCouponsPartners } from '../../modals/modal-coupons-partners';
import { useNavigation } from '@react-navigation/native';
import { IModalAddCouponRef } from '../../modals/modal-add-coupon/@types';
import { IModalCouponsPartnersRef } from '../../modals/modal-coupons-partners/@types';

export const InfluencerProfile: React.FC = () => {

  const navigation = useNavigation()

  const createCouponRef = useRef<IModalAddCouponRef>(null)
  const couponsInfluencerRef = useRef<IModalCouponsPartnersRef>(null)

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
      <ModalCouponsPartners ref={couponsInfluencerRef} />
      <ModalAddCoupon ref={createCouponRef} isInfluencer={true} />
    </Wrapper>
  );
}
