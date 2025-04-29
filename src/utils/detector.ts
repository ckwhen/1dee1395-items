export const convertBooleanToInt = (input: boolean): number => input ? 1: 0;

export const convertIntToBoolean = (input: number): boolean => input === 1;

export const filterObject = (obj: Record<string, unknown>) => Object
  .fromEntries(
    Object.entries(obj).filter(([ , value ]) => (
      value !== ''
      || (Array.isArray(value) && value.length > 0)
    ))
  );

export const checkIsTablet = (windowWidth: number): boolean => windowWidth < 1024;
