import { mapToSingleAsset,mapToAssets } from './asset.mapper';
import { Asset } from './asset';
import * as fs from 'fs';
import { Content } from 'src/content/content';
import database from '../prisma/database';
import { HttpStatus } from '@nestjs/common';
   

const getAssetById = async (id: string): Promise<Asset> => {
    const asset = await database.asset.findUnique({
        where: {
        id: parseInt(id),
        },
        include: {
        content: true,
        },
    });
    return mapToSingleAsset(asset);
    }


    const deleteAsset = async (id: string): Promise<HttpStatus> => {
        const deletedAsset = await database.asset.delete({
        where: {
        id: parseInt(id),
        },
        include: {
        content: true,
        },
    });
    if(deleteAsset == null) return HttpStatus.BAD_REQUEST;
    return HttpStatus.CREATED;
    }


    const getAssets = async (): Promise<Asset[]> => {
        const assets = await database.asset.findMany({
        include: {
        content: true,
        },
    });
    return mapToAssets(assets);
    }


    const addAsset = async (asset: Asset): Promise<HttpStatus> => {
        
        const newAsset = await database.asset.create({
        data: {
            id: asset.id,
            unit: asset.unit,
            name: asset.name,
            category: asset.category,
            height: asset.height,
            width: asset.width,
            depth: asset.depth,
            weight: asset.weight,
            modelPath: asset.modelPath,
            position: asset.position,
            rotation: asset.rotation,

        },
    });
    if(mapToSingleAsset(newAsset)==null) return HttpStatus.BAD_REQUEST;
    return HttpStatus.OK;
    }


  
    const updateAsset = async (id: string,asset: Asset): Promise<HttpStatus> => {
        const updatedAsset = await database.asset.update({
        where: {
        id: parseInt(id),
        },
        data: {
            id: asset.id,
            unit: asset.unit,
            name: asset.name,
            category: asset.category,
            height: asset.height,
            width: asset.width,
            depth: asset.depth,
            weight: asset.weight,
            modelPath: asset.modelPath,
            position: asset.position,
            rotation: asset.rotation,
        },
        include: {
        content: true,
        },            
    });

    if( mapToSingleAsset(updatedAsset)==null) return HttpStatus.I_AM_A_TEAPOT;
    return HttpStatus.OK;
    }


    const getAllNoContent = async (): Promise<Asset[]> => {
        const assets = await database.asset.findMany({
        include: {
        content: false,
        },
    });
    return mapToAssets(assets);
        }

        const getRotation = async (id: string): Promise<number[]> => {
            const asset = await database.asset.findUnique({
                where: {
                id: parseInt(id),
                },
                include: {
                content: true,
                },
            });
            return mapToSingleAsset(asset).rotation.split(',').map(Number);
          }


          const getPosition = async (id: string): Promise<number[]> => {
            const asset = await database.asset.findUnique({
                where: {
                id: parseInt(id),
                },
                include: {
                content: true,
                },
            });
            return mapToSingleAsset(asset).position.split(',').map(Number);
          }
          const setRotation = async (id: string, rotation: number[]):Promise<HttpStatus> => {
            if(rotation.length != 3) return HttpStatus.BAD_REQUEST;

            const updatedAsset = await database.asset.update({
                where: {
                id: parseInt(id),
                },
                data: {
                    rotation: rotation.toString(),
                },
                include: {
                content: true,
                },
            });
            if(mapToSingleAsset(updatedAsset)==null) return HttpStatus.BAD_REQUEST;
            return HttpStatus.OK;
          }
          const setPosition = async (id: string, position: number[]): Promise<HttpStatus> => {

            if(position.length != 3) return HttpStatus.BAD_REQUEST;
            console.log(position)
            console.log(position.toString())
            const updatedAsset = await database.asset.update({
                where: {
                id: parseInt(id),
                },
                data: {
                    position: position.toString(),
                },
                include: {
                content: true,
                },
            });
            if(mapToSingleAsset(updatedAsset)==null) return HttpStatus.BAD_REQUEST;
            return HttpStatus.OK;
          }

    
    export default {
        getAssetById,
        getAssets,
        addAsset,
        updateAsset,
        deleteAsset,
        getAllNoContent,
        getRotation,
        getPosition,
        setRotation,
        setPosition,
    };

