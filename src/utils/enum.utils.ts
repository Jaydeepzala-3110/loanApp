export enum TokenType {
  Auth = 'auth',
  Refresh = 'refresh',
  Invite = 'invite',
  Reset = 'reset',
  Verify = 'verify',
}

export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
}

export enum UserStatus {
  Active = 'active',
  Block = 'block',
}

export enum RelationshipStatus {
  Single = 'single',
  Couple = 'couple',
}

export enum ResidentialStatus {
  Rent = 'rent',
  Own = 'own',
  Boarding = 'boarding',
  LivingWithFamily = 'living-with-family',
}

export enum ContactType {
  Phone = 'phone',
  Email = 'email',
  Token = 'token',
}

export enum LoanReason {
  Living = 'living-expense',
  Travel = 'travel-expense',
  Education = 'education-expense',
  Entertainment = 'entertainment-expense',
  MedicalBills = 'medical-bills',
  HouseholdImprovements = 'household-improvements',
  Vehicle = 'vehicle-expense',
  Holiday = 'holiday-expense',
  NewBusiness = 'new-business',
  RepayDebt = 'repay-existing-debt',
}

export enum EmploymentType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Contract = 'contract',
  SelfEmployed = 'self-employed',
  Casual = 'casual',
  CentrelinkBenefits = 'centrelink-benefits',
}

export enum   ApplicationStatus {
  Draft = 'draft',
  Submitted = 'submitted',
  Approved = 'approved',
  Active = 'active',
  Declined = 'declined',
  Closed = 'closed',
  Withdrawn = 'withdrawn',
  PendingDocs = 'pending-docs',
}
