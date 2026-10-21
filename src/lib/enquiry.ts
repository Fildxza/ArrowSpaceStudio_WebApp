/** Lets service links pre-select a project type in the enquiry form. */
export const ENQUIRY_EVENT = "enquiry:select";

export function announceEnquiry(projectType: string) {
  window.dispatchEvent(new CustomEvent<string>(ENQUIRY_EVENT, { detail: projectType }));
}
