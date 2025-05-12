
export interface Project {
  id: number;
  name: string;
  description: string;
  date?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Arundel Sabbath",
    description: "Host a Sabbath program at Arundel Hospital.",
    date: "01 February 2025",
    details: "Attendees: the sick, beneficiaries with testimonies, nurses and staff. This program aims to provide spiritual support and comfort to patients and hospital staff."
  },
  {
    id: 2,
    name: "GC/SID CPE&CPO TRAINING",
    description: "To Conduct a CPE & CPO Training seminar at SID Offices.",
    date: "19-24 January 2025",
    details: "Attendees: 60+ SID pastors. Tutors: CCS & GC Chaplaincy Director. This training will equip pastors with chaplaincy skills and knowledge for their ministry."
  },
  {
    id: 3,
    name: "SID ENDORSEMENTS",
    description: "To attend and be endorsed during the SID Endorsement Big Sabbath.",
    date: "25 January 2025",
    details: "This is a formal endorsement of our chaplaincy services by the Southern Africa-Indian Ocean Division, providing official recognition and support for our work."
  },
  {
    id: 4,
    name: "Trojan Mine SDA Church building",
    description: "To complete the Church building at Trojan Mine and dedicate it at the end of the Evangelistic Campaign.",
    date: "12 April 2025",
    details: "This project involves completing construction of a church building that will serve the Trojan Mine community, providing a place of worship and spiritual growth."
  },
  {
    id: 5,
    name: "ZPCS & BGF RADIO STATION",
    description: "To launch and run a radio station in partnership with ZPCS.",
    date: "17 February 2025",
    details: "Location: At the old death penalty room. This innovative project will transform a space formerly associated with punishment into one that broadcasts hope, healing, and spiritual support."
  },
  {
    id: 6,
    name: "ZRP CHAPLAINCY DIPLOMA AT SOLUSI",
    description: "100 ZRP Chaplains to attend their last two semesters at Solusi University.",
    date: "2-31 March and 1-31 July 2025",
    details: "Graduation is in November. This educational program will equip police chaplains with advanced training to better serve officers and the community."
  },
  {
    id: 7,
    name: "UNIFORMED FORCES CHAPLAINCY SEMINARS",
    description: "To conduct a 2-day seminar with ZPCS, ZRP & ZNA Chaplains.",
    date: "To be advised",
    details: "This collaborative training will strengthen chaplaincy services across all uniformed forces, promoting best practices and shared resources."
  },
  {
    id: 8,
    name: "VOCATIONAL TRAINING CENTRES CHAPLAINCY",
    description: "To introduce and provide chaplaincy services to vocational training centres and National Youth Service centres under Ministry of Youth.",
    date: "Throughout 2025",
    details: "This initiative will extend spiritual care and support to young people during their vocational training, helping them develop holistically."
  },
  {
    id: 9,
    name: "ZRP COMMISSIONER DEDICATION PROGRAM",
    description: "To conduct a dedication program for the new commission general of police.",
    date: "19 January 2025",
    details: "This important ceremony will provide spiritual blessing and guidance for the new police leadership, emphasizing ethical service and compassionate policing."
  },
  {
    id: 10,
    name: "ACHIEVEMENT CLASSES",
    description: "Introduce achievement classes to all the schools we are providing chaplaincy services to.",
    date: "February 2025",
    details: "Using the pathfinders and adventurers curriculum. This program will enhance character development and life skills for students through structured, values-based activities."
  },
  {
    id: 11,
    name: "GC CHAPLAINCY CONGRESS",
    description: "To attend and present at the GC Chaplaincy world congress in America.",
    date: "29 June-2 July 2025",
    details: "This international gathering will allow us to share our experiences and learn from chaplains worldwide, bringing back valuable insights to enhance our local services."
  },
  {
    id: 12,
    name: "ZITF BOOTH",
    description: "To attend ZITF and have a stand for counselling, prayers and free literature distribution.",
    date: "22-26 April 2025",
    details: "The Zimbabwe International Trade Fair provides an excellent opportunity to reach the public with our services and resources, increasing awareness of chaplaincy support."
  },
  {
    id: 13,
    name: "WHATSAPP AI CHAT BOT",
    description: "Develop an AI WhatsApp chat bot which provides automatic and instant responses to clients.",
    date: "Ongoing development",
    details: "The Bot can link client to a chaplain on a case to case basis. This technology will make spiritual support more accessible, providing immediate response to those in need."
  },
  {
    id: 14,
    name: "SPORTS CHAPLAINCY",
    description: "Introduce chaplaincy to sports teams.",
    date: "Throughout 2025",
    details: "We currently are providing such to Trojan Stars FC, Pitch to Scotland FC, etc. This specialized chaplaincy addresses the unique spiritual and emotional needs of athletes and teams."
  },
  {
    id: 15,
    name: "BGF REHABILITATION CENTRE",
    description: "Proposal to set up a Rehabilitation Centre which uses the 12 Steps of Recovery.",
    date: "Planning phase",
    details: "This center will provide structured support for individuals recovering from various addictions and challenges, using an established and effective approach."
  },
];

