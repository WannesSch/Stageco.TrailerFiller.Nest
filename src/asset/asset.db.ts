import { mapToSingleAsset,mapToAssets } from './asset.mapper';
import { Asset } from './asset';
import * as fs from 'fs';
import { Content } from 'src/content/content';
import database from '../prisma/database';
import { HttpStatus } from '@nestjs/common';


// const csvToAssets = async (filename: string): Promise<Asset[]|HttpStatus> => {
//   try {
//     const assets: Asset[] = [];
//     let idStart = await database.asset.count();
//     let idStartContent = await database.content.count() +1;
//     let currentBoxForContent: Asset | undefined = undefined;
//     const fileData = await fs.promises.readFile('src/' + filename + '.csv', 'utf-8');
//     const lines = fileData.split('\n');
//     let blokId = lines.length + 1 + idStart;
//     for (const line of lines) {
//       const cells = line.split(';');
//       // Filter based on category and count
//       const category = parseInt(cells[0]);
//       const count = parseInt(cells[5]);
    
//       if (cells[4] && cells[4].includes(',')) {
//         cells[4] = cells[4].replace(',', '.');
//       }
//       if (cells[6] && cells[6].includes(',')) {
//         cells[6] = cells[6].replace(',', '.');
//       }
//       if (category === 1 && count === 1 && cells[1].length > 0) {
//         // Create a new box
//         const currentBox = new Asset({
//           category: category,
//           id: idStart + Number(cells[1]),
//           unit: cells[2],
//           name: cells[3],
//           weight: Number(cells[4]),
//           width: Number(cells[6]),
//           height: Number(cells[7]),
//           depth: Number(cells[8]),
//           content: [] // Array to store little stuff
//         });
//         assets.push(currentBox);
//         currentBoxForContent = currentBox
//         await database.asset.create({
//           data: {
//             id: currentBox.id,
//             category: currentBox.category,
//             unit: currentBox.unit,
//             name: currentBox.name,
//             weight: currentBox.weight,
//             width: currentBox.width,
//             height: currentBox.height,
//             depth: currentBox.depth,
//           },
//         });
//       } else if (category === 2 && count > 1) {
//         const currentBox = currentBoxForContent;
//         if (currentBoxForContent) {
//           // Add little stuff to the current box's content
//             const littleStuff = new Content({
//               id: idStartContent++, // Increment the ID for each little stuff item
//               unit: cells[2],
//               name: cells[3],
//               weight: Number(cells[4]),
//               amount: Number(cells[5]),
//               bakId: currentBox.id,
//             });

//             if (currentBox) {
//             currentBox.content.push(littleStuff);
//             }
//             await database.content.create({
//               data: {
//                 id: littleStuff.id,
//                 unit: littleStuff.unit,
//                 name: littleStuff.name,
//                 weight: littleStuff.weight,
//                 amount: littleStuff.amount,
//                 bakId: littleStuff.bakId,
//               },
//             });
//           }
  
//           await database.asset.update({
//             where: {
//               id: currentBox.id,
//             },
//             data: {
//               content: {
//                 connect: currentBox.content.map((littleStuff) => ({
//                   id: littleStuff.id,
//                 })),
//               },
//             },
//           });

//       } else if (category === 1 && count === 1 && cells[1].length === 0) {
//         // Handle racks
//         const rack = await database.asset.create({
//           data: {
//             id: blokId++,
//             unit: cells[2],
//             category: category,
//             name: cells[3],
//             weight: Number(cells[4]),
//             width: Number(cells[6]),
//             height: Number(cells[7]),
//             depth: Number(cells[8]),
//           },
//         });
//         assets.push(rack);
//       }
//     }
//    {
//       fs.writeFile('src/assets.json', JSON.stringify(assets), (err) => {
//         if (err) {
//           console.log('Error during file write:', err);
//           return HttpStatus.INTERNAL_SERVER_ERROR;
//         } else {
//           console.log('File written successfully');
//         }
//       });
//     };
//     return assets;
//   } catch (error) {
//     console.error('Error during CSV to assets conversion:', error);
//     return HttpStatus.INTERNAL_SERVER_ERROR;
//   }
// };
        


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
    if(mapToSingleAsset(newAsset)==null) return HttpStatus.I_AM_A_TEAPOT;
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

