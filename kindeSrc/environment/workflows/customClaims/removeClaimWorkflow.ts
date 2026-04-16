import {
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  WorkflowTrigger,
  accessTokenCustomClaims,
  getEnvironmentVariable,
} from "@kinde/infrastructure";

// The setting for this workflow
export const workflowSettings: WorkflowSettings = {
  id: "removeClaimWorkflow",
  name: "Remove Claim Workflow",
  trigger: WorkflowTrigger.UserTokenGeneration,
  failurePolicy: {
    action: "stop",
  },
  bindings: {
    "kinde.accessToken": {}, // required to modify access token claims
    url: {}, // required for url params
  },
};

// The workflow code to be executed when the event is triggered
export default async function Workflow(event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    permissions: string[]
    feature_flags: Record<string, unknown>
  }>()

  accessToken.permissions = ["Samsu"]
  accessToken.feature_flags = {"samsu": "kopa"}
}