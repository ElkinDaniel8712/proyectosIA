import fs from "fs";
import path from "path";
import { Project, ProjectComment } from "./src/types";
import { INITIAL_GTD_PROJECTS } from "./src/data/seedProjects";

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json");

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllProjects(): Project[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    if (!fs.existsSync(PROJECTS_FILE)) {
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(INITIAL_GTD_PROJECTS, null, 2), "utf-8");
      return INITIAL_GTD_PROJECTS;
    }
    const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
    const list: Project[] = JSON.parse(raw);
    if (!Array.isArray(list)) {
      return [];
    }
    return list;
  } catch (err) {
    console.error("Error reading projects from file storage:", err);
    return [];
  }
}

export function replaceAllProjects(newProjects: Project[]): Project[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(newProjects, null, 2), "utf-8");
    return newProjects;
  } catch (err) {
    console.error("Error replacing all projects in file storage:", err);
    throw err;
  }
}

export function bulkUpsertProjects(incoming: Project[]): Project[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    const existing = getAllProjects();
    const map = new Map<string, Project>();
    for (const p of existing) {
      map.set(p.id, p);
    }
    for (const p of incoming) {
      map.set(p.id, {
        ...p,
        updatedAt: new Date().toISOString(),
      });
    }
    const updatedList = Array.from(map.values());
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(updatedList, null, 2), "utf-8");
    return updatedList;
  } catch (err) {
    console.error("Error bulk upserting projects:", err);
    throw err;
  }
}

export function saveProject(project: Project): Project {
  try {
    ensureDirectoryExists(DATA_DIR);
    const projects = getAllProjects();
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      projects[idx] = { ...projects[idx], ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({
        ...project,
        createdAt: project.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
    return idx >= 0 ? projects[idx] : projects[0];
  } catch (err) {
    console.error("Error saving project to file storage:", err);
    throw err;
  }
}

export function deleteProject(id: string): boolean {
  try {
    ensureDirectoryExists(DATA_DIR);
    const projects = getAllProjects();
    const filtered = projects.filter((p) => p.id !== id);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error deleting project from file storage:", err);
    return false;
  }
}

export function getProjectComments(projectId: string): ProjectComment[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    if (!fs.existsSync(COMMENTS_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(COMMENTS_FILE, "utf-8");
    const allComments: Record<string, ProjectComment[]> = JSON.parse(raw);
    return allComments[projectId] || [];
  } catch (err) {
    console.error("Error getting comments:", err);
    return [];
  }
}

export function addProjectComment(projectId: string, comment: ProjectComment): ProjectComment[] {
  try {
    ensureDirectoryExists(DATA_DIR);
    let allComments: Record<string, ProjectComment[]> = {};
    if (fs.existsSync(COMMENTS_FILE)) {
      try {
        allComments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
      } catch (e) {
        allComments = {};
      }
    }
    if (!allComments[projectId]) {
      allComments[projectId] = [];
    }
    allComments[projectId].push(comment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(allComments, null, 2), "utf-8");
    return allComments[projectId];
  } catch (err) {
    console.error("Error adding project comment:", err);
    return [];
  }
}
