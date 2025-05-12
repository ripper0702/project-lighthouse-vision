
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Calendar, Clock, ChartBar, PresentationChart, ArrowRight, ListChecks } from "@phosphor-icons/react";
import { projects } from "../data/projectData";
import TabBar from "../components/ui-components/TabBar";
import { Button } from "@/components/ui/button";
import ProjectInitializationModal from "../components/project/ProjectInitializationModal";
import { Progress } from "@/components/ui/progress";
import ValueCard from "../components/ui-components/ValueCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectDocumentation from "../components/project/ProjectDocumentation";
import ProjectAdjustments from "../components/project/ProjectAdjustments";

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
  
  // Mock data for implementation phases
  const implementationPhases = [
    { id: 1, name: "Concept Development", progress: 100 },
    { id: 2, name: "Feasibility Study", progress: 75 },
    { id: 3, name: "Planning", progress: 50 },
    { id: 4, name: "Implementation", progress: 20 },
    { id: 5, name: "Monitoring & Evaluation", progress: 0 },
    { id: 6, name: "Reporting & Assessment", progress: 0 },
  ];
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title={project.name} showBackButton={true}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="phases">Implementation Phases</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
              
              <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-primary-500 hover:bg-primary-600"
                >
                  <PresentationChart size={20} className="mr-2" />
                  Start Implementation
                </Button>
              </div>
            </div>
            
            <div className="ios-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Details</h2>
              <p className="text-gray-600">{project.details || "No additional details available for this project."}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="phases">
            <div className="space-y-6">
              <div className="ios-card">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Implementation Phases</h2>
                </div>
                <p className="text-gray-600 mt-1">Track progress through each phase of the project implementation.</p>
              </div>
              
              <div className="space-y-4">
                {implementationPhases.map((phase) => (
                  <Card key={phase.id} className="ios-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{phase.id}. {phase.name}</span>
                        <span className="text-sm font-normal text-gray-500">{phase.progress}%</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={phase.progress} className="h-2 mb-3" />
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          className="text-xs flex items-center"
                        >
                          View Details
                          <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documentation">
            <ProjectDocumentation projectId={projectId} />
          </TabsContent>
          
          <TabsContent value="adjustments">
            <ProjectAdjustments projectId={projectId} />
          </TabsContent>
        </Tabs>
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
