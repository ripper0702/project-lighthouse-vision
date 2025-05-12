
import PageLayout from "../components/layout/PageLayout";
import { aboutInfo, clients, values } from "../data/projectData";
import ValueCard from "../components/ui-components/ValueCard";
import TabBar from "../components/ui-components/TabBar";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      <PageLayout title="About CCS" showBackButton={true}>
        {/* Who We Are */}
        <div className="ios-card mb-6">
          <h2 className="ios-header">Who We Are</h2>
          <p className="text-gray-600 mb-3">{aboutInfo.description1}</p>
          <p className="text-gray-600">{aboutInfo.description2}</p>
        </div>
        
        {/* Our Values */}
        <div className="mb-6">
          <h2 className="ios-header mb-4">Our Values</h2>
          {values.map(value => (
            <ValueCard 
              key={value.id} 
              number={value.id} 
              title={value.name} 
            />
          ))}
        </div>
        
        {/* Our Clients */}
        <div className="ios-card mb-6">
          <h2 className="ios-header mb-4">Our Clients</h2>
          <div className="flex flex-wrap gap-2">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
      
      <TabBar />
    </div>
  );
};

export default About;
