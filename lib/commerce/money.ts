export type MoneyFormat = {
  currency: string;
  locale: string;
};

export const formatMoney = (amount: number, { currency, locale }: MoneyFormat) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
