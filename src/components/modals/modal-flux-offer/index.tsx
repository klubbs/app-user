import React, { useState } from 'react';
import { MenuItem } from '../../components/MenuItem';
import { ModalComponent } from '../../components/Modal';
import { Spinner } from '../../components/spinner';
import { ContainerModal } from './styles';

const ModalFluxOffer: React.FC<{
  enable: boolean;
  onClose: () => void;
  checkinCb: () => void;
  walletCb: () => Promise<void>;
}> = ({ enable, onClose, checkinCb, walletCb }) => {
  const [loading, setLoading] = useState(false);

  async function handleStoreInWallet() {
    setLoading(true);

    await walletCb();

    setLoading(false);
  }

  return (
    <ModalComponent visible={enable} onClose={onClose}>
      <Spinner loading={loading} />
      <ContainerModal>
        <MenuItem
          key={'checkin'}
          text={'Iniciar checkin agora'}
          description={'To preparado(a) para usar'}
          icon={'circle'}
          cb={checkinCb}
        />
        <MenuItem
          key={'wallet'}
          text={'Guardar no meu cupom'}
          description={'Talvez eu vá usar depois'}
          icon={'tag'}
          cb={handleStoreInWallet}
        />
      </ContainerModal>
    </ModalComponent>
  );
};

export default ModalFluxOffer;
