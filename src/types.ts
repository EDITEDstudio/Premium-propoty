export interface FinancialData {
  month: string;
  budgeted: number;
  actual: number;
  savings: number;
}

export interface MaintenanceTicket {
  id: string;
  property: string;
  category: "Plumbing" | "Electrical" | "HVAC" | "Security" | "Cleaning";
  status: "Pending" | "In Progress" | "Completed";
  urgency: "Low" | "Medium" | "High" | "Critical";
  date: string;
}

export interface PDCAStep {
  phase: "PLAN" | "DO" | "CHECK" | "ACT";
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  details: string[];
  isoStandard: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  propertyType: "Condominium" | "Housing Estate" | "Office Building" | "อาคารชุด" | "หมู่บ้าน" | "อาคารสำนักงาน";
  propertyName: string;
  location: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  financials: {
    beforeCost: number;
    afterCost: number;
    savingsPercent: number;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  certification: string;
  image: string;
  bio: string;
}
