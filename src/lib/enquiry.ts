/** Lets service links pre-select a project type (by service id) in the enquiry form. */
export const ENQUIRY_EVENT = "enquiry:select";

export function announceEnquiry(serviceId: string) {
  window.dispatchEvent(new CustomEvent<string>(ENQUIRY_EVENT, { detail: serviceId }));
}
