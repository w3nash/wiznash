export interface UserProfile {
  firstName: string;
  lastName: string;
  year: string;
  school: string;
  skills: string[];
  interests: string[];
  goals: string[];
  relationships: {
    name: string;
    relation: string;
  }[];
  recentTasks: string[];
}

export const profile: UserProfile = {
  firstName: "Jonash",
  lastName: "Marcelino",
  year: "3rd Year",
  school: "Gordon College",
  skills: [
    "Programming",
    "Problem Solving",
    "Web Development",
    "Mobile Development",
  ],
  interests: [
    "Different Programming Paradigms",
    "Sustainable Computing Practices",
    "Artificial Intelligence",
    "Machine Learning",
  ],
  goals: [
    "Master various programming languages",
    "Contribute to open-source projects",
    "Develop sustainable computing solutions",
    "Build a personal AI assistant",
  ],
  relationships: [
    { name: "Summer", relation: "Dog" },
    { name: "Jedd", relation: "Instructor" },
  ],
  recentTasks: [
    "Working on a programming assignment",
    "Researching sustainable computing practices",
    "Building a personal project using React and Next.js",
  ],
};

// Extract profile context for AI prompt
export function getProfileContext(): string {
  return `
Master User Profile:
Name: ${profile.firstName} ${profile.lastName}
Year: ${profile.year}
School: ${profile.school}
Skills: ${profile.skills.join(", ")}
Interests: ${profile.interests.join(", ")}
Goals: ${profile.goals.join(", ")}
Relationships: ${profile.relationships
    .map((r) => `${r.name} (${r.relation})`)
    .join(", ")}
Tasks: ${profile.recentTasks.join(", ")}
  `.trim();
}
