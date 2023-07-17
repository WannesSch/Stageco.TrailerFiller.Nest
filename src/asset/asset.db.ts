import { mapToSingleAsset,mapToAssets } from './asset.mapper';
import { Asset } from './asset';
import * as fs from 'fs';
import { Content } from 'src/content/content';
import database from '../prisma/database';


const csvToAssets = async (filename: string): Promise<Asset[]> => {
  try {
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
          content: [] // Array to store little stuff
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
          },
        });
      } else if (category === 2 && count > 1) {
        const currentBox = currentBoxForContent;
        if (currentBoxForContent) {
          // Add little stuff to the current box's content
          for (let i = 0; i < count; i++) {
            const littleStuff = new Content({
              id: idStartContent++, // Increment the ID for each little stuff item
              unit: cells[2],
              name: cells[3],
              weight: Number(cells[4]),
              amount: Number(cells[5]),
              bakId: currentBox.id,
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
                bakId: littleStuff.bakId,
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
        }
      } else if (category === 1 && count === 1 && cells[1].length === 0) {
        // Handle racks
        const rack = await database.asset.create({
          data: {
            id: blokId++,
            unit: cells[2],
            category: category,
            name: cells[3],
            weight: Number(cells[4]),
            width: Number(cells[6]),
            height: Number(cells[7]),
            depth: Number(cells[8]),
          },
        });
        assets.push(rack);
      }
    }
   {
      fs.writeFile('src/assets.json', JSON.stringify(assets), (err) => {
        if (err) {
          console.error('Error during file write:', err);
          throw err;
        } else {
          console.log('File written successfully\n');
        }
      });
    };
    return assets;
  } catch (error) {
    console.error('Error during CSV to assets conversion:', error);
    throw error;
  }
};
        


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


    const deleteAsset = async (id: string): Promise<void> => {
        const deletedAsset = await database.asset.delete({
        where: {
        id: parseInt(id),
        },
        include: {
        content: true,
        },
    });
    }


    const getAssets = async (): Promise<Asset[]> => {
        const assets = await database.asset.findMany({
        include: {
        content: true,
        },
    });
    return mapToAssets(assets);
    }


    const addAsset = async (asset: Asset): Promise<Asset> => {
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
    return mapToSingleAsset(newAsset);
    }


  
    const updateAsset = async (id: string,asset: Asset): Promise<Asset> => {
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

    return mapToSingleAsset(updatedAsset);
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
          const setRotation = async (id: string, rotation: number[]) => {
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
            return mapToSingleAsset(updatedAsset);
          }
          const setPosition = async (id: string, position: number[]) => {
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
            return mapToSingleAsset(updatedAsset);
          }
          

          


    
    export default {
        getAssetById,
        getAssets,
        addAsset,
        updateAsset,
        deleteAsset,
        csvToAssets,
        getAllNoContent,
        getRotation,
        getPosition,
        setRotation,
        setPosition,
    };

