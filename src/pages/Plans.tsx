
import PageLayout from "../components/layout/PageLayout";
import { plans } from "../data/projectData";
import PlanCard from "../components/ui-components/PlanCard";
import TabBar from "../components/ui-components/TabBar";
import { 
  NotePencil, 
  Megaphone, 
  Chalkboard, 
  Globe, 
  HandHeart, 
  Calendar, 
  UsersThree, 
  FirstAid 
} from "@phosphor-icons/react";

const Plans = () => {
  // Icons for each plan
  const planIcons = [
    <NotePencil size={28} />,
    <Megaphone size={28} />,
    <Chalkboard size={28} />,
    <Globe size={28} />,
    <HandHeart size={28} />,
    <Calendar size={28} />,
    <UsersThree size={28} />,
    <FirstAid size={28} />
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title="Our 2025 Plans" showBackButton={true}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Our 2025 Plans</h1>
          <p className="text-gray-600">Get to know how we will work this year.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              icon={planIcons[index]}
              title={plan.name}
              description={plan.description}
            />
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          The actual dates and schedule for the programs above are available in our calendar of events.
        </div>
      </PageLayout>
      
      <TabBar />
    </div>
  );
};

export default Plans;
