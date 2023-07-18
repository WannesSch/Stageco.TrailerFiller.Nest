import { mapToSingleSubproject,mapToSubprojects } from './subproject.mapper';
import database from '../prisma/database';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import { HttpStatus } from '@nestjs/common';
import { mapToAssets } from 'src/asset/asset.mapper';
import { Asset } from 'src/asset/asset';
import * as fs from 'fs';
import { Content } from 'src/content/content';

const getSubprojectById = async (id: string): Promise<Subproject> => {
    const subproject = await database.subproject.findUnique({
        where: {
        subprojectId: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSingleSubproject(subproject);
    }
    const deleteSubproject = async (id: string): Promise<HttpStatus> => {
        const deletedSubproject = await database.subproject.delete({
        where: {
        subprojectId: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    if(mapToSingleSubproject(deletedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }
    const getSubprojects = async (): Promise<Subproject[]> => {
        const subprojects = await database.subproject.findMany({
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSubprojects(subprojects);
    }
    const addSubproject = async (subproject: Subproject): Promise<HttpStatus> => {
        const newSubproject = await database.subproject.create({
        data: {
        title: subproject.title,
        description: subproject.description,
        },
        include: {
        Trailers: false,
        Assets: false,
        },
    });
    if(mapToSingleSubproject(newSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }
    const updateSubproject = async (id: string,subproject: Subproject): Promise<HttpStatus> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        subprojectId: parseInt(id),
        },
        data: {
        title: subproject.title,
        description: subproject.description,
        departureDate: subproject.departureDate,
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
     if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }

    const getAllSubprojectsFromProject = async (id: string): Promise<Subproject[]> => {
        const subprojects = await database.subproject.findMany({
        where: {
        projectId: parseInt(id),
        },
        include: {
        Trailers: false,
        Assets: false,
        },
    });
    return mapToSubprojects(subprojects);
    }

    const getAllAssetsFromSubproject = async (id: string): Promise<Asset[]> => {
        const subproject = await database.subproject.findUnique({
        where: {
        subprojectId: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToAssets(subproject.Assets);
    }

    const addTrailer = async (id: string, trailer: Trailer): Promise<HttpStatus> => {

    const newTrailer = await database.trailer.create({
      data: {
        name: trailer.name,
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        maxWeight: trailer.maxWeight,
        subprojectId: parseInt(id),
      },
    });
    const updatedSubproject = await database.subproject.update({
      where: {
        subprojectId: parseInt(id),
      },
      data: {
        Trailers: {
          connect: {id: trailer.trailerId}
        },
      },
      include: {
        Trailers: true,
        Assets: true,
      },
    });
    if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;

}

    const addAssets = async (id: string, assets): Promise<HttpStatus> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        subprojectId: parseInt(id),
        },
        data: {
        Assets: {
        create: assets,
        },
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
     if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }



    const csvReader = async (filename: string,id:string): Promise<Asset[]|HttpStatus> => {
        try {
            const subprojectId = parseInt(id);
          const assets: Asset[] = [];
          let idee = await database.$queryRaw`SELECT id FROM Asset ORDER BY id DESC LIMIT 1`
          console.log(idee)
          let idStart = 0;
          if(await database.asset.count()>0){
            idStart = Number(idee[0].id)
          }
          let idStartContent = await database.content.count() +1;
          let currentBoxForContent: Asset | undefined = undefined;
          let littleStuffff: Content | undefined = undefined;
          const fileData = await fs.promises.readFile('src/' + filename + '.csv', 'utf-8');
          const lines = fileData.split('\n');

          for (const line of lines) {
            const cells = line.split(';');
            const category = parseInt(cells[0]);
            const count = parseInt(cells[5]);
            const modelPath = cells[2]+'.glb';
          
            if (cells[4] && cells[4].includes(',')) {
              cells[4] = cells[4].replace(',', '.');
            }
            if (cells[6] && cells[6].includes(',')) {
              cells[6] = cells[6].replace(',', '.');
            }
            if (category === 1 && count === 1 && cells[1].length > 0) {
              const currentBox = await database.asset.create({
                data: {
                category: category,
                id: idStart+Number(cells[1]), // Increment the ID for each box
                unit: cells[2],
                name: cells[3],
                weight: Number(cells[4]),
                width: Number(cells[6]),
                height: Number(cells[7]),
                depth: Number(cells[8]),
                modelPath: modelPath,
                },
              });
              currentBoxForContent = currentBox;
              assets.push(currentBox)
              idStart += Number(cells[1]);
            } else if (category === 2 && count > 1) {
              if (currentBoxForContent) {
                  let littleStuff= await database.content.create({
                    data: {
                    id: idStartContent++, // Increment the ID for each little stuff item
                    unit: cells[2],
                    name: cells[3],
                    weight: Number(cells[4]),
                    amount: Number(cells[5]),
                    boxId: currentBoxForContent.id,
                    },
                  });
                  littleStuffff = littleStuff;
                }
                await database.asset.update({
                  where: {
                    id: currentBoxForContent.id,
                  },
                  data: {
                    content: {
                      connect: {id: littleStuffff.id}
                    },
                  },
                });
                    
            } else if (category === 1  && cells[1].length === 0) {
              for(let i = 1; i < count+1; i++){
              const grootObject = await database.asset.create({
                data: {
                  id: idStart + i,
                  unit: cells[2],
                  category: category,
                  name: cells[3],
                  weight: Number(cells[4]),
                  width: Number(cells[6]),
                  height: Number(cells[7]),
                  depth: Number(cells[8]),
                  subprojectId: subprojectId,
                  modelPath: modelPath,
                },
              });
              assets.push(grootObject);
            }
            idStart += count+1;
          }
            
          }
         {
            fs.writeFile('src/assets.json', JSON.stringify(assets), (err) => {
              if (err) {
                console.log('Error during file write:', err);
                return HttpStatus.INTERNAL_SERVER_ERROR;
              } else {
                console.log('File written successfully');
              }
            });
          };
          return assets;
        } catch (error) {
          console.error('Error during CSV to assets conversion:', error);
          return HttpStatus.INTERNAL_SERVER_ERROR;
        }
      };

    
    export default {
        getSubprojectById,
        getSubprojects,
        addSubproject,
        updateSubproject,
        addTrailer,
        deleteSubproject,
        addAssets,
        getAllAssetsFromSubproject,
        getAllSubprojectsFromProject,
        csvReader,
    };
