export type RemoteEntryType =
  | `${'https' | 'http'}://${string}/remoteEntry.js`
  | `${'https' | 'http'}://${string}/remoteEntry.js?${string}`;
