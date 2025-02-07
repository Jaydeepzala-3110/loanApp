import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationQueryDto } from './dto/filter-application.dto';
import { Any, In, Not, Repository } from 'typeorm';
import { ApplicationStatus } from 'src/utils/enum.utils';
import { User } from 'src/user/entities/user.entity';
import { Employement } from 'src/user/entities/employment.entity';
import {
  DrivingLicense,
  Identity,
  Medicare,
  Passport,
} from 'src/user/entities/identity.entity';
import { Expenses } from 'src/user/entities/expense.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Employement)
    private readonly employementRepository: Repository<Employement>,
    @InjectRepository(Identity)
    private readonly identityRepository: Repository<Identity>,
    @InjectRepository(Medicare)
    private readonly medicareRepository: Repository<Medicare>,
    @InjectRepository(DrivingLicense)
    private readonly drivingLicensceRepository: Repository<DrivingLicense>,
    @InjectRepository(Passport)
    private readonly passportRepository: Repository<Passport>,
    @InjectRepository(Expenses)
    private readonly expensesRepository: Repository<Expenses>,
  ) {}

  async createApplication(
    req: any,
    createApplicationDto: CreateApplicationDto,
  ) {
    try {
      const { applicationId, employment, expenses, identity } =
        createApplicationDto;

      const customer = await this.userRepository.findOne({
        where: { id: req.authUser.id },
      });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      const existingApplication = await this.applicationRepository.findOne({
        where: {
          customer: { id: req.authUser.id },
          ...(applicationId && { id: Not(In([applicationId])) }),
          status: In([
            ApplicationStatus.Draft,
            ApplicationStatus.Submitted,
            ApplicationStatus.Approved,
            ApplicationStatus.Active,
            ApplicationStatus.PendingDocs,
          ]),
        },
      });

      if (existingApplication) {
        throw new HttpException(
          'You already have an active application.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (customer?.blockedUntil) {
        const currentTimeStamp = Date.now();
        const blockedUntilTimeStamp = new Date(customer.blockedUntil).getTime();

        if (blockedUntilTimeStamp > currentTimeStamp) {
          const daysRemaining = Math.ceil(
            (blockedUntilTimeStamp - currentTimeStamp) / (1000 * 60 * 60 * 24),
          );

          throw new HttpException(
            `You can create a new application after ${daysRemaining} days`,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          customer.blockedUntil = null;
          await this.userRepository.save(customer);
        }
      }

      const identityEntity = new Identity();

      if (identity?.passport) {
        let passport = this.passportRepository.create(identity.passport);
        await this.passportRepository.save(passport);
        identityEntity.passport = passport;
      }

      if (identity?.medicare) {
        let medicare = this.medicareRepository.create(identity.medicare);
        await this.medicareRepository.save(medicare);
        identityEntity.medicare = medicare;
      }

      if (identity?.drivingLicense) {
        let drivingLicense = this.drivingLicensceRepository.create(
          identity.drivingLicense,
        );
        await this.drivingLicensceRepository.save(drivingLicense);
        identityEntity.drivingLicense = drivingLicense;
      }

      const savedEmployement = await this.employementRepository.save(
        this.employementRepository.create(employment),
      );
      const savedExpenses = await this.expensesRepository.save(
        this.expensesRepository.create(expenses),
      );

      const savedIdentity = await this.identityRepository.save(identityEntity);

      Object.assign(customer, {
        firstName: createApplicationDto.firstName || customer.firstName,
        lastName: createApplicationDto.lastName || customer.lastName,
        address: createApplicationDto.address || customer.address,
        relationship:
          createApplicationDto.relationship || customer.relationship,
        birthDate: createApplicationDto.birthDate || customer.birthDate,
        dependantNumber:
          parseInt(createApplicationDto.dependantNumber) ||
          customer.dependantNumber,
        residentialStatus:
          createApplicationDto.residentialStatus || customer.residentialStatus,
        employement: savedEmployement,
        expensess: savedExpenses,
        identity: savedIdentity,
      });

      const application = this.applicationRepository.create({
        customer,
        loanAmount: createApplicationDto.loanAmount,
        loanReason: createApplicationDto.loanReason,
        employement: savedEmployement,
        expenses: savedExpenses,
      });

      const [savedApplication] = await Promise.all([
        this.applicationRepository.save(application),
        this.userRepository.save(customer),
      ]);

      return savedApplication;
    } catch (error) {
      throw error;
    }
  }

  async listApplications(query: ApplicationQueryDto) {
    try {
      const qb = this.applicationRepository.createQueryBuilder('application');
      qb.leftJoinAndSelect('application.customer', 'users');

      if (query.status) {
        qb.andWhere('application.status = :status', { status: query.status });
      }
      if (query.loanId) {
        qb.andWhere('application.loanId = :loanId', { loanId: query.loanId });
      }
      if (query.email) {
        qb.andWhere('application.email = :email', { email: query.email });
      }
      if (query.phone) {
        qb.andWhere('application.phone = :phone', { phone: query.phone });
      }
      if (query.assignedTo) {
        qb.andWhere('application.assignedTo = :assignedTo', {
          assignedTo: String(query.assignedTo),
        });
      }
      if (query.agent) {
        qb.andWhere('application.agent = :agent', { agent: query.agent });
      }
      if (query.contractSigned !== undefined) {
        qb.andWhere('application.contractSigned = :contractSigned', {
          contractSigned: query.contractSigned,
        });
      }

      if (query.name) {
        qb.andWhere(
          `CONCAT(application.firstName, ' ', application.lastName) ILIKE :name`,
          { name: `%${query.name}%` },
        );
      }

      const page = query.page ? parseInt(query.page) : 1;
      const limit = query.limit ? parseInt(query.limit) : 10;
      const skip = (page - 1) * limit;

      qb.skip(skip).take(limit);

      const applications = await qb.getMany();
      return applications;
    } catch (error) {
      console.log('Error in listApplications:', error);
      throw error;
    }
  }
}
