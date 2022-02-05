import { container } from "tsyringe";

import IStorageProvider from "./StorageProviders/models/IStorageProvaider";
import DiskStorageProvider from "./StorageProviders/implementations/DiskStorageProvider";

import IMailProvider from "./MailProviders/models/IMailProvider";
import EtherealMailProvider from "./MailProviders/implementations/EtherealMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
