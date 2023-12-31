import { HttpStatus } from '@nestjs/common';
import { Asset } from 'src/asset/asset';
import { Content } from 'src/content/content';
import database from 'src/prisma/database';
import { mapToSingleAsset } from 'src/asset/asset.mapper';
import * as fs from 'fs';

export const csvHelper = async (
  filename: string,
  id: string,
): Promise<HttpStatus> => {
  try {
    const subprojectId = parseInt(id);
    const assets: Asset[] = [];
    const idee =
      await database.$queryRaw`SELECT id FROM Asset ORDER BY id DESC LIMIT 1`;
    let idStart = 1;
    if ((await database.asset.count()) > 0) {
      idStart = Number(idee[0].id) + 1;
    }
    let newWeight = 0;
    let idStartContent = (await database.content.count()) + 1;
    let currentBoxForContent: Asset | undefined = undefined;
    let littleStuffff: Content | undefined = undefined;
    const fileData = await fs.promises.readFile(filename, 'utf-8');
    const lines = fileData.split('\n');
    for (const line of lines) {
      const cells = line.split(';');
      const category = parseInt(cells[0]);
      const count = parseInt(cells[5]);
      const modelPath = cells[2] + '.gltf';

      if (cells[4] && cells[4].includes(',')) {
        cells[4] = cells[4].replace(',', '.');
      }
      if (cells[6] && cells[6].includes(',')) {
        cells[6] = cells[6].replace(',', '.');
      }

      if (category === 1 && count === 1 && cells[1].length > 0) {
        newWeight = 0;
        const currentBox = await database.asset.create({
          data: {
            id: idStart,
            unit: cells[2],
            name: cells[3],
            weight: Number(cells[4]),
            width: Number(cells[6]),
            height: Number(cells[7]),
            depth: Number(cells[8]),
            category: category,
            subprojectId: subprojectId,
            modelPath: modelPath,
            position: {
              create: {
                x: 0,
                y: 0,
                z: 0,
              },
            },
            rotation: {
              create: {
                x: 0,
                y: 0,
                z: 0,
              },
            },
          },
        });
        currentBoxForContent = mapToSingleAsset(currentBox);
        assets.push(mapToSingleAsset(currentBox));
        idStart += Number(cells[1]);
      } else if (category === 2 && count > 1) {
        if (currentBoxForContent) {
          const littleStuff = await database.content.create({
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

        newWeight += littleStuffff.amount * littleStuffff.weight;
        await database.asset.update({
          where: {
            id: currentBoxForContent.id,
          },
          data: {
            weight: Number(cells[4]) + newWeight,
            content: {
              connect: { id: littleStuffff.id },
            },
          },
        });
      } else if (category === 1 && cells[1].length === 0) {
        newWeight = 0;
        for (let i = 1; i < count + 1; i++) {
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
              position: {
                create: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
              rotation: {
                create: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
            },
          });
          assets.push(mapToSingleAsset(grootObject));
        }
        idStart += count + 1;
      }
    }
    return HttpStatus.OK;
  } catch (error) {
    console.error('Error during CSV to assets conversion:', error);
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
};
