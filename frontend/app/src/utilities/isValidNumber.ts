////////////////////////////////////////////////////////////////////////////////
export const isValidNumber = (testee: number | null | undefined): boolean => testee != null && !Number.isNaN(testee);
