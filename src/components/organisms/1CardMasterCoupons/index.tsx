import React from 'react';
import colors from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { ICardMasterCouponsProps } from './@types';
import { WrapperCard, TopContainer, BottomContainer, Name, Rules, WrapperOff, Off, SeeMore, SubBottomContainer, ValidAt } from './styles';
import { Selector } from '../../components/1Selector';

export const CardMasterCoupons: React.FC<{ data: ICardMasterCouponsProps }> = ({ data }) => {

  return (
    <WrapperCard key={data.master_coupon_id}>
      <TopContainer>
        <ShopIcon width={15} height={15} fill={colors.COLOR_YELLOW} />
        <Name>{data?.establishment_name}</Name>
        <Selector
          onPress={(isSelected: boolean) => data.onPress(isSelected, data.master_coupon_id, data.establishment_id)}
        />
      </TopContainer>

      <BottomContainer>
        <WrapperOff>
          <Off>{data?.master_coupon_off}%</Off>
        </WrapperOff>
        <Rules>
          {data?.master_coupon_description?.slice(0, 150)}  { }
          <SeeMore>Ver mais</SeeMore>
        </Rules>
      </BottomContainer>
      <SubBottomContainer>
        <ValidAt>Válido até { }
          {data?.master_coupon_valid_at.ToDateFormat().getDate()}-
          {data?.master_coupon_valid_at.ToDateFormat().getMonth()}-
          {data?.master_coupon_valid_at.ToDateFormat().getFullYear().toString().slice(2, 4)}
        </ValidAt>
      </SubBottomContainer>

    </WrapperCard>

  );
}

