import { mapToSingleAsset,mapToAssets } from './asset.mapper';
import database from '../prisma/database';
import { Asset } from './asset';
import * as fs from 'fs';

 // Cat;UniqueID;Unit;Omschrijving;kg;Aantal;Breedte;Hoogte;Diepte
// 1;1;111220;Box Large Closed;250;1;211.5;88;116
// 2;;101000;woodpad single;2;120;0;0;0
// 1;2;111220;Box Large Closed;250;1;211.5;88;116
// 2;;101005;woodpad double;6;125;0;0;0
// 1;3;111220;Box Large Closed;250;1;211.5;88;116
// 2;;101005;woodpad double;6;125;0;0;0
// 1;4;111220;Box Large Closed;250;1;211.5;88;116
// 2;;101005;woodpad double;6;125;0;0;0

const csvToAssets = async (filename: string): Promise<Asset[]> => {
    const assets: Asset[] = [];
    const fileData = await fs.promises.readFile('src/' + filename + '.csv', 'utf-8');
    const lines = fileData.split('\n');
  
    let currentBox: Asset | null = null;
    let nextId = 1; // Variable to track the next available ID for small stuff items
  
    lines.forEach((line) => {
      const cells = line.split(';');
  
      // Filter based on category and count
      const category = parseInt(cells[0]);
      const count = parseInt(cells[5]);
  
      if (category === 1 && count === 1 && cells[1].length > 0) {
        // Create a new box
        currentBox = new Asset({
          category: category,
          id: Number(cells[1]),
          unit: cells[2],
          name: cells[3],
          weight: Number(cells[4]),
          width: Number(cells[6]),
          height: Number(cells[7]),
          depth: Number(cells[8]),
          content: [] // Array to store little stuff
        });
        assets.push(currentBox);
      } else if (category === 2 && count > 1 && currentBox) {
        // Add little stuff to the current box's content
        for (let i = 0; i < count; i++) {
          const littleStuff = new Asset({
            category: category,
            id: nextId++, // Increment the ID for each little stuff item
            unit: cells[2],
            name: cells[3],
            weight: Number(cells[4]),
            width: Number(cells[6]),
            height: Number(cells[7]),
            depth: Number(cells[8]),
          });
          currentBox.content.push(littleStuff);
        }
      } else if (category === 1 && count === 1 && cells[1].length === 0) {
        // Handle racks
        const rack = new Asset({
          category: category,
          id: Number(cells[1]),
          unit: cells[2],
          name: cells[3],
          weight: Number(cells[4]),
          width: Number(cells[6]),
          height: Number(cells[7]),
          depth: Number(cells[8]),
        });
        assets.push(rack);
      }
    });
    fs.writeFile('src/assets.json', JSON.stringify(assets), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File written successfully\n');
        }
    });

    return assets;
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
    
    export default {
        getAssetById,
        getAssets,
        addAsset,
        updateAsset,
        deleteAsset,
        csvToAssets,
    };
