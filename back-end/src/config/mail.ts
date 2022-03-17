interface IMailConfig {
  driver: 'ethereal' | 'mailchimp';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig
