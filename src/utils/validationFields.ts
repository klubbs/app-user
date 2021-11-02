export const validPhone = (number: string): boolean => {
  let reg = new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)

  return reg.test(number) === false ? false : true
}



export const validMail = (email: string): boolean => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return reg.test(email) === false ? false : true
}
