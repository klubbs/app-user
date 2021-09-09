import React from 'react';
import colors from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { ICardMasterCoupons } from './@types';
import { WrapperCard, TopContainer, BottomContainer, Name, Rules, WrapperOff, Off, SeeMore, SubBottomContainer, ValidAt } from './styles';
import { Selector } from '../../component/selector';

export const CardMasterCoupons: React.FC<{ data: ICardMasterCoupons }> = ({ data }) => {

  return (
    <WrapperCard key={data.masterCouponId}>
      <TopContainer>
        <ShopIcon width={15} height={15} fill={colors.COLOR_YELLOW} />
        <Name>{data?.establishment}</Name>
        <Selector
          onPress={(isSelected: boolean) => data.onPress(isSelected, data.masterCouponId)}
        />
      </TopContainer>

      <BottomContainer>
        <WrapperOff>
          <Off>{data?.off}%</Off>
        </WrapperOff>
        <Rules>
          {data?.description?.slice(0, 150)}  { }
          <SeeMore>Ver mais</SeeMore>
        </Rules>
      </BottomContainer>
      <SubBottomContainer>
        <ValidAt>Válido até { }
          {data?.validAt.ToDateFormat().getDate()}&#xB7;
          {data?.validAt.ToDateFormat().getMonth()}&#xB7;
          {data?.validAt.ToDateFormat().getFullYear().toString().slice(2, 4)}
        </ValidAt>
      </SubBottomContainer>

    </WrapperCard>

  );
}

