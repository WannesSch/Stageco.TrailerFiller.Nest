import { Content } from "./content";
import { Content as ContentPrisma } from "@prisma/client";

const mapToContent = ({
  id,
  unit,
  name,
  weight,
  bakId,
    amount,
}: ContentPrisma): Content => {
    
  return new Content({
    id,
    unit,
    name,
    weight,
    bakId,
    amount,

  });
};

export const mapToContents = (contentPrisma: ContentPrisma[]): Content[] =>
  contentPrisma.map((content) => mapToContent(content));

export const mapToSingleContent = (contentPrisma: ContentPrisma): Content =>
  mapToContent(contentPrisma);

export default { mapToContents, mapToSingleContent };


