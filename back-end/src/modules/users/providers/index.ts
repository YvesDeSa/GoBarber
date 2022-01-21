import { container } from "tsyringe";

import IHashProviders from "./HashProviders/models/IHashProviders";
import { BCryptHashProvider } from "./HashProviders/implementations/BCryptHashProviders";

container.registerSingleton<IHashProviders>(
  'HashProvider',
  BCryptHashProvider,
)
