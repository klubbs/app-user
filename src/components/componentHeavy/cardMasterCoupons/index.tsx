import React, { useState } from 'react';
import { View } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { ICardMasterCoupons } from './@types';

import { WrapperCard, TopContainer, BottomContainer, Name, Selection, Rules, WrapperOff, Off, SeeMore, SubBottomContainer, ValidAt } from './styles';

export const CardMasterCoupons: React.FC<{ data: ICardMasterCoupons }> = ({ data }) => {

  const [selected, setSelected] = useState<boolean>(false)


  function handlePress() {
    const isSelected = !selected;

    setSelected(isSelected);
    data.onPress(isSelected, data.masterCouponId)

  }

  return (
    <WrapperCard key={data.masterCouponId}>
      <TopContainer>
        <ShopIcon width={15} height={15} fill={colors.COLOR_YELLOW} />
        <Name>{data?.establishment}</Name>
        <Selection onPress={handlePress} active={selected} />
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

