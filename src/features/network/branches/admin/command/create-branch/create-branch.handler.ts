import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBranchCommand } from './create-branch.command';
import { CreateBranchResponse } from './create-branch.response';
import { Branches } from '@/features/network/branches/branches.entity';
import { NotFoundException } from '@nestjs/common';
import { Countries } from '@/features/common/countries/countries.entity';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
  async execute(command: CreateBranchCommand): Promise<CreateBranchResponse> {
    const countryExists = await Countries.existsBy({ id: command.countryId });

    if (!countryExists) throw new NotFoundException('Country with given id not found');

    const representativeExists = await Representatives.existsBy({ id: command.representativeId });
    if (!representativeExists) throw new NotFoundException('Representative with given id not found');

    const branch = {
      countryId: command.countryId,
      representativeId: command.representativeId,
      city: command.city,
      latitude: command.latitude,
      longitude: command.longitude,
      phoneNumber: command.phoneNumber,
    } as Branches;

    await Branches.save(branch);
    return plainToInstance(CreateBranchResponse, branch, { excludeExtraneousValues: true });
  }
}
