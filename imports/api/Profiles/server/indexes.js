import createIndex from '../../../modules/server/create-index';
import Profiles from '../Profiles';

createIndex(Profiles, { owner: 1 });
