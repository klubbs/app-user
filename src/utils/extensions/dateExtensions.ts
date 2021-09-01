export { };

declare global {
  interface Date {
    addDays(days: number, useThis?: boolean): Date;
    isToday(): boolean;
    isAnotherMonth(date: Date): boolean;
    isWeekend(): boolean;
    isSameDate(date: Date): boolean;
    ToUnixEpoch(): number;
    ToDateFormat(epoch: number): Date;
  }

  interface Number {
    ToDateFormat(): Date;
  }
}

Date.prototype.addDays = function (days: number): Date {
  if (!days) return this;
  let date = this;
  date.setDate(date.getDate() + days);

  return date;
};

Date.prototype.isToday = function (): boolean {
  let today = new Date();
  return this.isSameDate(today);
};

Date.prototype.isAnotherMonth = function (date: Date): boolean {
  return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function (): boolean {
  return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function (date: Date): boolean {
  return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};

Date.prototype.ToUnixEpoch = function () {
  return Math.floor(this.getTime() / 1000.0)
}

Date.prototype.ToDateFormat = function (unixEpoch) {
  let date = new Date(unixEpoch * 1000)
  return date;
}


Number.prototype.ToDateFormat = function () {
  let date = new Date(this as number * 1000)
  return date;
}
