import { Controller, UseFilters } from '@nestjs/common';
import {HttpExceptionFilter} from '../http-exception';
@Controller('content')
@UseFilters(HttpExceptionFilter)
export class ContentController {}
