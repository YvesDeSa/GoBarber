import { container } from "tsyringe";

import IStorageProvider from "./StorageProviders/models/IStorageProvaider";
import DiskStorageProvider from "./StorageProviders/implementations/DiskStorageProvider";

import IMailProvider from "./MailProviders/models/IMailPRovider";

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

// container.registerSingleton<IMailProvider>(
//   'StorageProvider',
//   Mail
// );

