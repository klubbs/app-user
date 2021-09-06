import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize'
import { IMasterCouponDetails } from '../../screens/couponQr/types';

import { Wrapper, Name, Description, Divider } from './styles';

export const MasterCouponDetailModal: React.FC<{ data: IMasterCouponDetails | null, onClose: any }> = (props) => {

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
        <Divider />
        <Description>{props?.data?.master_coupon_description}</Description>
      </Wrapper>

    </Modalize>
  );
}

