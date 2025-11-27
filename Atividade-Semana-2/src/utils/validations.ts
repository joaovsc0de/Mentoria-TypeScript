import validator from 'validator';

export const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
};

export const isNonEmptyString = (value: unknown): value is string => {
    return typeof value === 'string' && value.trim().length > 0;
};