import * as config from 'config';
import * as fs from 'fs';

export class FileHelper {
  constructor() {

  }

  public static writeToFile(path, content) {
    fs.writeFileSync(path, content);
  }

  public static appendToFile(path, content) {
    fs.appendFileSync(path, content);
  }

  public static readFromFile(path) {
    return fs.readFileSync(path);
  }
}