import { mapToContents,mapToSingleContent } from './content.mapper';
import database from '../prisma/database';
import * as fs from 'fs';
import { Content } from 'src/content/content';
import { PrismaClient } from '@prisma/client';
