import { oopModules } from "./oop/modules"

export function getModuleById(courseSlug: string, moduleId: string) {
  if (courseSlug === "oop") {
    return oopModules.find(m => m.id === moduleId)
  }

  return null
}
