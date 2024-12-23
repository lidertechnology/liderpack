// index.ts (archivo principal del paquete)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";
import { getPerformance } from "firebase/performance";
import { getRemoteConfig } from "firebase/remote-config";
import { getStorage } from "firebase/storage";
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator } from "firebase/storage";
import {
  getAppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { getDatabase } from "firebase/database";
import { deleteApp } from "firebase/app";

export interface FirebaseServices {
  app: any;
  analytics: any;
  auth: any;
  firestore: any;
  functions: any;
  messaging: any;
  performance: any;
  remoteConfig: any;
  storage: any;
  appCheck: any;
  database: any;
  // Utilidades
  connectFirestoreEmulator: typeof connectFirestoreEmulator;
  enableIndexedDbPersistence: typeof enableIndexedDbPersistence;
  connectAuthEmulator: typeof connectAuthEmulator;
  connectFunctionsEmulator: typeof connectFunctionsEmulator;
  connectStorageEmulator: typeof connectStorageEmulator;
  deleteApp: typeof deleteApp;
}

export function initializeFirebase(
  config: any,
  appCheckConfig?: {
    provider: ReCaptchaV3Provider;
    isTokenAutoRefreshEnabled?: boolean;
  },
): FirebaseServices {
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);
  const messaging = getMessaging(app);
  const performance = getPerformance(app);
  const remoteConfig = getRemoteConfig(app);
  const storage = getStorage(app);
  const database = getDatabase(app);
  let appCheck;
  if (appCheckConfig) {
    appCheck = initializeAppCheck(app, appCheckConfig);
  } else {
    appCheck = getAppCheck(app);
  }

  return {
    app,
    analytics,
    auth,
    firestore,
    functions,
    messaging,
    performance,
    remoteConfig,
    storage,
    appCheck,
    database,
    // Utilidades
    connectFirestoreEmulator,
    enableIndexedDbPersistence,
    connectAuthEmulator,
    connectFunctionsEmulator,
    connectStorageEmulator,
    deleteApp,
  };
}
