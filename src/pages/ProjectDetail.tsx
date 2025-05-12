
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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");
  
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
  
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
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
                
                <Button
                  variant="outline"
                  onClick={() => setActiveSection("phases")}
                  className="w-full"
                >
                  <ListChecks size={20} className="mr-2" />
                  View Implementation Phases
                </Button>
              </div>
            </div>
            
            <div className="ios-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Details</h2>
              <p className="text-gray-600">{project.details || "No additional details available for this project."}</p>
            </div>
          </>
        );
        
      case "phases":
        return (
          <div className="space-y-6">
            <div className="ios-card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Implementation Phases</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveSection("overview")}
                >
                  Back to Overview
                </Button>
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
                        onClick={() => {
                          setActiveSection(`phase-${phase.id}`);
                        }}
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
        );
        
      case "phase-1":
        return (
          <div className="space-y-6">
            <div className="ios-card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Concept Development</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveSection("phases")}
                >
                  Back to Phases
                </Button>
              </div>
              <p className="text-gray-600 mt-1">Define the problem, develop the idea, and set objectives.</p>
              <Progress value={100} className="h-2 mt-4" />
              <div className="text-right text-sm mt-1 font-medium">Complete</div>
            </div>
            
            <div className="space-y-4">
              <ValueCard number={1} title="Define the Problem or Opportunity" />
              <div className="ios-card">
                <p className="text-gray-700">This project addresses the need for spiritual support and comfort to patients and hospital staff at Arundel Hospital through a dedicated Sabbath program.</p>
                <p className="text-gray-600 mt-2 italic">Gap Analysis: Limited spiritual care resources currently available for patients during their recovery journey.</p>
              </div>
              
              <ValueCard number={2} title="Develop the Idea" />
              <div className="ios-card">
                <p className="text-gray-700">A structured Sabbath program that combines worship, testimonies, counseling, and music to create a healing environment.</p>
                <p className="text-gray-600 mt-2 italic">Core components: Worship service, testimony sharing, prayer sessions, musical performances.</p>
              </div>
              
              <ValueCard number={3} title="Set Objectives" />
              <div className="ios-card">
                <h3 className="font-medium mb-2">SMART Goals:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Specific:</strong> Conduct a 3-hour Sabbath program at Arundel Hospital</li>
                  <li><strong>Measurable:</strong> Engage at least 50 patients and 20 staff members</li>
                  <li><strong>Achievable:</strong> Utilize existing chaplaincy resources and volunteers</li>
                  <li><strong>Relevant:</strong> Aligns with our mission of providing spiritual care</li>
                  <li><strong>Time-bound:</strong> Scheduled for February 1, 2025</li>
                </ul>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={() => setActiveSection("phase-2")} className="bg-primary-500">
                  Next Phase: Feasibility Study
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        );
        
      // Add cases for other phases (phase-2 through phase-6) when needed
      
      default:
        return (
          <div className="ios-card">
            <h2 className="text-xl font-semibold text-gray-800">Coming Soon</h2>
            <p className="text-gray-600 mt-2">This section is under development.</p>
            <Button 
              onClick={() => setActiveSection("overview")} 
              variant="outline" 
              className="mt-4"
            >
              Return to Overview
            </Button>
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title={activeSection === "overview" ? project.name : `${project.name} - ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}`} showBackButton={true}>
        {renderSection()}
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
