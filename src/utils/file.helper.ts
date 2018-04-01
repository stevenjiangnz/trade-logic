import * as config from 'config';
import * as fs from 'fs';
import { Logger } from '../utils/logger';


export class FileHelper {
  private static logger = new Logger();
  constructor() {

  }

  public static writeToFile(path, content) {
    // fs.writeFile(path, content, 'utf8', function (err) {
    //   if (err) {
    //       return FileHelper.logger.error('save file error...', err);
    //   }
    //   FileHelper.logger.log(`File ${path} has been saved with size (${content.length}) `);
    // });

    fs.writeFileSync(path, content);
  }

  public static readFromFile(path) {
    return fs.readFileSync(path);
  }
}