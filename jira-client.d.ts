declare module 'jira-client' {
  interface JiraClientOptions {
    protocol: string;
    host: string;
    username: string;
    password: string;
    apiVersion: string;
    strictSSL: boolean;
  }

  export default class JiraClient {
    constructor(options: JiraClientOptions);
    findIssue(issueId: string): Promise<any>;
    // Add other methods you use from the JiraClient here
  }
}