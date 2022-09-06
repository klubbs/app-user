import React, { createContext, useState } from "react"


export const CheckoutContext = createContext({} as {
    checkinID: string | null
    handleCheckoutStatus: ({ checkoutId, isCheckinStatus }: { checkoutId: string, isCheckinStatus: boolean }) => void
    clearCheckinId: () => void
})

const CheckoutProvider: React.FC = ({ children }) => {

    const [checkinID, setCheckinID] = useState<string | null>(null)


    function clearCheckinId() {
        setCheckinID(null)
    }

    function handleCheckoutStatus({ checkoutId, isCheckinStatus }: { checkoutId: string, isCheckinStatus: boolean }) {
        if (isCheckinStatus) {
            setCheckinID(checkoutId);
        } else {
            clearCheckinId()
        }
    }

    return (
        <CheckoutContext.Provider value={{ checkinID, handleCheckoutStatus, clearCheckinId }}>
            {children}
        </CheckoutContext.Provider>
    );

}


export { CheckoutProvider }