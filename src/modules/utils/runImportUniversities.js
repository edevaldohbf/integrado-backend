import startDb from '../../config/mongoDb.js';
import { importUniversities } from '../universities/universities.script.js'

startDb();
importUniversities(true);