import { Project as ProjectPrisma,
    Subproject as SubprojectPrisma,
  } from "@prisma/client";
  
  import { Project } from "./project";
  
  const mapToProject = ({
      id: id,
      title,
      description,
      venueAddress,
      crewChief,
      createdAt,
      updatedAt,
      subprojects,
      
  }: ProjectPrisma  &{subprojects?:SubprojectPrisma[]}): Project =>
    new Project({
        id,
        title,
        description,
        venueAddress,
        crewChief,
        createdAt,
        updatedAt,
        subprojects,
    });
  
    export const mapToProjects = async (projectsPrisma: ProjectPrisma[]): Promise<Project[]> =>
    projectsPrisma.map((project) => mapToProject(project));
  
  export const mapToSingleProject = async (projectPrisma: ProjectPrisma): Promise<Project> =>
    mapToProject(projectPrisma);
  
  export default { mapToProjects, mapToSingleProject };