import { Store } from '@nrwl/angular-console-enterprise-electron';
import { Settings } from '@angular-console/schema';
import { Subject } from 'rxjs';
import { platform } from 'os';

/* tslint:disable */
export function readSettings(store: Store): Settings {
  const settings: Settings = store.get('settings') || {};
  if (settings.canCollectData === undefined) {
    settings.canCollectData = store.get('canCollectData', false);
  }
  if (settings.recent === undefined) {
    settings.recent = [];
  }
  if (settings.installNodeManually === undefined) {
    settings.installNodeManually = false;
  }
  if (settings.enableDetailedStatus === undefined) {
    settings.enableDetailedStatus = true;
  }
  if (settings.channel === undefined) {
    settings.channel = 'latest';
  }
  if (settings.workspaceSchematicsDirectory === undefined) {
    settings.workspaceSchematicsDirectory = 'tools/schematics';
  }
  if (settings.workspaceSchematicsNpmScript === undefined) {
    settings.workspaceSchematicsNpmScript = 'workspace-schematic';
  }
  if (settings.isWsl === undefined || platform() !== 'win32') {
    settings.isWsl = false;
  }
  const authUtils = require('@nrwl/angular-console-enterprise-electron')
    .authUtils;
  settings.isConnectUser = !!authUtils.getIdTokenFromStore();
  return settings;
}

const storeSettingsSubject = new Subject<Settings>();
export const settingsChange$ = storeSettingsSubject.asObservable();

export function storeSettings(store: Store, value: Settings) {
  store.set('settings', value);
  storeSettingsSubject.next(value);
}
