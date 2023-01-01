import React from 'react';
import { colors } from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { ICardOffersProps } from './@types';
import {
  WrapperCard,
  TopContainer,
  BottomContainer,
  Name,
  Rules,
  WrapperOff,
  Off,
  SeeMore,
  SubBottomContainer,
  ValidAt,
  FinancesInformationWrapper,
  MinimumTicketSubtitle,
  MinimumTicket,
} from './styles';
import { Selector } from '../../components/Selector';
import { SelectorDaysWeek } from '../../components/selector-days-week';

export const CardOffers: React.FC<ICardOffersProps> = (props) => {
  function handleSelector(isSelected: boolean) {
    if (props.onPress) {
      props.onPress(isSelected);
    }
  }

  return (
    <WrapperCard key={props.master_coupon_id}>
      <TopContainer>
        <ShopIcon width={15} height={15} fill={colors.COLOR_YELLOW} />
        <Name>{props?.establishment_name}</Name>
        <Selector onPress={handleSelector} />
      </TopContainer>

      <BottomContainer>
        <FinancesInformationWrapper>
          <WrapperOff>
            <Off>{props?.master_coupon_off}%</Off>
          </WrapperOff>

          <MinimumTicketSubtitle>• valor mínimo </MinimumTicketSubtitle>
          <MinimumTicket>
            {props.minimum_ticket.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </MinimumTicket>
        </FinancesInformationWrapper>
        <SeeMore>Dias da semana</SeeMore>
        <SelectorDaysWeek hasSelector={false} initSelectedDays={props.working_days ?? []} />
        <Rules>
          {props?.master_coupon_description?.slice(0, 150)} {}
          {/* <SeeMore>Ver mais</SeeMore> */}
        </Rules>
      </BottomContainer>
      <SubBottomContainer>
        <ValidAt>
          Válido até: {}
          {props?.master_coupon_valid_at.ToDateFormat().toCustomLocaleDateString()}
        </ValidAt>
      </SubBottomContainer>
    </WrapperCard>
  );
};
