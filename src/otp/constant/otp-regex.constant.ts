import { OTP_CODE_DEFAULT_LENGTH } from './otp-default.constant';

export const OTP_CODE_REGEX = new RegExp(`^[0-9]{${OTP_CODE_DEFAULT_LENGTH}}$`);
