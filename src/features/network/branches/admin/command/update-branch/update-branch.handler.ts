import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBranchCommand } from './update-branch.command';
import { UpdateBranchResponse } from './update-branch.response';
import { Branches } from '@/features/network/branches/branches.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
  async execute(command: UpdateBranchCommand): Promise<UpdateBranchResponse> {
    const branch = await Branches.findOneBy({ id: command.id });

    if (!branch) throw new NotFoundException('Branch with given id not found');

    if (command.countryId !== undefined) branch.countryId = command.countryId;

    if (command.representativeId !== undefined) branch.representativeId = command.representativeId;

    if (command.city !== undefined) branch.city = command.city;

    if (command.latitude !== undefined) branch.latitude = command.latitude;

    if (command.longitude !== undefined) branch.longitude = command.longitude;

    if (command.phoneNumber !== undefined) branch.phoneNumber = command.phoneNumber;

    await Branches.save(branch);
    return plainToInstance(UpdateBranchResponse, branch, { excludeExtraneousValues: true });
  }
}
