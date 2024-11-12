export default interface SendMailDto {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}
