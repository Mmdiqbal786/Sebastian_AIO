export type AppStatus = {
  name: string;
  isActive?: boolean;
};

export const statuses: AppStatus[] = [
  { name: "active", isActive: true },
  { name: "inActive", isActive: true },
  { name: "submitted", isActive: true },
  { name: "review", isActive: true },
  { name: "inReview", isActive: true },
  { name: "approved", isActive: true },
  { name: "rejected", isActive: true },
  { name: "paid", isActive: true },
  { name: "complete", isActive: true },
  { name: "inProgress", isActive: true },
  { name: "onHold", isActive: true },
  { name: "cancelled", isActive: true },
  { name: "delayed", isActive: true },
  { name: "terminated", isActive: true },
  { name: "inActive", isActive: true },
  { name: "retired", isActive: true },
  { name: "onLeave", isActive: true },
  { name: "medicalLeave", isActive: true },
  { name: "parentalLeave", isActive: true },
  { name: "unPaidLeave", isActive: true },
  { name: "shortTermLOA", isActive: true },
  { name: "longTermLOA", isActive: true },
  { name: "probation", isActive: true },
  { name: "preHire", isActive: true },
  { name: "onGoing", isActive: true },
  { name: "resigned", isActive: true },
  { name: "renew", isActive: true },
];