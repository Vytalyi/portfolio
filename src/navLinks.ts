import { type CollectionEntry, getEntryBySlug } from 'astro:content';

const getLinkedinSocialLink = async () => {
  // eslint-disable-next-line
  return (await getEntryBySlug('social_links', 'linkedin')) as CollectionEntry<'social_links'>;
};

const getNavLinks = async (pageName: string) => {
  const linkedinEntry = await getLinkedinSocialLink();
  return [
    {
      url: `${import.meta.env.BASE_URL}`,
      text: 'Home',
      active: pageName === 'home',
    },
    {
      url: `${import.meta.env.BASE_URL}case_studies`,
      text: 'Case Studies',
      active: pageName === 'case_studies',
    },
    {
      text: 'Contacts',
      active: pageName === 'contacts',
      children: [
        {
          url: `mailto:vytalyi.denysenko@gmail.com?subject=Contact%20request`,
          text: 'Email me',
        },
        {
          url: linkedinEntry.data.url,
          text: 'Message me at Linkedin',
          target: '_blank',
        },
      ],
    },
  ];
};

export { getNavLinks };
