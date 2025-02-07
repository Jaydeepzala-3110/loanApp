import {
  EmploymentType,
  LoanReason,
  RelationshipStatus,
  ResidentialStatus,
} from 'src/utils/enum.utils';

export class CreateApplicationDto {
  applicationId: string;
  firstName: string;
  lastName: string;
  address: string;
  relationship: RelationshipStatus;
  birthDate: Date;
  identity: Identity;
  dependantNumber: string;
  employment: Employment;
  expenses: Expenses;
  residentialStatus: ResidentialStatus;
  loanAmount: number;
  loanReason: string;
}

interface Identity {
  passport:
    | {
        number: string;
        expiry: Date;
      }
    | undefined;
  drivingLicense:
    | {
        number: string;
        license: string;
        state: string;
        expiry: Date;
      }
    | undefined;
  medicare:
    | {
        number: string;
        reference: string;
        expiry: Date;
      }
    | undefined;
}

interface Employment {
  type: EmploymentType;
  employer: string;
  payFrequency: string;
  payAfterTax: number;
  nextPayDate: Date;
}

interface Expenses {
  living: number;
  rent: number;
  loan: number;
}
