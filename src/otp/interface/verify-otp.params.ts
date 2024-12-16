import { OtpOperationTypeEnum } from '../enum/otp-operation-type.enum';
import { OtpTypeEnum } from '../enum/otp-type.enum';

export interface VerifyOtpParams {
  code: string;
  id: string;
  type: OtpTypeEnum;
  operation: OtpOperationTypeEnum;
}
