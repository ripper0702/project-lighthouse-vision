
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import TabBar from "../components/ui-components/TabBar";
import { ArrowRight, Calendar, List, Target, Users, Lightbulb } from "@phosphor-icons/react";
import { projects } from "../data/projectData";

const Index = () => {
  // Show only the first 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title="CCS Management" showBackButton={false}>
        {/* Hero */}
        <div className="relative h-48 -mx-4 mb-6 bg-gradient-to-r from-primary-600 to-primary-400 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <h1 className="text-white text-3xl font-bold">2025 Strategic Plan</h1>
            <p className="text-white/80 mt-2">Corporate Chaplaincy Services</p>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-2 -mx-1">
            <QuickLink 
              to="/vision-mission"
              icon={<Lightbulb size={24} />}
              label="Vision & Mission"
            />
            <QuickLink 
              to="/projects"
              icon={<List size={24} />}
              label="Projects"
            />
            <QuickLink 
              to="/plans"
              icon={<Calendar size={24} />}
              label="Plans"
            />
            <QuickLink 
              to="/about"
              icon={<Users size={24} />}
              label="About Us"
            />
            <QuickLink 
              to="/operational-needs"
              icon={<Target size={24} />}
              label="Needs"
            />
          </div>
        </div>
        
        {/* Featured Projects */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="ios-header">Key Projects</h2>
            <Link to="/projects" className="ios-nav-button">
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          {featuredProjects.map((project) => (
            <div key={project.id} className="ios-card mb-4">
              <Link to={`/project/${project.id}`}>
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                {project.date && (
                  <div className="mt-3 text-xs text-primary-500 font-medium">
                    {project.date}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
        
        {/* Vision & Mission Preview */}
        <div className="mb-8 ios-card">
          <h2 className="ios-header mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            To champion and become a beacon of spiritual care and wholistic wellness in the workplace, institutions, sport and beyond.
          </p>
          <Link to="/vision-mission" className="ios-button inline-block">
            Learn More
          </Link>
        </div>
      </PageLayout>
      
      <TabBar />
    </div>
  );
};

interface QuickLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const QuickLink = ({ to, icon, label }: QuickLinkProps) => (
  <Link
    to={to}
    className="flex-shrink-0 w-20 mx-1 flex flex-col items-center p-3 rounded-xl bg-white shadow-sm border border-gray-50"
  >
    <div className="text-primary-500 mb-2">{icon}</div>
    <span className="text-xs text-gray-700 text-center">{label}</span>
  </Link>
);

export default Index;
