import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize'
import { DaysOfWeek } from '../../components/DaysOfWeek';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/couponServiceTypes';
import {
  Wrapper,
  Name,
  Description,
  Divider,
  MinimumTicket,
  MinimumTicketSubtitle,
  WrapperTicket,
  ExpireIn,
  WrapperOff,
  Off
} from './styles';

export const QrCouponsRules: React.FC<{ data: IWalletCouponsResponseOfferData | null, onClose: any }> =
  (props) => {

    const modalizeRef = useRef<Modalize>()


    useEffect(() => {

      if (props.data !== null) {
        modalizeRef.current?.open();
      }

    }, [props])

    return (
      <Modalize
        onClose={props.onClose}
        modalHeight={500}
        ref={modalizeRef}
      >
        <Wrapper>
          <Name>{props?.data?.establishment_name}</Name>
          <ExpireIn>Esta oferta expira em: {props
            .data?.master_coupon_valid_at
            .ToDateFormat()
            .toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</ExpireIn>
          <Divider />
          <DaysOfWeek hasSelector={false} initSelectedDays={props.data?.master_coupon_working_days} />

          <WrapperTicket>
            <MinimumTicketSubtitle>• Desconto </MinimumTicketSubtitle>
            <WrapperOff>
              <Off>{props.data?.master_coupon_off_percentual}%</Off>
            </WrapperOff>
          </WrapperTicket>

          <WrapperTicket>
            <MinimumTicketSubtitle>• valor mínimo </MinimumTicketSubtitle>
            <MinimumTicket>
              {
                props
                  .data?.master_coupon_minimum_ticket
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
              }
            </MinimumTicket>
          </WrapperTicket>

          <Description>{props?.data?.master_coupon_description}</Description>
        </Wrapper>

      </Modalize>
    );
  }

