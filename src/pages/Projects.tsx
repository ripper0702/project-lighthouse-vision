
import PageLayout from "../components/layout/PageLayout";
import ProjectCard from "../components/ui-components/ProjectCard";
import { projects } from "../data/projectData";
import TabBar from "../components/ui-components/TabBar";

const Projects = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title="Projects" showBackButton={true}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Our 2025 Projects</h1>
          <p className="text-gray-600">Get to know what will be doing in 2025</p>
        </div>
        
        <div>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              date={project.date}
            />
          ))}
        </div>
      </PageLayout>
      
      <TabBar />
    </div>
  );
};

export default Projects;
