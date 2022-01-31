import { container } from "tsyringe";

import IStorageProvider from "./StorageProviders/models/IStorageProvaider";
import DiskStorageProvider from "./StorageProviders/implementations/DiskStorageProvider";

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

// container.registerSingleton<IMailProvider>(
//   'StorageProvider',
//   Mail
// );
