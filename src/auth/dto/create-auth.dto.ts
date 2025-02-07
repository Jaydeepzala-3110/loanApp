export class CreateRegisterDto {
  // phone: string;
  // smsOtp: string;
  email: string;
  emailOtp: string;
  firstName: string;
  lastName: string;
  // referralToken?: string;
}

export class VerifyContactDto {
  type: string;
  value: string;
}

export class InitiateLoginDto {}
