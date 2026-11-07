import { PartialType } from '@nestjs/swagger';
import { CreateVenueTableDto } from './create-venue-table.dto';

export class UpdateVenueTableDto extends PartialType(CreateVenueTableDto) {}
