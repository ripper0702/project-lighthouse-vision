
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProjectInitializationModalProps {
  projectName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectInitializationModal = ({ projectName, isOpen, onOpenChange }: ProjectInitializationModalProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const steps = [
    {
      id: 1,
      title: "Concept Development",
      sections: [
        {
          title: "Define the Problem or Opportunity",
          description: "What gap or need does the project address?",
          input: "textarea"
        },
        {
          title: "Develop the Idea",
          description: "Brainstorm and outline the core concept or solution.",
          input: "textarea"
        },
        {
          title: "Set Objectives",
          description: "SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound.",
          input: "textarea"
        }
      ]
    },
    {
      id: 2,
      title: "Feasibility Study",
      sections: [
        {
          title: "Market Research",
          description: "Demand, beneficiaries, competitors, trends.",
          input: "textarea"
        },
        {
          title: "Technical Feasibility",
          description: "Is it possible to execute (skills, tools, systems)?",
          input: "textarea"
        },
        {
          title: "Financial Feasibility",
          description: "Costs, revenue, ROI, funding sources.",
          input: "textarea"
        },
        {
          title: "Risk Assessment",
          description: "Identify risks and mitigation strategies.",
          input: "textarea"
        }
      ]
    },
    {
      id: 3,
      title: "Planning Phase",
      sections: [
        {
          title: "Write a Project Proposal or Business Plan",
          description: "Include all components: objectives, budget, timelines, partners, etc.",
          input: "textarea"
        },
        {
          title: "Design the Work Plan",
          description: "Tasks, roles, responsibilities, schedule (Gantt chart or calendar).",
          input: "textarea"
        },
        {
          title: "Budgeting",
          description: "Detailed financial breakdown.",
          input: "textarea"
        },
        {
          title: "Secure Funding or Resources",
          description: "Grants, investors, loans, partnerships.",
          input: "textarea"
        }
      ]
    },
    {
      id: 4,
      title: "Implementation Phase",
      sections: [
        {
          title: "Mobilization",
          description: "Team recruitment, resource purchase, site prep.",
          input: "textarea"
        },
        {
          title: "Execution",
          description: "Start project activities according to plan.",
          input: "textarea"
        },
        {
          title: "Documentation",
          description: "Record every stage—photos, reports, receipts, milestones.",
          input: "textarea"
        }
      ]
    },
    {
      id: 5,
      title: "Monitoring and Evaluation (M&E)",
      sections: [
        {
          title: "Monitoring",
          description: "Track progress (weekly/monthly reports, KPIs).",
          input: "textarea"
        },
        {
          title: "Evaluation",
          description: "Compare actual vs. planned outcomes.",
          input: "textarea"
        },
        {
          title: "Adjustments",
          description: "Realign where necessary—budget, team, timeline.",
          input: "textarea"
        }
      ]
    },
    {
      id: 6,
      title: "Reporting & Impact Assessment",
      sections: [
        {
          title: "Final Report",
          description: "Results, lessons learned, challenges, and successes.",
          input: "textarea"
        },
        {
          title: "Impact Assessment",
          description: "Long-term benefits and sustainability.",
          input: "textarea"
        },
        {
          title: "Stakeholder Presentation",
          description: "Share results with funders, partners, community, etc.",
          input: "textarea"
        }
      ]
    }
  ];
  
  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };
  
  const isStepComplete = (stepId: number) => {
    return completedSteps.includes(stepId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Project Implementation: {projectName}</span>
            <DialogClose className="text-gray-500 hover:text-gray-700">
              <Button variant="ghost" size="sm">Done</Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step) => (
              <AccordionItem key={step.id} value={`step-${step.id}`}>
                <AccordionTrigger className="text-lg font-medium hover:bg-gray-50 rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    {isStepComplete(step.id) && (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                    <span>{step.id}. {step.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-4">
                    {step.sections.map((section, idx) => (
                      <div key={idx} className="ios-card">
                        <h3 className="text-md font-medium mb-1">{section.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                        <div className="mt-2">
                          {section.input === "textarea" ? (
                            <textarea 
                              className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Enter your notes here..."
                            ></textarea>
                          ) : (
                            <Input placeholder="Enter your input here..." />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={() => markStepComplete(step.id)}
                        className="bg-primary-500 hover:bg-primary-600"
                      >
                        Mark as Complete
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectInitializationModal;
