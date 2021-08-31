import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize'

// import { Container } from './styles';

export const ModalCouponEstablishmentInfos: React.FC<{ data: any, onClose: any }> = (props) => {

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

    </Modalize>
  );
}

