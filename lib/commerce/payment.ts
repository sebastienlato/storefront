export type PaymentIntent = {
  id: string;
  status: "requires_payment" | "succeeded";
};

export type PaymentProvider = {
  createIntent: (amount: number, currency: string) => Promise<PaymentIntent>;
  confirmIntent: (intentId: string) => Promise<PaymentIntent>;
};

export const mockPaymentProvider: PaymentProvider = {
  async createIntent() {
    return {
      id: `mock_${Date.now()}`,
      status: "requires_payment",
    };
  },
  async confirmIntent(intentId) {
    return {
      id: intentId,
      status: "succeeded",
    };
  },
};
