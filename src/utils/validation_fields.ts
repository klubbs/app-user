export const _validPhone = (number: string): boolean => {
  let value = number.replace(/\D/g, "")

  //55 21 99999 9999
  return value.length === 13 ? true : false
}



export const _validMail = (email: string): boolean => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return reg.test(email) === false ? false : true
}
