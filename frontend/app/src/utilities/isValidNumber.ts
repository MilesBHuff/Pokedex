////////////////////////////////////////////////////////////////////////////////
export const isValidNumber = (testee: number | null | undefined): testee is number => testee != null && !Number.isNaN(testee);
