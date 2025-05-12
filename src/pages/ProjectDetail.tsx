
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Calendar, Clock, ChartBar, PresentationChart } from "@phosphor-icons/react";
import { projects } from "../data/projectData";
import TabBar from "../components/ui-components/TabBar";
import { Button } from "@/components/ui/button";
import ProjectInitializationModal from "../components/project/ProjectInitializationModal";
import { Progress } from "@/components/ui/progress";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <PageLayout title="Project Not Found" showBackButton={true}>
        <div className="ios-card">
          <h2 className="text-xl font-semibold text-gray-800">Project not found</h2>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
        </div>
      </PageLayout>
    );
  }
  
  // Mock data for project progress
  const projectProgress = 35; // Percentage complete
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title={project.name} showBackButton={true}>
        {/* Project Header */}
        <div className="ios-card mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>
          
          {project.date && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Calendar size={18} className="mr-2 text-primary-500" />
              <span>{project.date}</span>
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Project Progress</span>
              <span className="font-medium">{projectProgress}%</span>
            </div>
            <Progress value={projectProgress} className="h-2" />
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary-500 hover:bg-primary-600"
            >
              <PresentationChart size={20} className="mr-2" />
              Start Project Implementation
            </Button>
          </div>
        </div>
        
        {/* Project Details */}
        <div className="ios-card">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Details</h2>
          <p className="text-gray-600">{project.details || "No additional details available for this project."}</p>
        </div>
      </PageLayout>
      
      <ProjectInitializationModal
        projectName={project.name}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      <TabBar />
    </div>
  );
};

export default ProjectDetail;
