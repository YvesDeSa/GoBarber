import { container } from "tsyringe";

import IStorageProvider from "./models/IStorageProvaider";
import DiskStorageProvider from "./implementations/DiskStorageProvider";

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  providers.disk
);

