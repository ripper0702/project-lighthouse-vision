
import PageLayout from "../components/layout/PageLayout";
import { operationalNeeds } from "../data/projectData";
import OperationalNeedCard from "../components/ui-components/OperationalNeedCard";
import TabBar from "../components/ui-components/TabBar";

const OperationalNeeds = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title="Operational Needs" showBackButton={true}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Our Operational Needs</h1>
          <p className="text-gray-600">Get to know what will make us succeed.</p>
        </div>
        
        {operationalNeeds.map(need => (
          <OperationalNeedCard
            key={need.id}
            title={need.title}
            description={need.description}
          />
        ))}
      </PageLayout>
      
      <TabBar />
    </div>
  );
};

export default OperationalNeeds;
