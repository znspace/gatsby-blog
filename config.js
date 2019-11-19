'use strict';

module.exports = {
  url: 'https://blog.znspace.com',
  pathPrefix: '/',
  title: 'Blog by Joe',
  subtitle: '生命不息，折腾不止',
  copyright: '© All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'G-PCW066E8TR',
  gitalk: {
    repo: 'znspace.github.io',
    admin: ['ZNspace'],
    owner: 'ZNspace',
    clientID: '0a470b62a738f4a37ebd',
    clientSecret: '0f168e6f50baa7e48c0ef649e8d2fbb25d8ce66f',
    distractionFreeMode: true
  },
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'Nan Zhou',
    photo: '/photo.jpg',
    bio: '专注前端',
    contacts: {
      email: 'zhounan.dev@gmail.com',
      facebook: '',
      telegram: 'mask_v',
      twitter: 'NanZhouDev',
      github: 'znspace',
      rss: '#',
      vkontakte: '',
      linkedin: '',
      instagram: '',
      line: '',
      gitlab: '',
      weibo: ''
    }
  }
};
