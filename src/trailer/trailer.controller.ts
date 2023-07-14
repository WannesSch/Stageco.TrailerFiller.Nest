import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import {Asset} from '../asset/asset';
import {Trailer} from 'prisma/prisma-client';

@Controller('trailer')
export class TrailerController {
    constructor(private readonly trailerService: TrailerService){}
    
}