export const plans = [
  {
    id: 1,
    name: "WOSE",
    description: "To conduct physical or online weeks of spiritual emphasis at each company, 3 times a year. The online WOSE will be done through the website chatrooms."
  },
  {
    id: 2,
    name: "EVANGELISTIC CAMPAIGNS",
    description: "Conduct 1 week evangelistic campaigns at the mines and Zimphos."
  },
  {
    id: 3,
    name: "SEMINARS",
    description: "To conduct seminars with specialists in the following areas: mental health, marriage and family, financial literacy, drug abuse, communication, spiritualism."
  },
  {
    id: 4,
    name: "ONLINE PROGRAMS",
    description: "Worksite visits, devotions, special services, prayer rooms construction, counseling, offsite visits, funerals, weddings."
  },
  {
    id: 5,
    name: "OUTREACH PROGRAMS",
    description: "Set up booths during functions, corporate events or marathons. Offer free counselling and prayers onsite."
  },
  {
    id: 6,
    name: "SPECIAL DAYS",
    description: "Run targeted campaigns on days such as cancer month, fathers/mothers day, suicide prevention month."
  },
  {
    id: 7,
    name: "ZRP DEVOTIONS & ACTIVITIES",
    description: "To conduct devotions during the morning parade at any police station allocated."
  },
  {
    id: 8,
    name: "ARUNDEL HOSPITAL PROGRAMS",
    description: "Conduct staff, outpatients devotions. Patient rounds, counselling and home visitations post discharge."
  }
];

export const operationalNeeds = [
  {
    id: 1,
    title: "Assistant Chaplains",
    description: "We need assistant chaplains to increase our work efficiency and reduce travel and servicing costs."
  },
  {
    id: 2,
    title: "Work Cellphone",
    description: "There is need for a work cellphone for the purposes of the WhatsApp chatbot, web chat and calls."
  },
  {
    id: 3,
    title: "Vehicle",
    description: "Bulawayo region needs a vehicle for its operations."
  },
  {
    id: 4,
    title: "Bulk Literature",
    description: "We need bulk literature to distribute to all of our companies."
  },
  {
    id: 5,
    title: "Rehabilitation Centre",
    description: "There is an urgent need for a Rehabilitation Centre."
  }
];

export const values = [
  { id: 1, name: "INCLUSIVITY" },
  { id: 2, name: "CONFIDENTIALITY" },
  { id: 3, name: "DIVERSITY" },
  { id: 4, name: "INTEGRITY" },
  { id: 5, name: "INCARNATIONAL" }
];

export const clients = [
  "QUEEN ELIZABETH HOME",
  "CURE CHILDREN'S HOSPITAL",
  "BYWORLD MOTORS",
  "HOLIDAY INN BYO",
  "ZIMPHOS PRIMARY",
  "SHAMVA MINE",
  "FREDA REBECCA",
  "SHAMVA PRIMARY SCH",
  "SHAMVA SECONDARY SCH",
  "SWIVEL ENGINEERING",
  "ENGUTSHENI",
  "IDCZ",
  "CHEMPLEX",
  "ZIMPHOS",
  "BNC",
  "WILLOWVALE INDUSTRY",
  "DEVEN ENGINEERING",
  "ALLIED INSURANCE",
  "ARUNDEL",
  "RUSHINGA MINE",
  "CAPH",
  "DOROWA MINE",
  "ZRP",
  "ZPCS",
  "CHEMPLEX BYO",
  "TROJAN STARS FC",
  "TROJAN PRIMARY"
];

export const aboutInfo = {
  description1: "CCS has partnered with Zimbabwean companies, institutions and sports teams to provide care, counsel, and crisis management services to their employees, students and team members from a Christian perspective.",
  description2: "CCS aims to bring about total wellness in the workplace, institution and nationwide. Your mental and spiritual wellness is our ultimate responsibility."
};

export const visionMission = {
  vision: "To champion and become a beacon of spiritual care and wholistic wellness in the workplace, institutions, sport and beyond.",
  mission: "To provide care, counsel, and crisis management services to employees, business leaders, students, team members and their families. Through a wholistic and all inclusive approach."
};
