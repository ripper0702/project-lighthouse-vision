# Project Management App - Implementation Guide

This document outlines the detailed implementation steps for completing the Project Management application's frontend. It includes code snippets, architecture decisions, and best practices to follow.

## Table of Contents

1. [Image Gallery Display](#image-gallery-display)
2. [Preview Functionality](#preview-functionality)
3. [Filtering and Sorting](#filtering-and-sorting)
4. [Search Functionality](#search-functionality)
5. [Export Options](#export-options)
6. [Notifications System](#notifications-system)
7. [User Dashboard](#user-dashboard)
8. [Comments/Notes System](#comments-notes-system)
9. [Approval Workflows](#approval-workflows)
10. [Team Member Profiles](#team-member-profiles)
11. [File Version History](#file-version-history)
12. [Responsive Refinements](#responsive-refinements)
13. [Print Views](#print-views)
14. [Loading States](#loading-states)
15. [Error Handling](#error-handling)
16. [Accessibility Enhancements](#accessibility-enhancements)
17. [Refactoring Recommendations](#refactoring-recommendations)

## Image Gallery Display

### Requirements
- Display uploaded photos in a grid layout
- Implement lightbox functionality for viewing full-size images
- Support image deletion and metadata display

### Implementation

1. Create a new component for the image gallery:

```tsx
// src/components/project/ProjectImageGallery.tsx
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";

interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  uploadDate: string;
}

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  onDeleteImage: (id: string) => void;
}

const ProjectImageGallery = ({ images, onDeleteImage }: ProjectImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-md border">
            <AspectRatio ratio={1 / 1}>
              <img 
                src={image.url} 
                alt={image.caption} 
                className="object-cover w-full h-full cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={() => setSelectedImage(image)}
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end justify-between p-2">
              <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.caption}
              </span>
              <Button 
                variant="destructive" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => onDeleteImage(image.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <div className="relative">
            <Button 
              className="absolute top-2 right-2 rounded-full w-8 h-8 p-0" 
              onClick={() => setSelectedImage(null)}
            >
              <X size={16} />
            </Button>
            <img 
              src={selectedImage?.url} 
              alt={selectedImage?.caption} 
              className="w-full rounded-md"
            />
            <div className="mt-2 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedImage?.caption}</h3>
                <p className="text-sm text-gray-500">Uploaded on {selectedImage?.uploadDate}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => {
                if (selectedImage) {
                  onDeleteImage(selectedImage.id);
                  setSelectedImage(null);
                }
              }}>
                <Trash2 size={16} className="mr-2" /> Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectImageGallery;
```

2. Update the ProjectDocumentation component to use this gallery:

```tsx
// Update in src/components/project/ProjectDocumentation.tsx
import ProjectImageGallery from "./ProjectImageGallery";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, FileText, Receipt, CalendarCheck, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectDocumentationProps {
  projectId: number;
}

interface MilestoneType {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'completed';
  description: string;
}

interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  uploadDate: string;
}

const ProjectDocumentation = ({ projectId }: ProjectDocumentationProps) => {
  const [activeTab, setActiveTab] = useState<string>("photos");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<MilestoneType[]>([
    {
      id: '1',
      title: 'Project Kickoff',
      date: '2025-01-15',
      status: 'completed',
      description: 'Initial meeting with all stakeholders'
    },
    {
      id: '2',
      title: 'Phase 1 Completion',
      date: '2025-02-01',
      status: 'completed',
      description: 'Concept development completed'
    },
    {
      id: '3',
      title: 'Mid-Project Review',
      date: '2025-03-15',
      status: 'pending',
      description: 'Review progress with stakeholders'
    }
  ]);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([
    { id: '1', url: '/placeholder.svg', caption: 'Project Kickoff Meeting', uploadDate: '2025-01-15' },
    { id: '2', url: '/placeholder.svg', caption: 'Site Survey', uploadDate: '2025-01-22' },
    { id: '3', url: '/placeholder.svg', caption: 'Team Planning Session', uploadDate: '2025-02-03' },
  ]);
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const addMilestone = () => {
    const newMilestone: MilestoneType = {
      id: Date.now().toString(),
      title: 'New Milestone',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: 'Describe this milestone'
    };
    
    setMilestones([...milestones, newMilestone]);
  };
  
  const updateMilestoneStatus = (id: string, status: 'pending' | 'completed') => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, status } : milestone
    ));
  };

  const deleteImage = (id: string) => {
    setProjectImages(projectImages.filter(image => image.id !== id));
    // Here you would also delete from backend
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Project Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="photos" className="flex items-center gap-1">
              <ImagePlus size={16} />
              <span>Photos</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <FileText size={16} />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="receipts" className="flex items-center gap-1">
              <Receipt size={16} />
              <span>Receipts</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-1">
              <CalendarCheck size={16} />
              <span>Milestones</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <ImagePlus size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload project photos</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Photos</span>
                </Button>
              </div>
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
            
            <ProjectImageGallery 
              images={projectImages}
              onDeleteImage={deleteImage}
            />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload project reports</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Report</span>
                </Button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {[
                { name: "Initial Assessment Report", date: "2025-01-20" },
                { name: "Progress Report Q1", date: "2025-03-31" },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="receipts" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload expense receipts</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Receipt</span>
                </Button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {[
                { name: "Equipment Purchase", amount: "$1,250.00", date: "2025-01-15" },
                { name: "Venue Booking", amount: "$800.00", date: "2025-01-22" },
              ].map((receipt, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Receipt size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium">{receipt.name}</p>
                      <p className="text-sm text-gray-500">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{receipt.amount}</p>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Project Milestones</h3>
              <Button onClick={addMilestone} className="flex items-center gap-2">
                <CalendarCheck size={16} />
                <span>Add Milestone</span>
              </Button>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-500">Due: {milestone.date}</p>
                      </div>
                      <Button 
                        variant={milestone.status === 'completed' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => updateMilestoneStatus(
                          milestone.id, 
                          milestone.status === 'completed' ? 'pending' : 'completed'
                        )}
                      >
                        {milestone.status === 'completed' ? 'Completed' : 'Mark Complete'}
                      </Button>
                    </div>
                    <p className="text-sm mt-2">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectDocumentation;
```

## Preview Functionality

### Requirements
- Create modals for previewing documents, reports, and receipts
- Support different file types (PDF, image, etc.)
- Implement document viewer for common file formats

### Implementation

1. Create a reusable document preview component:

```tsx
// src/components/shared/DocumentPreview.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, FileImage, FileVideo, File, Download, X } from "lucide-react";

interface DocumentPreviewProps {
  document: {
    id: string;
    name: string;
    type: string;
    url: string;
    date?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentPreview = ({ document, open, onOpenChange }: DocumentPreviewProps) => {
  if (!document) return null;
  
  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <FileImage className="w-6 h-6" />;
    if (type.includes('video')) return <FileVideo className="w-6 h-6" />;
    if (type.includes('pdf')) return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };
  
  const getPreviewContent = (doc: typeof document) => {
    if (!doc) return null;
    
    if (doc.type.includes('image')) {
      return <img src={doc.url} alt={doc.name} className="max-w-full rounded-md" />;
    }
    
    if (doc.type.includes('pdf')) {
      return (
        <iframe 
          src={`${doc.url}#toolbar=0&navpanes=0`} 
          className="w-full h-[70vh] rounded-md border"
        />
      );
    }
    
    // For other file types, show download button
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        {getFileIcon(doc.type)}
        <p className="mt-4 font-medium">{doc.name}</p>
        <p className="text-sm text-gray-500 mb-4">This file preview is not available</p>
        <Button>
          <Download size={16} className="mr-2" /> Download File
        </Button>
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFileIcon(document.type)}
            <span>{document.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {getPreviewContent(document)}
        </div>
        <div className="flex justify-between items-center mt-4">
          {document.date && <p className="text-sm text-gray-500">Added on {document.date}</p>}
          <Button onClick={() => window.open(document.url, '_blank')}>
            <Download size={16} className="mr-2" /> Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;
```

2. Update the reports and receipts sections to use this component:

```tsx
// Update in ProjectDocumentation.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, FileText, Receipt, CalendarCheck, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectImageGallery from "./ProjectImageGallery";
import DocumentPreview from "@/components/shared/DocumentPreview";

interface ProjectDocumentationProps {
  projectId: number;
}

interface MilestoneType {
  id: string;
  title: string;
  date: string;
  status: 'pending' | 'completed';
  description: string;
}

interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  uploadDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  date?: string;
}

const ProjectDocumentation = ({ projectId }: ProjectDocumentationProps) => {
  const [activeTab, setActiveTab] = useState<string>("photos");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<MilestoneType[]>([
    {
      id: '1',
      title: 'Project Kickoff',
      date: '2025-01-15',
      status: 'completed',
      description: 'Initial meeting with all stakeholders'
    },
    {
      id: '2',
      title: 'Phase 1 Completion',
      date: '2025-02-01',
      status: 'completed',
      description: 'Concept development completed'
    },
    {
      id: '3',
      title: 'Mid-Project Review',
      date: '2025-03-15',
      status: 'pending',
      description: 'Review progress with stakeholders'
    }
  ]);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([
    { id: '1', url: '/placeholder.svg', caption: 'Project Kickoff Meeting', uploadDate: '2025-01-15' },
    { id: '2', url: '/placeholder.svg', caption: 'Site Survey', uploadDate: '2025-01-22' },
    { id: '3', url: '/placeholder.svg', caption: 'Team Planning Session', uploadDate: '2025-02-03' },
  ]);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const addMilestone = () => {
    const newMilestone: MilestoneType = {
      id: Date.now().toString(),
      title: 'New Milestone',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: 'Describe this milestone'
    };
    
    setMilestones([...milestones, newMilestone]);
  };
  
  const updateMilestoneStatus = (id: string, status: 'pending' | 'completed') => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, status } : milestone
    ));
  };

  const deleteImage = (id: string) => {
    setProjectImages(projectImages.filter(image => image.id !== id));
    // Here you would also delete from backend
  };
  
  const reports = [
    { name: "Initial Assessment Report", date: "2025-01-20" },
    { name: "Progress Report Q1", date: "2025-03-31" },
  ];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Project Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="photos" className="flex items-center gap-1">
              <ImagePlus size={16} />
              <span>Photos</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <FileText size={16} />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="receipts" className="flex items-center gap-1">
              <Receipt size={16} />
              <span>Receipts</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-1">
              <CalendarCheck size={16} />
              <span>Milestones</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <ImagePlus size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload project photos</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Photos</span>
                </Button>
              </div>
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
            
            <ProjectImageGallery 
              images={projectImages}
              onDeleteImage={deleteImage}
            />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload project reports</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Report</span>
                </Button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {reports.map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setPreviewDocument({
                        id: i.toString(),
                        name: report.name,
                        type: 'application/pdf',
                        url: '/placeholder.pdf',
                        date: report.date
                      });
                      setIsPreviewOpen(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="receipts" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">Upload expense receipts</p>
              <div className="flex justify-center">
                <Button onClick={simulateUpload} className="flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Receipt</span>
                </Button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {[
                { name: "Equipment Purchase", amount: "$1,250.00", date: "2025-01-15" },
                { name: "Venue Booking", amount: "$800.00", date: "2025-01-22" },
              ].map((receipt, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Receipt size={20} className="text-gray-500" />
                    <div>
                      <p className="font-medium">{receipt.name}</p>
                      <p className="text-sm text-gray-500">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{receipt.amount}</p>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Project Milestones</h3>
              <Button onClick={addMilestone} className="flex items-center gap-2">
                <CalendarCheck size={16} />
                <span>Add Milestone</span>
              </Button>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-500">Due: {milestone.date}</p>
                      </div>
                      <Button 
                        variant={milestone.status === 'completed' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => updateMilestoneStatus(
                          milestone.id, 
                          milestone.status === 'completed' ? 'pending' : 'completed'
                        )}
                      >
                        {milestone.status === 'completed' ? 'Completed' : 'Mark Complete'}
                      </Button>
                    </div>
                    <p className="text-sm mt-2">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <DocumentPreview 
        document={previewDocument}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </Card>
  );
};

export default ProjectDocumentation;
```

## Filtering and Sorting

### Requirements
- Filter projects by status, date, and category
- Sort projects by various criteria (name, date, progress)
- Support filtering within project documentation

### Implementation

1. Create a reusable filter component:

```tsx
// src/components/shared/FilterToolbar.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SlidersHorizontal, Search, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterToolbarProps {
  filters: {
    name: string;
    label: string;
    options: FilterOption[];
  }[];
  onFilterChange: (filters: Record<string, string>) => void;
  onSearch?: (term: string) => void;
  showSearch?: boolean;
}

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  showSearch = true 
}: FilterToolbarProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [filterName]: value
    };
    
    if (value === "") {
      delete newFilters[filterName];
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    onSearch && onSearch(searchTerm);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
    setSearchTerm("");
    onSearch && onSearch("");
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || searchTerm.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        {showSearch && (
          <div className="relative flex-grow">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        )}
