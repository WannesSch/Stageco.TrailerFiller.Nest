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
          let idStart = await database.asset.count();
          let idStartContent = await database.content.count() +1;
          let currentBoxForContent: Asset | undefined = undefined;
          const fileData = await fs.promises.readFile('src/' + filename + '.csv', 'utf-8');
          const lines = fileData.split('\n');
          let blokId = lines.length + 1 + idStart;
          for (const line of lines) {
            const cells = line.split(';');
            // Filter based on category and count
            const category = parseInt(cells[0]);
            const count = parseInt(cells[5]);
          
            if (cells[4] && cells[4].includes(',')) {
              cells[4] = cells[4].replace(',', '.');
            }
            if (cells[6] && cells[6].includes(',')) {
              cells[6] = cells[6].replace(',', '.');
            }
            if (category === 1 && count === 1 && cells[1].length > 0) {
              // Create a new box
              const currentBox = new Asset({
                category: category,
                id: idStart + Number(cells[1]),
                unit: cells[2],
                name: cells[3],
                weight: Number(cells[4]),
                width: Number(cells[6]),
                height: Number(cells[7]),
                depth: Number(cells[8]),
                content: [], // Array to store little stuff
            });
              assets.push(currentBox);
              currentBoxForContent = currentBox
              await database.asset.create({
                data: {
                  id: currentBox.id,
                  category: currentBox.category,
                  unit: currentBox.unit,
                  name: currentBox.name,
                  weight: currentBox.weight,
                  width: currentBox.width,
                  height: currentBox.height,
                  depth: currentBox.depth,
                  subprojectId: subprojectId,
                },
              });
            } else if (category === 2 && count > 1) {
              const currentBox = currentBoxForContent;
              if (currentBoxForContent) {
                // Add little stuff to the current box's content
                  const littleStuff = new Content({
                    id: idStartContent++, // Increment the ID for each little stuff item
                    unit: cells[2],
                    name: cells[3],
                    weight: Number(cells[4]),
                    amount: Number(cells[5]),
                    boxId: currentBox.id,
                  });
      
                  if (currentBox) {
                  currentBox.content.push(littleStuff);
                  }
                  await database.content.create({
                    data: {
                      id: littleStuff.id,
                      unit: littleStuff.unit,
                      name: littleStuff.name,
                      weight: littleStuff.weight,
                      amount: littleStuff.amount,
                      boxId: littleStuff.boxId,
                    },
                  });
                }
        
                await database.asset.update({
                  where: {
                    id: currentBox.id,
                  },
                  data: {
                    content: {
                      connect: currentBox.content.map((littleStuff) => ({
                        id: littleStuff.id,
                      })),
                    },
                  },
                });
      
            } else if (category === 1 && count === 1 && cells[1].length === 0) {
              const grootObject = await database.asset.create({
                data: {
                  id: blokId++,
                  unit: cells[2],
                  category: category,
                  name: cells[3],
                  weight: Number(cells[4]),
                  width: Number(cells[6]),
                  height: Number(cells[7]),
                  depth: Number(cells[8]),
                  subprojectId: subprojectId,
                },
              });
              assets.push(grootObject);
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
