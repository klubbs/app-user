import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { SelectorDaysWeek } from '../../components/Selector-days-week-1';
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
  Off,
} from './styles';

export type TOfferSelected = {
  id: string;
  off: number;
  min_ticket: number;
  coupon_id: string;
  coupon_code: string;
  partner_image: string;
  // working_days: number[];
};

export const ModalOfferRulesQrCode: React.FC<{
  data: IWalletCouponsResponseOfferData | null;
  onClose: any;
}> = (props) => {
  const modalizeRef = useRef<Modalize>();

  useEffect(() => {
    if (props.data !== null) {
      modalizeRef.current?.open();
    }
  }, [props]);

  return (
    <Modalize onClose={props.onClose} modalHeight={500} ref={modalizeRef}>
      <Wrapper>
        <Name>{props?.data?.store_name}</Name>
        <ExpireIn>
          Esta oferta expira em:{' '}
          {props.data?.offer_valid_at.ToDateFormat().toCustomLocaleDateString()}
        </ExpireIn>
        <Divider />
        <SelectorDaysWeek hasSelector={false} initSelectedDays={props.data?.offer_working_days} />

        <WrapperTicket>
          <MinimumTicketSubtitle>• Desconto </MinimumTicketSubtitle>
          <WrapperOff>
            <Off>{props.data?.offer_percentage}%</Off>
          </WrapperOff>
        </WrapperTicket>

        <WrapperTicket>
          <MinimumTicketSubtitle>• valor mínimo </MinimumTicketSubtitle>
          <MinimumTicket>
            {props.data?.offer_ticket.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </MinimumTicket>
        </WrapperTicket>

        <Description>{props?.data?.offer_description}</Description>
      </Wrapper>
    </Modalize>
  );
};
