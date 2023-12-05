class Utils {
  static generateString = (length: number) => {
    const letters: string = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  };

  static generateInt = (maxValue: number) => {
    return Math.floor(Math.random() * maxValue);
  };
}

export default Utils;
