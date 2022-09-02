import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize'
import { DaysOfWeek } from '../../components/DaysOfWeek';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
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

export const ModalOfferRulesQrCode: React.FC<{ data: IWalletCouponsResponseOfferData | null, onClose: any }> =
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
          <Name>{props?.data?.store_name}</Name>
          <ExpireIn>Esta oferta expira em: {props
            .data?.offer_valid_at
            .ToDateFormat()
            .toCustomLocaleDateString()}</ExpireIn>
          <Divider />
          <DaysOfWeek hasSelector={false} initSelectedDays={props.data?.offer_working_days} />

          <WrapperTicket>
            <MinimumTicketSubtitle>• Desconto </MinimumTicketSubtitle>
            <WrapperOff>
              <Off>{props.data?.offer_percentage}%</Off>
            </WrapperOff>
          </WrapperTicket>

          <WrapperTicket>
            <MinimumTicketSubtitle>• valor mínimo </MinimumTicketSubtitle>
            <MinimumTicket>
              {
                props
                  .data?.offer_ticket
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
              }
            </MinimumTicket>
          </WrapperTicket>

          <Description>{props?.data?.offer_description}</Description>
        </Wrapper>

      </Modalize>
    );
  }

