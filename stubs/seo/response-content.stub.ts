import { BackendModelSeoContentInterface } from 'backend/model/seo/content.interface';

export const seoResponseContentStub = (
  data: Partial<BackendModelSeoContentInterface> = {}
): { data: BackendModelSeoContentInterface } => ({
  data: {
    title: 'This is a meta page title',
    description: 'This the the meta page description',
    uri: '/en/buy/dubai/villas-for-sale-dubai-hills-estate-dubai-hills.html',
    canonical: '',
    second_header: 'Dubai Hills Villas for sale',
    third_header: 'Houses for sale in Dubai Hills',
    primary_content:
      '<p>Villa living is the best standard of living worldwide; but when it is in one of the leading countries in the word and in an emirates known as the best place to live what can be better? Dubai is widely renowned for its superb accommodations and hospitable atmosphere welcoming visitors from every corner of the globe. Not only is it widely sought after by tourists, visitors and residents, but also investors are eagerly ambitious to owning property in the continuously growing emirate with its many districts and developments. </p><p>One of the newest and most prestigious address in Dubai is Dubai hills, in Mohamed Bin Rashid City. The project consists of various communities with different components including: villas, townhouses, plots and apartments. The community is master- planned to connect you with exquisite living, designed exclusively for those with a taste for contemporary living. Dubai Hills is a master mixed-use lifestyle development that is created with sustainability and world class living experience in mind. The area is rich with lush landscaping and home to a world class 18- hole golf course. </p>',
    secondary_content:
      "<p>It is mostly famous for hosting a vast variety of residential choices that include several luxury villas and apartments. Dubai Hills Villas for sale have been increasingly wanted by many people looking for a luxurious life style. The area is strategically located along Al Khail Road and Umm Suqeim Road providing great access to and from many places in the emirate and is a great choice for business men, professionals and commuters going to the major business or industrial districts nearby. Also, Dubai Hills houses for sale are a great option as both the Etihad Rail and Dubai metro will add an additional line to the development, connecting it to the rest of Dubai and allowing convenient transportation options. </p><p>Moreover, Dubai Hills is to be one of the most exclusive private gated communities in town with property for sale that are guaranteed to capture all attention. The development is made up of five types of luxury villas: Classic, Contemporary, Arabesque, Mediterranean and Modern. Dubai Hills villas for sale are built with everything lavish and aristocratic in mind for an overwhelming finishing for the residents. Also, villas for sale in Dubai hills have an active lifestyle within an arm's length, with jogging and cycling tracks through the development as well as a mix of high-end retail, several fine dining restaurants, cafes and dining outlets. The area will also accommodate a regional mall and boutique-shopping complex. </p><p><a href='/en/buy/apartments-for-sale.html'>Mohammed Bin Rashid City</a> is coined after the ruler of Dubai, Sheikh Mohammed bin Rashid al Maktoum. It is planned to be a new tourist destination and said to construct the biggest mall in the world, called the Mall of the World. It is also set to hold several art galleries and the biggest swimming pool in the world. You can contact an experienced team on Propertyfinder to get tailored advice according to your needs.</p>",
    primary_image_alt: 'Find the Best Villas for Sale in Dubai Hills',
    secondary_image_alt: 'Houses for sale in Dubai Hills',
    primary_image_url:
      'https://www.propertyfinder.bh/images/pf_portal/cms/8d225ea8a3b2d3aa524ff1e57d5023fabb52d8c8/desktop.webp',
    secondary_image_url:
      'https://www.propertyfinder.bh/images/pf_portal/cms/6c8241673ae49681ccca78518e916c9392cb8cf3/desktop.webp',
    created_at: '2017-02-21T16:38:05Z',
    ...data,
  } as BackendModelSeoContentInterface,
});
