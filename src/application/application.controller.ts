import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { AuthGuard } from 'src/comman/guards/auth.guard';
import { query, Request } from 'express';
import { ApplicationQueryDto } from './dto/filter-application.dto';
import { UserRole } from 'src/utils/enum.utils';
import { Roles } from 'src/comman/decorators/roles.decorator';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createApplication(
    @Req() req: Request,
    @Body() createApplicationDto: CreateApplicationDto,
  ): any {
    return this.applicationService.createApplication(req, createApplicationDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Customer)
  findAll(@Query() query: ApplicationQueryDto) {
    return this.applicationService.listApplications(query);
  }

  @Get('/filter')
  @Roles(UserRole.Admin, UserRole.Customer)
  async filter(@Query() query: ApplicationQueryDto) {
    const response = await this.applicationService.listApplications(query);
    return response;
  }
}
