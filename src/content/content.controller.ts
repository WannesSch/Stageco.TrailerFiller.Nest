import { Controller, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../validation/http-exception';
@Controller('content')
@UseFilters(HttpExceptionFilter)
export class ContentController {}
