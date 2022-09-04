import React, { createContext, useState } from "react"


export const CheckoutContext = createContext({} as {
    checkinID: string | null
    handleCheckoutStatus: ({ checkoutId, isCheckin }: { checkoutId: string, isCheckin: boolean }) => void
})

const CheckoutProvider: React.FC = ({ children }) => {

    const [checkinID, setCheckinID] = useState<string | null>(null)


    function handleCheckoutStatus({ checkoutId, isCheckin }: { checkoutId: string, isCheckin: boolean }) {
        if (isCheckin) {
            setCheckinID(checkoutId);
        } else {
            setCheckinID(null)
        }
    }

    return (
        <CheckoutContext.Provider value={{ checkinID, handleCheckoutStatus }}>
            {children}
        </CheckoutContext.Provider>
    );

}


export { CheckoutProvider }