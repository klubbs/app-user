import React, { createContext, useState } from 'react';
import { NotificationsFlash } from '../utils/flash-notifications';
import { CheckoutService } from '../services/checkout-service';
import { Spinner } from '../components/components/spinner';

type CheckinStatusState = {
  id: string;
  status: 'EMPTY_CHECKIN_ID' | 'CHECKIN' | 'CHECKOUT';
};

export const CheckoutContext = createContext(
  {} as {
    checkinStatus: CheckinStatusState;
    handleCheckoutStatus: () => Promise<'SUCCESS' | undefined>;
    clearCheckinId: () => void;
    setCheckoutStatus: ({
      checkoutId,
      isCheckinStatus,
    }: {
      checkoutId: string;
      isCheckinStatus: boolean;
    }) => void;
  },
);

const CheckoutProvider: React.FC = ({ children }) => {
  const [checkinStatus, setCheckinStatus] = useState<CheckinStatusState>({
    id: '',
    status: 'EMPTY_CHECKIN_ID',
  });
  const [loading, setLoading] = useState(false);

  function clearCheckinId() {
    setCheckinStatus({ id: '', status: 'EMPTY_CHECKIN_ID' });
  }

  function setCheckoutStatus({
    checkoutId,
    isCheckinStatus,
  }: {
    checkoutId: string;
    isCheckinStatus: boolean;
  }) {
    if (!checkoutId) {
      throw new Error('checkout is required');
    }

    if (isCheckinStatus) {
      setCheckinStatus({ id: checkoutId, status: 'CHECKIN' });
    } else {
      setCheckinStatus({ id: checkoutId, status: 'CHECKOUT' });
    }
  }

  async function handleCheckoutStatus(): Promise<'SUCCESS' | undefined> {
    try {
      if (checkinStatus.status === ('CHECKOUT' || 'EMPTY_CHECKIN_ID')) {
        return;
      }

      setLoading(true);

      const checkoutStatus = await CheckoutService.getCheckoutStatus(checkinStatus.id);

      setCheckoutStatus({
        checkoutId: checkoutStatus.checkout_id,
        isCheckinStatus: checkoutStatus.is_checkin,
      });

      if (checkoutStatus.is_checkin) {
        NotificationsFlash.customMessage(
          'Checkout em andamento',
          'O estabelecimento ainda não finalizou o checkout',
          'NEUTRAL',
        );
      } else {
        NotificationsFlash.customMessage(
          'Checkout finalizado',
          'O estabelecimento finalizou o checkout',
          'SUCCESS',
        );

        return 'SUCCESS';
      }
    } catch (error) {
      NotificationsFlash.spillCoffee();
    } finally {
      setLoading(false);
    }
  }

  return (
    <CheckoutContext.Provider
      value={{ checkinStatus, handleCheckoutStatus, clearCheckinId, setCheckoutStatus }}
    >
      <Spinner loading={loading} />
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider };
